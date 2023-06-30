import { WeatherType } from "../api/weatherAPI";
import {
  header,
  weather_data,
  place,
  time,
  weatherConditionIcon,
  temperature,
  minMaxTemp,
  weather_description,
  displayError,
  result,
} from "../modules/selectors";
import { convertCountryCode, formatDateTime } from "./conversion";

const getWeatherReport = (weatherData:WeatherType,stateAndCountryIf?:string):void => {
  const { wind, sys, name, dt, timezone } = weatherData;
  const { temp, temp_min, temp_max, feels_like, humidity, pressure } = weatherData.main;
  const { icon, description } = weatherData.weather[0];
  
  // Place and time
  const timezoneOffset = timezone / 3600; // Convert timezone to timezone offset from seconds to hours
  const formattedDateTime = formatDateTime(dt, timezoneOffset);

  let state;
  let countryName: string | undefined;
  
  if (stateAndCountryIf !== undefined) {
    const hasComma = stateAndCountryIf?.indexOf(",") !== -1;
    if (hasComma) {
      state = stateAndCountryIf.split(",")[0];
      countryName = stateAndCountryIf.split(",")[1].trim().toUpperCase();
    } else if (stateAndCountryIf!=='')
      countryName = stateAndCountryIf.trim().toUpperCase();
  }
  if(stateAndCountryIf==='' || stateAndCountryIf===undefined) {
    state = '';
    countryName = sys.country;
  }
  
  const country:string | undefined= convertCountryCode(countryName as string);
  place!.textContent =
    (state!==undefined && state!=='')? `${name}, ${state}, ${country}` : `${name}, ${country}`;
  time!.textContent = formattedDateTime;
  
  // weather icon
  weatherConditionIcon!.src = ` https://openweathermap.org/img/wn/${icon}@4x.png`;

  // Temperatures
  temperature!.children[0].textContent = `${temp.toFixed(1)}`;
  
  minMaxTemp!.children[0].textContent = `Min : ${temp_min}°C`;
  minMaxTemp!.children[1].textContent = `Max : ${temp_max}°C`;

  // Description and weather conditions
  weather_description!.textContent = `${description}`;

  const weather_ConditionsData = [feels_like, humidity, wind.speed, pressure];
  let weather_Conditions = weather_data!.querySelectorAll(".details_numbers");

  for (let i = 0; i < weather_ConditionsData.length; i++) {
    weather_Conditions[i].textContent = `${weather_ConditionsData[i]}`;
  }

  header!.style.display = "none";
  displayError!.style.display = "none";
  weather_data!.style.display = "flex";
  result!.innerHTML='';
};


// show error
const showError = (message:string):void => {
  displayError!.children[1].textContent = message;
  displayError!.style.display = "flex";
  weather_data!.style.display = "none";
  header!.style.display = "block";
};

export { getWeatherReport, showError };