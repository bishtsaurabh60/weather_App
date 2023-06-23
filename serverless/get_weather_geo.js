// import fetch from 'node-fetch';

const { WEATHER_API_KEY } = process.env;

export async function handler(event) {
  const params = JSON.parse(event.body);
  const { latitude, longitude, units } = params;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_API_KEY}`;

  const encodedUrl = encodeURI(url);
  try {
    const weatherStream = await fetch(encodedUrl);
    const weatherJson = await weatherStream.json();
    return {
      statusCode: 200,
      body: JSON.stringify(weatherJson),
    };
  } catch (err) {
    return { statusCode: 422, body: err.stack };
  }
}