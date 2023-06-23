// import {getData, getDataServerless, hostMode } from '../api/weatherAPI';
import {getDataServerless } from '../api/weatherAPI';
import { getWeatherReport,showError } from './displayData';

// const APIKey: string = "YOUR_API_KEY";

// let api: string;


// data fetching by city or country
// const getWeatherData = async (city:string): Promise<void> => {
//   api = `q=${city}&units=metric&appid=${APIKey}`;
//   try {
//     const data = await getData(api);
//     console.log(data);
//     getWeatherReport(data);
//   } catch (error) {
//     showError(`Please enter correct city or country name.`);
//     throw new Error(`${error}`);
//   }
// };


// data fetching by geolocation

// const byGeoLocation = async (position: GeolocationPosition) : Promise<void> => {
//   console.log(position);
//   const { latitude, longitude } = position.coords;
//   api = `lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`;
//   try {
//     const data = await getData(api);
//     // console.log(data);
//     getWeatherReport(data);
//   } catch (error) {
//     showError(`Not able to access your Geolocation Coordinates.`);
//     throw new Error(`${error}`);
//   }
// };


// getWeather Data by using city, country

const getWeatherData = async (city:string): Promise<void> => {
  try {
     const dataWeather = await getDataServerless('get_weather_place', city); 
    getWeatherReport(dataWeather);
  } catch (error) {
    showError(`Please enter correct city or country name.`);
    throw new Error(`${error}`);
  }
};

export type geoUrlType = {
  latitude: number,
  longitude: number,
  units:string
}

// get weather data by using geolocation

const byGeoLocation = async (position: GeolocationPosition) : Promise<void> => {
  const { latitude, longitude } = position.coords;
  const urlGeoData: geoUrlType = {
    latitude,
    longitude,
    units:'metric'
  }
  try {
    const data = await getDataServerless('get_weather_geo',urlGeoData);
    
    getWeatherReport(data);
  } catch (error) {
    showError(`Not able to access your Geolocation Coordinates.`);
    throw new Error(`${error}`);
  }
};

export {getWeatherData,byGeoLocation}