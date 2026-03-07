/**
 * 강의 페이지 인라인 자바스크립트 실습: 코드 입력 후 실행, console.log 출력 표시
 */
(function () {
  function runBlock(block) {
    var codeEl = block.querySelector('.js-run-code');
    var btn = block.querySelector('.js-run-btn');
    var outEl = block.querySelector('.js-run-output');
    if (!codeEl || !btn || !outEl) return;
    btn.addEventListener('click', function () {
      var code = (codeEl.value || '').trim();
      outEl.innerHTML = '';
      if (!code) {
        outEl.appendChild(makeLine('코드를 입력한 뒤 실행해 보세요.', true));
        return;
      }
      var logs = [];
      var origLog = console.log;
      console.log = function () {
        logs.push(Array.prototype.slice.call(arguments).map(String).join(' '));
      };
      try {
        new Function(code)();
        logs.forEach(function (s) {
          outEl.appendChild(makeLine(s, false));
        });
        if (logs.length === 0) {
          outEl.appendChild(makeLine('(console.log 출력 없음. 코드에 console.log(...)를 넣어 보세요.)', false));
        }
      } catch (err) {
        outEl.appendChild(makeLine('에러: ' + (err.message || err), true));
      } finally {
        console.log = origLog;
      }
    });
  }
  function makeLine(text, isError) {
    var div = document.createElement('div');
    div.className = isError ? 'js-run-line js-run-err' : 'js-run-line';
    div.textContent = text;
    return div;
  }
  function init() {
    document.querySelectorAll('.js-run-practice').forEach(runBlock);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
