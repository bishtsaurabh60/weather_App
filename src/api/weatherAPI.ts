import { cityInfoType, geoUrlType } from "../modules/getWeatherData";


let serverlessApiDes: string = `./.netlify/functions/`;

export interface WeatherType{
  wind: {
    speed: string
  },
  sys: {
    country:string
  },
  name: string,
  dt: number,
  timezone: number,
  main: {
    temp: number,
    temp_min: number,
    temp_max: number,
    feels_like: number,
    humidity: number, 
    pressure:number
  },
  weather: [
    {
      description: string,
      icon: string,
      
    }
  ]
}

export type cityType=[{
    name: string,
    country: string,
  state?: string,
  }];
// In DEV MODE without serverless functions

// const url: string = "https://api.openweathermap.org/data/2.5/weather?"; 

// const getData = async (api: string): Promise<WeatherType> => {
//   try {
//     console.log(api);
    
//     const response = await fetch(`${url}${api}`);
//     if (!response.ok) {
//       throw new Error("Unable to fetch weather data.");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error(`Unable to fetch weather data.${error}`);
//   }
// };


// In PRODUCTION Mode

const getDataServerless = async (api: string, urlData?: geoUrlType | cityInfoType | string): Promise<WeatherType | cityType> => {
  try { 
    const response = await fetch(`${serverlessApiDes}${api}`, {
      method: 'POST',
      body: JSON.stringify(urlData)
    });
    if (!response.ok) {
      throw new Error("Unable to fetch weather data.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Unable to fetch weather data.${error}`);
  }
};

// export { getData, getDataServerless };
export { getDataServerless };