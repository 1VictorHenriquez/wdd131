const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Caracas Venezuela",
    location: "Caracas, Venezuela",
    dedicated: "2000, August, 20",
    area: 10594,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/096-Caracas-Venezuela-Temple.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  }
];

const gallery = document.querySelector('#gallery');
const filterTitle = document.querySelector('#filter-title');
const navLinks = document.querySelectorAll('nav a');
const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.textContent = nav.classList.contains('open') ? '✕' : '☰';
});

function createTempleCard(temple) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
        <h3>${temple.templeName}</h3>
        <p><span>Location:</span> ${temple.location}</p>
        <p><span>Dedicated:</span> ${temple.dedicated}</p>
        <p><span>Size:</span> ${temple.area.toLocaleString()} sq ft</p>
        <img src="${temple.imageUrl}" 
             alt="${temple.templeName}" 
             loading="lazy"
             width="400" height="250">
    `;
    return figure;
}

function displayTemples(list) {
    gallery.innerHTML = '';
    list.forEach(temple => {
        gallery.appendChild(createTempleCard(temple));
    });
}

function filterTemples(filter) {
    let filtered;

    if (filter === 'old') {
        filtered = temples.filter(t => parseInt(t.dedicated) < 1900);
        filterTitle.textContent = 'Old Temples';
    } else if (filter === 'new') {
        filtered = temples.filter(t => parseInt(t.dedicated) > 2000);
        filterTitle.textContent = 'New Temples';
    } else if (filter === 'large') {
        filtered = temples.filter(t => t.area > 90000);
        filterTitle.textContent = 'Large Temples';
    } else if (filter === 'small') {
        filtered = temples.filter(t => t.area < 10000);
        filterTitle.textContent = 'Small Temples';
    } else {
        filtered = temples;
        filterTitle.textContent = 'Home';
    }

    displayTemples(filtered);
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.dataset.filter;
        filterTemples(filter);

        nav.classList.remove('open');
        hamburger.textContent = '☰';
    });
});

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = 
    `Last Modification: ${document.lastModified}`;

filterTemples('all');