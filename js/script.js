document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark');
            if (body.classList.contains('dark')) {
                themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu && closeMenu) {
        menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
        closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));

        document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('open'));
        });
    }

    // Update year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // FAQ Accordion – only if FAQ exists
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const isActive = question.classList.contains('active');

                // Close all
                faqItems.forEach(otherItem => {
                    const q = otherItem.querySelector('.faq-question');
                    const a = otherItem.querySelector('.faq-answer');
                    if (q && a) {
                        q.classList.remove('active');
                        a.style.maxHeight = null;
                    }
                });

                // Open clicked if not active
                if (!isActive && answer) {
                    question.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }
});
