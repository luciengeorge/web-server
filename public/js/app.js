const weatherForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const locationMessage = document.querySelector('#location');
const forecastMessage = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = searchInput.value;
  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      locationMessage.innerHTML = location;
      if (data.error) {
        forecastMessage.innerHTML = data.error;
      } else {
        forecastMessage.innerHTML = data.forecast.summary;
      }
    });
});
