// 1. Obtener el año actual para el copyright
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// 2. Obtener la fecha de última modificación del documento
const lastMod = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modification: ${lastMod}`;