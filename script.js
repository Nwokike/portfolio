// Theme toggle
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
(function(){
  const userPref = localStorage.getItem('theme');
  setTheme(
    userPref === 'dark' ||
    (!userPref && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
})();

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
menuBtn.onclick = () => mobileMenu.classList.add('open');
closeMenu.onclick = () => mobileMenu.classList.remove('open');
mobileMenu.querySelectorAll('.nav-link').forEach(link => {
  link.onclick = () => mobileMenu.classList.remove('open');
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id.startsWith('#')) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
document.getElementById('year').textContent = new Date().getFullYear();

// Modal for CV and Certificate (INSTANT VIEW)
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
