// Theme: follows the system setting, then remembers the visitor's choice
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? 'Light' : 'Dark';
  try { localStorage.setItem('theme', theme); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

// Project filter
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const type = chip.dataset.filter;
  projects.forEach(p => { p.hidden = type !== 'all' && p.dataset.type !== type; });
}));

// Copy email
const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('sameerbunny123@gmail.com');
    copyBtn.textContent = 'Copied';
  } catch (e) {
    copyBtn.textContent = 'sameerbunny123@gmail.com';
  }
  setTimeout(() => { copyBtn.textContent = 'Copy email address'; }, 2000);
});

document.getElementById('year').textContent = new Date().getFullYear();
