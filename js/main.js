// ==============================
// SIGNLEARN — MAIN JS
// ==============================

document.addEventListener('DOMContentLoaded', () => {

  // --- Dynamic Responsive Sidebar Drawer Logic ---
  const header = document.querySelector('.main-header');
  const sidebar = document.querySelector('.db-sidebar');
  
  if (header && sidebar) {
    // 1. Inject Hamburger Button into Header (if not already there)
    if (!header.querySelector('.hamburger-menu-btn')) {
      const hamBtn = document.createElement('button');
      hamBtn.className = 'hamburger-menu-btn';
      hamBtn.setAttribute('aria-label', 'Open Menu');
      hamBtn.innerHTML = `
        <div class="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
      hamBtn.addEventListener('click', () => window.toggleSidebar());
      header.insertBefore(hamBtn, header.firstChild);
    }
    
    // 2. Inject Close Button into Sidebar (if not already there)
    if (!sidebar.querySelector('.sidebar-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'sidebar-close-btn';
      closeBtn.setAttribute('aria-label', 'Close Menu');
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => window.closeSidebar());
      sidebar.appendChild(closeBtn);
    }

  }

  // Define global toggle handlers
  window.toggleSidebar = function() {
    const sidebarEl = document.querySelector('.db-sidebar');
    
    if (window.innerWidth > 768) {
      const layout = document.querySelector('.app-layout');
      if (layout) {
        layout.classList.toggle('sidebar-collapsed');
      }
      return;
    }
    
    let overlayEl = document.querySelector('.sidebar-overlay');
    if (!overlayEl) {
      overlayEl = document.createElement('div');
      overlayEl.className = 'sidebar-overlay';
      document.body.appendChild(overlayEl);
      overlayEl.addEventListener('click', () => window.closeSidebar());
    }
    
    if (sidebarEl) {
      overlayEl.style.display = 'block';
      setTimeout(() => {
        sidebarEl.classList.toggle('show-sidebar');
        overlayEl.classList.toggle('show');
      }, 10);
    }
  };

  window.closeSidebar = function() {
    if (window.innerWidth > 768) {
      const layout = document.querySelector('.app-layout');
      if (layout) {
        layout.classList.add('sidebar-collapsed');
      }
      return;
    }
    
    const sidebarEl = document.querySelector('.db-sidebar');
    const overlayEl = document.querySelector('.sidebar-overlay');
    
    if (sidebarEl) sidebarEl.classList.remove('show-sidebar');
    if (overlayEl) {
      overlayEl.classList.remove('show');
      setTimeout(() => {
        if (!overlayEl.classList.contains('show')) {
          overlayEl.style.display = 'none';
        }
      }, 300);
    }
  };

  // --- Dynamic Mobile Bottom Nav Generation ---
  if (!document.querySelector('.bottom-nav')) {
    const bottomNav = document.createElement('nav');
    bottomNav.className = 'bottom-nav';
    
    const currentPath = window.location.pathname.toLowerCase();
    const isHome = currentPath.includes('dashboard') || currentPath === '/' || currentPath.endsWith('signlearn/');
    const isModules = currentPath.includes('lesson') || currentPath.includes('learn') || currentPath.includes('exercise') || currentPath.includes('videos');
    const isMentors = currentPath.includes('mentors');
    const isAchievements = currentPath.includes('achievements') || currentPath.includes('results');
    const isProfile = currentPath.includes('profile') || currentPath.includes('settings') || currentPath.includes('analysis');

    bottomNav.innerHTML = `
      <div class="bottom-nav-inner">
        <a href="dashboard.html" class="bottom-nav-item ${isHome ? 'active' : ''}">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span>Home</span>
        </a>
        <a href="lesson.html" class="bottom-nav-item ${isModules ? 'active' : ''}">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <span>Modules</span>
        </a>
        <a href="mentors.html" class="bottom-nav-item ${isMentors ? 'active' : ''}">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          <span>Mentors</span>
        </a>
        <a href="achievements.html" class="bottom-nav-item ${isAchievements ? 'active' : ''}">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
          <span>Achievements</span>
        </a>
        <a href="profile.html" class="bottom-nav-item ${isProfile ? 'active' : ''}">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span>Profile</span>
        </a>
      </div>
    `;
    document.body.appendChild(bottomNav);
  }

  // --- Dynamic Header Links Active State Highlighting ---
  const headerLinksContainer = document.querySelector('.header-links');
  if (headerLinksContainer) {
    const currentPath = window.location.pathname.toLowerCase();
    const links = headerLinksContainer.querySelectorAll('.header-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const hrefLower = href.toLowerCase();
        link.classList.remove('active');
        
        // Highlight based on current path match
        if (currentPath.includes(hrefLower)) {
          link.classList.add('active');
        } else if (currentPath.includes('dashboard') && hrefLower.includes('dashboard')) {
          link.classList.add('active');
        } else if ((currentPath.includes('lesson') || currentPath.includes('exercise') || currentPath.includes('videos')) && hrefLower.includes('lesson')) {
          link.classList.add('active');
        } else if (currentPath.includes('resources') && hrefLower.includes('resources')) {
          link.classList.add('active');
        } else if (currentPath.includes('learn') && hrefLower.includes('learn')) {
          link.classList.add('active');
        }
      }
    });
  }

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

      const btn = loginForm.querySelector('[type="submit"]');
      btn.innerHTML = '<span class="spinner"></span> Masuk...';
      btn.disabled = true;

      // 1. Set mock session immediately
      const mockUser = { name: "Birendra", email: email || "birendra@email.com" };
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-token-123456');

      // 2. Fire API request asynchronously in background (do not block UI)
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }).catch(() => {});

      // 3. Redirect instantly
      window.showToast("Selamat datang kembali, Birendra!", "success");
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 300);
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
