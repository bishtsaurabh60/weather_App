import { formEle, location_input, geoLocationBtn } from './modules/selectors';
import { showError } from './modules/displayData';
import { getWeatherData,byGeoLocation } from './modules/getWeatherData';
// event handlers

location_input?.focus();

formEle?.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = location_input?.value;
  
  if (!city) {
    showError(`Please enter city or country name.`);
    return;
  }

  getWeatherData(city.toLowerCase())
    .then(() => {
      location_input!.value = "";
    })
    .catch((error) => {
      console.log(error);
    });
});

geoLocationBtn?.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(byGeoLocation);
  } else {
    alert("Your browser does not support geolocation API.");
  }
});
