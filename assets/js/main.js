
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navlinks');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(open));
            menuButton.textContent = open ? '×' : '☰';
        });

        nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            nav.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.textContent = '☰';
        }));
    }

    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Hero background slider for index.html
    const bgSlides = [...document.querySelectorAll('.hero-background-slide')];
    const bgDots = [...document.querySelectorAll('.hero-bg-dot')];
    if (bgSlides.length > 0) {
        let bgIndex = 0, bgTimer = null;

        function showBackground(i) {
            bgIndex = (i + bgSlides.length) % bgSlides.length;
            bgSlides.forEach((el, n) => el.classList.toggle('active', n === bgIndex));
            bgDots.forEach((el, n) => el.classList.toggle('active', n === bgIndex));
        }

        function startBackgroundTimer() {
            if (bgTimer) clearInterval(bgTimer);
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && bgSlides.length > 1) {
                bgTimer = setInterval(() => showBackground(bgIndex + 1), 7000);
            }
        }

        bgDots.forEach((dot, i) => dot.addEventListener('click', () => {
            showBackground(i);
            startBackgroundTimer();
        }));
        startBackgroundTimer();
    }

    // Scroll reveal animation
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    }), { threshold: .1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const successBox = document.getElementById('formSuccess');
            if (successBox) {
                successBox.classList.add('show');
            }
            this.reset();
            setTimeout(() => {
                if (successBox) {
                    successBox.classList.remove('show');
                }
            }, 5000);
        });
    }
});
