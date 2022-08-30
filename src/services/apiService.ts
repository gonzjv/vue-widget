const API_KEY =
  '2671b0be896edd79fd71f7cdabc7d1dd';
const UNITS = 'metric';

const getCoordinates = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
  );
  const [data] = await response.json();
  // console.log('response', data)
  return { lat: data.lat, lon: data.lon };
};

export const getWeatherInfo = async (
  city: string
) => {
  const coordinates = await getCoordinates(city);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${UNITS}&appid=${API_KEY}`
  );

  const data = await response.json();

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  return {
    weatherData: data,
    iconUrl: iconUrl,
  };
};
