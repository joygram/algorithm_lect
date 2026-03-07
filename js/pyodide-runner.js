/**
 * Pyodide 실행기: 브라우저에서 Python 코드 실행, print 출력을 지정한 요소에 표시
 * 사용: PyodideRunner.init(outputElement).then(runner => runner.run(code));
 */
(function (global) {
  var PYODIDE_VERSION = 'v0.29.3';
  var PYODIDE_BASE = 'https://cdn.jsdelivr.net/pyodide/' + PYODIDE_VERSION + '/full/';

  function appendLine(el, text, isError) {
    var line = document.createElement('div');
    line.className = isError ? 'pyodide-line pyodide-stderr' : 'pyodide-line';
    line.textContent = text;
    el.appendChild(line);
  }

  function explainError(msg) {
    var s = String(msg);
    if (/name '_____' is not defined|'_____'/.test(s) || /name '.*' is not defined/.test(s) && s.indexOf('_____') !== -1) {
      return '💡 빈칸(_____)을 아직 채우지 않은 것 같아요. 위 실습 가이드에서 "첫 번째 빈칸", "두 번째 빈칸" 순서대로 채워 보세요.';
    }
    if (/NameError|is not defined/.test(s)) {
      return '💡 이름을 찾을 수 없다는 뜻이에요. 빈칸을 채웠는지, 메서드 이름(append, pop, popleft 등)을 정확히 썼는지 확인해 보세요.';
    }
    if (/SyntaxError|invalid syntax/.test(s)) {
      return '💡 문법 오류예요. 괄호 (), 쉼표, 따옴표가 빠지지 않았는지, 빈칸에 들어간 값이 올바른지 확인해 보세요.';
    }
    if (/line (\d+)/i.test(s)) {
      var num = s.match(/line (\d+)/i)[1];
      return '💡 ' + num + '번째 줄 근처를 확인해 보세요. 그 줄의 빈칸을 채웠는지, 오타는 없는지 봐 주세요.';
    }
    return '💡 에러가 나면: ① 빈칸(_____)을 하나씩 채운 뒤 실행해 보기 ② 위 "실습 가이드"에서 정답 확인 ③ 같은 예제 버튼을 다시 눌러 뼈대부터 다시 시도해 보기.';
  }

  function PyodideRunner() {
    this.pyodide = null;
    this.ready = false;
  }

  PyodideRunner.prototype.run = function (code, outputEl) {
    var self = this;
    if (!this.ready || !this.pyodide) {
      if (outputEl) appendLine(outputEl, 'Python 엔진이 아직 준비되지 않았어요. 잠시 후 다시 실행해 주세요.', true);
      return Promise.reject(new Error('Pyodide not ready'));
    }
    if (!outputEl) return Promise.reject(new Error('output element required'));

    outputEl.innerHTML = '';
    this.pyodide.setStdout({
      batched: function (str) {
        appendLine(outputEl, str, false);
      }
    });
    this.pyodide.setStderr({
      batched: function (str) {
        appendLine(outputEl, str, true);
      }
    });

    return this.pyodide.runPythonAsync(code).then(function (result) {
      if (result !== undefined && result !== null) {
        var s = (result && typeof result.toString === 'function') ? result.toString() : String(result);
        appendLine(outputEl, '→ 반환값: ' + s, false);
      }
      return result;
    }).catch(function (err) {
      var msg = err.message || String(err);
      appendLine(outputEl, msg, true);
      var hint = explainError(msg);
      if (hint) {
        var hintEl = document.createElement('div');
        hintEl.className = 'pyodide-line pyodide-hint';
        hintEl.setAttribute('role', 'status');
        hintEl.textContent = hint;
        outputEl.appendChild(hintEl);
      }
      throw err;
    });
  };

  PyodideRunner.init = function (baseUrl) {
    // GitHub Pages 등 서브경로에 상관없이 CDN 절대 경로만 사용
    var indexURL = (baseUrl && baseUrl.indexOf('http') === 0) ? baseUrl : PYODIDE_BASE;
    var runner = new PyodideRunner();
    return global.loadPyodide({ indexURL: indexURL }).then(function (pyodide) {
      runner.pyodide = pyodide;
      runner.ready = true;
      return runner;
    });
  };

  global.PyodideRunner = PyodideRunner;
})(typeof window !== 'undefined' ? window : this);
