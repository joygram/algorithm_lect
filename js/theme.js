(function () {
  var KEY = 'algorithm_lect_theme';
  var root = document.documentElement;

  function getSaved() {
    try {
      return localStorage.getItem(KEY) || 'light';
    } catch (e) {
      return 'light';
    }
  }

  function setTheme(name) {
    root.setAttribute('data-theme', name);
    try {
      localStorage.setItem(KEY, name);
    } catch (e) {}
    updateSwitcher(name);
  }

  function updateSwitcher(current) {
    var wrap = document.getElementById('theme-switcher-wrap');
    if (!wrap) return;
    var sel = wrap.querySelector('select');
    if (sel) sel.value = current;
  }

  function render() {
    var wrap = document.getElementById('theme-switcher-wrap');
    if (wrap && wrap.querySelector('select')) {
      updateSwitcher(root.getAttribute('data-theme') || 'light');
      return;
    }
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'theme-switcher-wrap';
      wrap.className = 'theme-switcher-wrap';
      var header = document.querySelector('.header');
      if (header) {
        header.appendChild(wrap);
      } else {
        wrap.style.position = 'fixed';
        wrap.style.top = '0.5rem';
        wrap.style.right = '0.5rem';
        wrap.style.zIndex = '999';
        document.body.appendChild(wrap);
      }
    }
    wrap.innerHTML =
      '<label for="theme-select" class="theme-label">테마</label>' +
      '<select id="theme-select" class="theme-select" aria-label="테마 선택">' +
      '<option value="light">라이트</option>' +
      '<option value="dark">다크</option>' +
      '<option value="sepia">세피아</option>' +
      '<option value="blue">블루</option>' +
      '</select>';
    var sel = wrap.querySelector('select');
    sel.value = root.getAttribute('data-theme') || 'light';
    sel.addEventListener('change', function () {
      setTheme(sel.value);
    });
  }

  setTheme(getSaved());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
