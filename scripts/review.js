let reviewCount = localStorage.getItem('reviewCount');

reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;

localStorage.setItem('reviewCount', reviewCount);

document.querySelector('#review-count').textContent = reviewCount;

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modification: ${document.lastModified}`;
