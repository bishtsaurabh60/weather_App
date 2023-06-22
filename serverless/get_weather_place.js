import fetch from "node-fetch";

const { WEATHER_API_KEY } = import.meta.env;

export async function handler(event, context) {
    const params = JSON.parse(event.body);
    const { city } = params;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
    
  const encodedUrl = encodeURI(url);
  try {
    const dataStream = await fetch(encodedUrl);
    const jsonData = await dataStream.json();
    return {
      statusCode: 200,
      body: JSON.stringify(jsonData),
    };
  } catch (err) {
    return { statusCode: 422, body: err.stack };
  }
}