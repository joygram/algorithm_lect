/**
 * 강의 페이지 인라인 부분 채우기 실습
 * .fill-code-practice 내 input + 확인 버튼으로 정답 검사 후, 파이썬 실습 링크 유도
 */
(function () {
  function trimLower(s) {
    return String(s || '').trim().toLowerCase();
  }
  function normalize(s) {
    return trimLower(s).replace(/\s/g, '');
  }
  function initBlock(block) {
    var answersStr = block.getAttribute('data-answers') || block.getAttribute('data-answer') || '';
    var answers = answersStr ? answersStr.split('|').map(function (a) { return trimLower(a); }) : [];
    var snippet = block.getAttribute('data-snippet') || '';
    var inputs = block.querySelectorAll('.fill-code-input');
    var btn = block.querySelector('.fill-code-check');
    var msg = block.querySelector('.fill-code-msg');
    var linkWrap = block.querySelector('.fill-code-run-link');
    if (!btn || !msg || !answers.length) return;
    btn.addEventListener('click', function () {
      var ok = true;
      var list = inputs.length ? inputs : block.querySelectorAll('input[type="text"], input:not([type])');
      if (list.length !== answers.length) ok = false;
      else {
        for (var i = 0; i < list.length; i++) {
          if (normalize(list[i].value) !== normalize(answers[i])) {
            ok = false;
            break;
          }
        }
      }
      msg.textContent = ok ? '맞아요!' : '다시 생각해 보세요.';
      msg.className = 'fill-code-msg ' + (ok ? 'ok' : 'err');
      if (ok && linkWrap && snippet) {
        linkWrap.innerHTML = '<a href="../practice/pyodide.html?snippet=' + encodeURIComponent(snippet) + '">코드로 실제 확인하기 (파이썬 실습 →)</a>';
        linkWrap.style.display = 'block';
      }
    });
  }
  function init() {
    document.querySelectorAll('.fill-code-practice').forEach(initBlock);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
