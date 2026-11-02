/**
 * BUILD WITH EUGENE — MAIN JAVASCRIPT
 * js/script.js
 *
 * Sections:
 * 1. NAVBAR — mobile menu toggle, scroll shadow effect
 * 2. SMOOTH SCROLLING
 * 3. SCROLL REVEAL — IntersectionObserver for fade-in sections
 * 4. PROJECT VIDEO SWITCHER — sticky scroll logic
 * 5. GRAPHIC DESIGN LIGHTBOX — custom lightweight lightbox
 * 6. ACTIVE NAV LINK — highlight current page
 * 7. FAQ ACCORDION
 */

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('[data-current-year]').forEach(year => {
    year.textContent = new Date().getFullYear().toString();
  });

  // ==========================================
  // 1. NAVBAR
  // ==========================================
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  // Scroll shadow
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 2. SMOOTH SCROLLING
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // 3. SCROLL REVEAL
  // ==========================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // 4. PROJECT VIDEO SWITCHER (Sticky Scroll)
  // ==========================================
  const projectItems = document.querySelectorAll('.project-item');
  const projectVideos = document.querySelectorAll('.project-video');
  const projectLayout = document.querySelector('.projects-layout');
  const browserContent = document.querySelector('.projects-display .browser-content');
  const previewVideos = document.querySelectorAll('.project-video, .project-card-video video');
  let playingVideo = null;
  let videoObserver = null;

  const playVideo = video => {
    previewVideos.forEach(otherVideo => {
      if (otherVideo !== video) otherVideo.pause();
    });

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    playingVideo = video;

    const playRequest = video.play();
    if (playRequest) playRequest.catch(() => {
      if (playingVideo === video) playingVideo = null;
    });
  };

  const pauseVideo = video => {
    video.pause();
    if (playingVideo === video) playingVideo = null;
  };

  if (projectItems.length > 0 && projectVideos.length > 0 && projectLayout && browserContent) {
    let currentActive = 0;

    const switchProject = (index) => {
      if (index === currentActive) return;

      // Update project items
      projectItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });

      // Update videos
      projectVideos.forEach((video, i) => {
        if (i === index) {
          video.classList.add('active');
        } else {
          video.classList.remove('active');
          pauseVideo(video);
        }
      });

      currentActive = index;
      if (videoObserver && shouldUseVisibilityPlayback()) {
        videoObserver.unobserve(projectVideos[index]);
        videoObserver.observe(projectVideos[index]);
      }
    };

    // Initialize: activate first project
    projectItems[0]?.classList.add('active');

    // Check if we're on desktop (sticky layout)
    const isStickyLayout = () => window.innerWidth > 1024;
    const isInlineLayout = () => window.innerWidth <= 768;

    const projectObserver = new IntersectionObserver((entries) => {
      if (!isStickyLayout()) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.project);
          if (!isNaN(index)) switchProject(index);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-20% 0px -20% 0px'
    });

    projectItems.forEach(item => projectObserver.observe(item));

    const handleResize = () => {
      if (isInlineLayout()) {
        projectLayout.classList.add('projects-layout--inline');

        projectItems.forEach((item, index) => {
          const slot = item.querySelector('.project-video-slot');
          const video = projectVideos[index];
          if (slot && video) {
            slot.append(video);
            video.classList.add('active');
          }
        });
      } else {
        projectLayout.classList.remove('projects-layout--inline');
        projectVideos.forEach(video => browserContent.append(video));
        projectVideos.forEach((video, index) => {
          video.classList.toggle('active', index === currentActive);
          pauseVideo(video);
        });
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
  }

  const isMobileViewport = () => window.innerWidth <= 768;
  const supportsHover = () => window.matchMedia('(any-hover: hover)').matches;
  const shouldUseVisibilityPlayback = () => isMobileViewport()
    || (window.innerWidth <= 1024 && !supportsHover());

  previewVideos.forEach(video => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.addEventListener('pointerenter', event => {
      if (
        !isMobileViewport()
        && supportsHover()
        && event.pointerType !== 'touch'
        && (!video.matches('.project-video') || video.classList.contains('active'))
      ) {
        playVideo(video);
      }
    });

    video.addEventListener('pointerleave', event => {
      if (!isMobileViewport() && supportsHover() && event.pointerType !== 'touch') {
        pauseVideo(video);
      }
    });
  });

  if (previewVideos.length > 0) {
    videoObserver = new IntersectionObserver(entries => {
      if (!shouldUseVisibilityPlayback()) return;

      entries.forEach(entry => {
        if (entry.target.matches('.project-video') && !entry.target.classList.contains('active')) {
          return;
        }

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          playVideo(entry.target);
        } else {
          pauseVideo(entry.target);
        }
      });
    }, { threshold: 0.5 });

    previewVideos.forEach(video => videoObserver.observe(video));

    window.addEventListener('resize', () => {
      if (playingVideo) pauseVideo(playingVideo);
      videoObserver.disconnect();
      previewVideos.forEach(video => videoObserver.observe(video));
    }, { passive: true });
  }

  // ==========================================
  // 5. GRAPHIC DESIGN LIGHTBOX
  // ==========================================
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg) {
    const openLightbox = (src, alt) => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      // Small delay before clearing src to avoid flash
      setTimeout(() => { lightboxImg.src = ''; }, 300);
    };

    document.querySelectorAll('.design-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) openLightbox(img.src, img.alt);
      });
      // Keyboard support
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const img = item.querySelector('img');
          if (img) openLightbox(img.src, img.alt);
        }
      });
    });

    // Close handlers
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

  // ==========================================
  // 6. ACTIVE NAV LINK
  // ==========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ==========================================
  // 7. FAQ ACCORDION
  // ==========================================
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });

});
