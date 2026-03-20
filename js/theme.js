(function () {
  var KEY = 'algorithm_lect_theme';
  var root = document.documentElement;

  // 상대 경로 링크를 절대 URL로 변환 (한글 파일명·서브경로에서 링크 깨짐 방지)
  function fixRelativeLinks() {
    var pathname = location.pathname || '/';
    var dir = pathname.replace(/\/[^/]*$/, '/') || '/';
    var base = location.origin + dir;

    // 404 페이지: URL이 잘못된 경로이므로 '메인으로' 링크를 사이트 루트로 고정
    if (document.body && document.body.classList.contains('err-body')) {
      var homeLink = document.querySelector('.err-body a[href="./"], .err-body a[href="."]');
      if (homeLink) {
        var parts = pathname.split('/').filter(Boolean);
        homeLink.href = parts.length > 1 ? location.origin + '/' + parts[0] + '/' : location.origin + '/';
      }
      return;
    }

    document.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h || /^(https?:|#|mailto:|javascript:|\/\/)/.test(h.trim())) return;
      try {
        a.href = new URL(h, base).href;
      } catch (e) {}
    });
  }

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
  function onReady() {
    render();
    fixRelativeLinks();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
