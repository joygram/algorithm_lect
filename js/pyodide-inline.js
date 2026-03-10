/**
 * 강의 페이지 본문 안 파이썬 실습 인라인 러너
 * .pyodide-inline[data-snippet="list|stack|queue|..."] 컨테이너에 코드창·실행·출력 DOM을 넣고,
 * 실행 시 PyodideRunner(공용)로 코드 실행.
 * 필요: pyodide.js(CDN), pyodide-runner.js, pyodide-snippets.js 를 페이지에 포함.
 */
(function () {
  var SNIPPETS = typeof window.PYODIDE_SNIPPETS !== 'undefined' ? window.PYODIDE_SNIPPETS : {};
  var GUIDES = typeof window.PYODIDE_GUIDES !== 'undefined' ? window.PYODIDE_GUIDES : {};
  var DEFAULT_CODE = 'print("Hello")\n# 위에서 Run을 누르면 여기서 실행돼요.';

  var sharedRunnerPromise = null;

  function isMobile() {
    return /Mobile|Android|iPhone|iPad|webOS|BlackBerry|IEMobile|Opera Mini/i.test(typeof navigator !== 'undefined' && navigator.userAgent || '');
  }

  function getRunner() {
    if (typeof window.PyodideRunner === 'undefined') {
      return Promise.reject(new Error('PyodideRunner를 불러오지 못했어요. pyodide.js, pyodide-runner.js를 포함했는지 확인해 주세요.'));
    }
    if (!window.loadPyodide) {
      return Promise.reject(new Error('Pyodide 스크립트가 로드되지 않았어요. CDN pyodide.js를 포함해 주세요.'));
    }
    if (!sharedRunnerPromise) {
      sharedRunnerPromise = window.PyodideRunner.init();
    }
    return sharedRunnerPromise;
  }

  function buildBlock(container) {
    var key = (container.getAttribute('data-snippet') || '').trim();
    var code = (SNIPPETS[key] != null) ? SNIPPETS[key] : DEFAULT_CODE;
    var guideHtml = GUIDES[key] != null ? GUIDES[key] : '';

    var box = document.createElement('div');
    box.className = 'pyodide-inline-box';

    if (guideHtml) {
      var guide = document.createElement('div');
      guide.className = 'pyodide-guide';
      guide.setAttribute('role', 'region');
      guide.setAttribute('aria-label', '실습 가이드');
      guide.innerHTML = '<p class="pyodide-guide-title">실습 가이드</p><div class="pyodide-guide-body">' + guideHtml + '</div>';
      box.appendChild(guide);
    }

    var wrap = document.createElement('div');
    wrap.className = 'pyodide-inline-editor';
    var label = document.createElement('label');
    label.className = 'pyodide-label';
    label.textContent = '코드';
    wrap.appendChild(label);
    var editorWrap = document.createElement('div');
    editorWrap.className = 'code-editor-with-lines';
    var gutter = document.createElement('div');
    gutter.className = 'code-editor-gutter';
    gutter.setAttribute('aria-hidden', 'true');
    var textarea = document.createElement('textarea');
    textarea.className = 'code-editor code-editor-has-gutter';
    textarea.setAttribute('spellcheck', 'false');
    textarea.setAttribute('rows', '12');
    textarea.value = code;
    editorWrap.appendChild(gutter);
    editorWrap.appendChild(textarea);
    wrap.appendChild(editorWrap);
    box.appendChild(wrap);

    function updateLineNumbers() {
      var n = (textarea.value.match(/\n/g) || []).length + 1;
      var s = '';
      for (var i = 1; i <= n; i++) s += i + '\n';
      gutter.textContent = s || '1';
      gutter.scrollTop = textarea.scrollTop;
    }
    function syncGutterScroll() { gutter.scrollTop = textarea.scrollTop; }
    textarea.addEventListener('input', updateLineNumbers);
    textarea.addEventListener('scroll', syncGutterScroll);
    updateLineNumbers();

    textarea.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var text = textarea.value;
      var lineStart = text.lastIndexOf('\n', start - 1) + 1;
      var currentLine = text.slice(lineStart, start);
      var indent = currentLine.match(/^[\t ]*/);
      var prefix = indent ? indent[0] : '';
      var newLine = '\n' + prefix;
      e.preventDefault();
      textarea.value = text.slice(0, start) + newLine + text.slice(end);
      textarea.selectionStart = textarea.selectionEnd = start + newLine.length;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    });

    var actions = document.createElement('div');
    actions.className = 'pyodide-actions';
    var runBtn = document.createElement('button');
    runBtn.type = 'button';
    runBtn.className = 'btn-run';
    runBtn.textContent = '실행';
    var status = document.createElement('span');
    status.className = 'pyodide-status';
    status.setAttribute('aria-live', 'polite');
    actions.appendChild(runBtn);
    actions.appendChild(status);
    box.appendChild(actions);

    var outWrap = document.createElement('div');
    outWrap.className = 'pyodide-output-wrap';
    outWrap.innerHTML = '<span class="pyodide-output-label">실행 결과</span>';
    var output = document.createElement('div');
    output.className = 'code-output';
    output.setAttribute('role', 'log');
    output.setAttribute('aria-live', 'polite');
    outWrap.appendChild(output);
    box.appendChild(outWrap);

    runBtn.addEventListener('click', function () {
      runBtn.disabled = true;
      status.textContent = '준비 중…';
      status.className = 'pyodide-status';
      getRunner().then(function (runner) {
        status.textContent = '실행 중…';
        return runner.run(textarea.value, output);
      }).then(function () {
        status.textContent = '실행 완료';
        status.className = 'pyodide-status pyodide-ready';
      }).catch(function (err) {
        status.textContent = '오류';
        status.className = 'pyodide-status pyodide-err';
        if (output) {
          output.innerHTML = '';
          var line = document.createElement('div');
          line.className = 'pyodide-line pyodide-stderr';
          line.textContent = err.message || String(err);
          output.appendChild(line);
          if (isMobile() || /메모리|네트워크|로딩 실패/i.test(err.message || '')) {
            var hint = document.createElement('div');
            hint.className = 'pyodide-line pyodide-hint';
            hint.setAttribute('role', 'status');
            hint.textContent = '💡 모바일에서는 첫 로딩이 느리거나 실패할 수 있어요. Wi‑Fi에서 새로고침 후 다시 실행해 보시거나, PC에서 열어 보세요.';
            output.appendChild(hint);
          }
        }
      }).finally(function () {
        runBtn.disabled = false;
      });
    });

    container.appendChild(box);
  }

  function init() {
    var containers = document.querySelectorAll('.pyodide-inline');
    for (var i = 0; i < containers.length; i++) {
      buildBlock(containers[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
