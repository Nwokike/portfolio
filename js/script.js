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

    if(themeToggle) {
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

    // Update year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // FAQ Accordion (Only on services.html, but included here for reusability)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isActive = question.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-question').classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- Modal Functionality for CV and Certificate (Only on index.html, but included here for reusability) ---
    const modal = document.getElementById('modal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    const cvBtn = document.getElementById('cvBtn');
    const certBtn = document.getElementById('certBtn');

    // Function to open modal with a PDF
    function openPdfModal(pdfPath, title) {
        modalContent.innerHTML = `
            <button class="modal-close" id="modalClose">×</button>
            <h3>${title}</h3>
            <iframe src="${pdfPath}" width="100%" height="80vh" type="application/pdf"></iframe>
        `;
        // Re-attach close button listener after innerHTML
        const newCloseBtn = document.getElementById('modalClose');
        if (newCloseBtn) {
            newCloseBtn.addEventListener('click', closeModal);
        }
        modal.classList.add('open'); // Use class for showing modal
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Event listeners for buttons
    if (cvBtn) {
        cvBtn.addEventListener('click', function() {
            openPdfModal('../pdfs/CV ONYEKA NWOKIKE .pdf', 'Curriculum Vitae'); // Updated path relative to index.html
        });
    }

    if (certBtn) {
        certBtn.addEventListener('click', function() {
            openPdfModal('../pdfs/ONYEKANWOKIKE-Programming Esse-certificate.pdf', 'Python Certificate'); // Updated path relative to index.html
        });
    }

    // Close modal functions
    function closeModal() {
        modal.classList.remove('open'); // Use class for hiding modal
        document.body.style.overflow = ''; // Re-enable background scrolling
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Close modal if backdrop is clicked (clicking outside content)
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function(event) {
            if (event.target === modalBackdrop) { // Ensure click is directly on backdrop, not child elements
                closeModal();
            }
        });
    }

});
