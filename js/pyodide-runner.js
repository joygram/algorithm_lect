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
