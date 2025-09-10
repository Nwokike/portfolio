// Theme toggle (light/dark)
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
function setTheme(dark) {
    document.body.classList.toggle('dark', dark);
    themeIcon.textContent = dark ? "☀️" : "🌙";
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}
themeBtn.addEventListener('click', () =>
    setTheme(!document.body.classList.contains('dark'))
);
// On load, set theme from localStorage or OS
(function(){
    const userPref = localStorage.getItem('theme');
    setTheme(
        userPref === 'dark' ||
        (!userPref && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
})();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile');
    mobileMenu.classList.toggle('open');
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const id = this.getAttribute('href');
        if (id.startsWith('#')) {
            e.preventDefault();
            document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
            mobileMenu.classList.add('mobile');
            mobileMenu.classList.remove('open');
        }
    });
});

// Modal for CV and Certificate
const modal = document.getElementById('modal');
const modalIframe = document.getElementById('modalIframe');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

function openModal(file) {
    modalIframe.src = file;
    modal.classList.add('open');
}
function closeModal() {
    modal.classList.remove('open');
    modalIframe.src = '';
}
document.getElementById('cvBtn').onclick = () => openModal('CV ONYEKA NWOKIKE .pdf');
document.getElementById('certBtn').onclick = () => openModal('ONYEKANWOKIKE-Programming Esse-certificate.pdf');
modalClose.onclick = closeModal;
modalBackdrop.onclick = closeModal;
window.addEventListener('keydown', e => {
    if (e.key === "Escape" && modal.classList.contains('open')) {
        closeModal();
    }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
