document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = 
    `Last Modification: ${document.lastModified}`;

const temperature = 10;   // °C
const windSpeed = 8;       // km/h

function calculateWindChill(temp, speed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);
}

const windChillEl = document.querySelector('#windchill');

if (temperature <= 10 && windSpeed > 4.8) {
    windChillEl.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    windChillEl.textContent = 'N/A';
}