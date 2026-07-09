// ==============================
// SIGNLEARN — MAIN JS
// ==============================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // --- Mobile hamburger menu ---
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // --- Password toggle visibility ---
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.form-input-wrap').querySelector('input');
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.textContent = isHidden ? '🙈' : '👁️';
    });
  });

  // --- Intersection Observer for animations ---
  const animElems = document.querySelectorAll('[data-animate]');
  if (animElems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animElems.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // --- Progress bar animation ---
  document.querySelectorAll('.progress-fill[data-width]').forEach(bar => {
    setTimeout(() => {
      bar.style.width = bar.dataset.width;
    }, 400);
  });

  // --- Toast notifications ---
  window.showToast = (message, type = 'info') => {
    const container = document.querySelector('.toast-container') || (() => {
      const c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
      return c;
    })();
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.35s ease';
      setTimeout(() => toast.remove(), 350);
    }, 3500);
  };

  // --- Login form handler ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!email || !password) {
        window.showToast("Email dan kata sandi harus diisi!", "warning");
        return;
      }

      const btn = loginForm.querySelector('[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner"></span> Masuk...';
      btn.disabled = true;

      // POST to our local Express Login API
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message || 'Gagal masuk'); });
        }
        return res.json();
      })
      .then(data => {
        window.showToast(`Selamat datang kembali, ${data.user.name}!`, "success");
        // Save simple user session state
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1200);
      })
      .catch(err => {
        window.showToast(err.message, "error");
        btn.innerHTML = origText;
        btn.disabled = false;
      });
    });
  }

  // --- Register form handler ---
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = registerForm.querySelector('[type="submit"]');
      btn.innerHTML = '<span class="spinner"></span> Membuat akun...';
      btn.disabled = true;
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1400);
    });
  }

  // --- Tab filters ---
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tab-group');
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(tc => {
        tc.classList.toggle('hidden', tc.dataset.tab !== target && target !== 'semua');
      });
    });
  });

  // --- Lesson quiz ---
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const group = opt.closest('.quiz-options');
      group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // --- Animate numbers (stats) ---
  function animateCount(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start).toLocaleString('id-ID');
    }, 16);
  }
  const statNums = document.querySelectorAll('[data-count]');
  if (statNums.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target, parseInt(e.target.dataset.count));
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => obs.observe(el));
  }

  // --- Dynamic Theme Switcher & Profile Dropdown ---
  const headerActions = document.querySelector('.header-actions');
  if (headerActions) {
    // 1. Theme Switcher Button Creation
    const themeBtn = document.createElement('button');
    themeBtn.className = 'header-btn theme-toggle-btn';
    themeBtn.setAttribute('aria-label', 'Toggle Theme');
    themeBtn.setAttribute('id', 'themeToggleBtn');
    themeBtn.style.marginRight = '0.5rem';

    const moonSvg = `<svg class="theme-icon-moon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`;
    const sunSvg = `<svg class="theme-icon-sun" style="display: none;" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>`;

    themeBtn.innerHTML = moonSvg + sunSvg;
    
    // 2. Wrap Profile Avatar inside click dropdown
    const avatar = headerActions.querySelector('.avatar-small');
    let triggerElement = avatar;
    
    if (avatar) {
      const dropdownContainer = document.createElement('div');
      dropdownContainer.className = 'profile-dropdown-container';

      // Insert container right before avatar in DOM
      avatar.parentNode.insertBefore(dropdownContainer, avatar);

      // Create click button to wrap avatar
      const avatarBtn = document.createElement('button');
      avatarBtn.className = 'avatar-small-btn';
      avatarBtn.setAttribute('aria-label', 'Profile Menu');
      avatarBtn.appendChild(avatar); // Move avatar node inside button
      dropdownContainer.appendChild(avatarBtn);

      // Create dropdown menu
      const dropdownMenu = document.createElement('div');
      dropdownMenu.className = 'profile-dropdown-menu';
      
      const userIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;
      const settingsIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>`;
      const logoutIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>`;

      dropdownMenu.innerHTML = `
        <a href="profile.html" class="profile-dropdown-item">
          ${userIconSvg}
          Profile
        </a>
        <a href="settings.html" class="profile-dropdown-item">
          ${settingsIconSvg}
          Settings
        </a>
        <div class="profile-dropdown-divider"></div>
        <a href="index.html" class="profile-dropdown-item logout-item">
          ${logoutIconSvg}
          Logout
        </a>
      `;
      dropdownContainer.appendChild(dropdownMenu);

      // Toggle dropdown on click
      avatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target)) {
          dropdownMenu.classList.remove('show');
        }
      });

      triggerElement = dropdownContainer;
    }

    // Insert theme switcher button before dropdown container/avatar
    if (triggerElement) {
      headerActions.insertBefore(themeBtn, triggerElement);
    } else {
      headerActions.appendChild(themeBtn);
    }

    const themeIconMoon = themeBtn.querySelector('.theme-icon-moon');
    const themeIconSun = themeBtn.querySelector('.theme-icon-sun');

    function updateThemeIcons(isDark) {
      if (isDark) {
        themeIconMoon.style.display = 'none';
        themeIconSun.style.display = 'block';
      } else {
        themeIconMoon.style.display = 'block';
        themeIconSun.style.display = 'none';
      }
    }

    // Check localStorage preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      updateThemeIcons(true);
    }

    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
      if (typeof window.showToast === 'function') {
        window.showToast(isDark ? 'Tema gelap diaktifkan' : 'Tema terang diaktifkan', 'success');
      }
    });
  }

  // --- Header Action Buttons (Notifications & Help) ---
  const notifBtn = document.querySelector('.header-btn[aria-label="Notifications"]');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      if (typeof window.showToast === 'function') {
        window.showToast("Anda memiliki notifikasi baru.", "info");
      }
    });
  }

  const helpBtn = document.querySelector('.header-btn[aria-label="Help"]');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      if (typeof window.showToast === 'function') {
        window.showToast("Membuka pusat bantuan & Panduan...", "info");
      }
    });
  }

});
