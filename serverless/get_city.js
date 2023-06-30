// import fetch from 'node-fetch';

const { WEATHER_API_KEY } = process.env;

export async function handler(event) {
  const city = JSON.parse(event.body);
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`;

  const encodedUrl = encodeURI(url);
  try {
    const cityList = await fetch(encodedUrl);
      const cityJson = await cityList.json();
    return {
      statusCode: 200,
      body: JSON.stringify(cityJson),
    };
  } catch (err) {
    return { statusCode: 422, body: err.stack };
  }
}
