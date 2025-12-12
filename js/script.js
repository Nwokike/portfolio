document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    function updateIcon(isDark) {
        if (themeIcon) {
            if (isDark) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark');
        updateIcon(true);
    } else {
        updateIcon(false);
    }

    if(themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            updateIcon(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if(menuBtn && mobileMenu && closeMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('open');
        });

        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
        });

        const navLinks = document.querySelectorAll('.mobile-menu .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const phrases = [
            "Building Intelligent Software",
            "Engineering for Impact",
            "NLP Research for Africa",
            "Agricultural Engineering"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Deleting speed
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Typing speed
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before next phrase
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }

    // Update year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
