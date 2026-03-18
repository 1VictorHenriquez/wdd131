const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.textContent = nav.classList.contains('open') ? '✕' : '☰';
});

const currentYear = new Date().getFullYear();
document.getElementById("setcurrentyear").textContent = currentYear;

const lastMod = document.lastModified;
document.getElementById("setlastModified").textContent = `Last Modification: ${lastMod}`;