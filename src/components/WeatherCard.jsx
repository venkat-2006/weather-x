import "./WeatherCard.css";

export default function WeatherCard({ data }) {
  // Function to get weather emoji
  const getWeatherEmoji = (weatherMain, weatherDescription) => {
    const main = weatherMain?.toLowerCase();
    const description = weatherDescription?.toLowerCase();
    
    if (main === 'clear') return '☀️';
    if (main === 'clouds') {
      if (description.includes('few')) return '🌤️';
      if (description.includes('scattered')) return '⛅';
      if (description.includes('broken') || description.includes('overcast')) return '☁️';
      return '☁️';
    }
    if (main === 'rain') {
      if (description.includes('light')) return '🌦️';
      if (description.includes('heavy') || description.includes('extreme')) return '⛈️';
      return '🌧️';
    }
    if (main === 'drizzle') return '🌦️';
    if (main === 'thunderstorm') return '⛈️';
    if (main === 'snow') {
      if (description.includes('light')) return '🌨️';
      return '❄️';
    }
    if (main === 'mist' || main === 'fog') return '🌫️';
    if (main === 'haze') return '😶‍🌫️';
    if (main === 'dust' || main === 'sand') return '🌪️';
    if (main === 'tornado') return '🌪️';
    if (main === 'squall') return '💨';
    return '🌈';
  };

  // Function to get temperature emoji
  const getTempEmoji = (temp) => {
    if (temp >= 35) return '🔥';
    if (temp >= 25) return '🌡️';
    if (temp >= 15) return '😊';
    if (temp >= 5) return '🧥';
    if (temp >= -5) return '🥶';
    return '🧊';
  };

  // Function to get wind emoji
  const getWindEmoji = (speed) => {
    if (speed >= 10) return '💨';
    if (speed >= 5) return '🍃';
    return '🌿';
  };

  // Function to get humidity emoji
  const getHumidityEmoji = (humidity) => {
    if (humidity >= 80) return '💧';
    if (humidity >= 60) return '💦';
    return '☁️';
  };

  // Get emojis for current weather
  const weatherEmoji = getWeatherEmoji(data.weather[0].main, data.weather[0].description);
  const tempEmoji = getTempEmoji(data.main.temp);
  const windEmoji = getWindEmoji(data.wind.speed);
  const humidityEmoji = getHumidityEmoji(data.main.humidity);

  return (
    <div className="weather-card">
      <h2>📍 {data.name}, {data.sys.country}</h2>
      
      <div className="weather-main">
        <span className="weather-emoji">{weatherEmoji}</span>
        <div className="weather-info">
          <h3>{data.weather[0].main}</h3>
          <p className="description">{data.weather[0].description}</p>
        </div>
      </div>
      
      <div className="temp-section">
        <span className="temp-emoji">{tempEmoji}</span>
        <p className="temp">{Math.round(data.main.temp)}°C</p>
      </div>
      
      <div className="details">
        <p><span className="detail-emoji">🤒</span> Feels like: {Math.round(data.main.feels_like)}°C</p>
        <p><span className="detail-emoji">{humidityEmoji}</span> Humidity: {data.main.humidity}%</p>
        <p><span className="detail-emoji">{windEmoji}</span> Wind: {data.wind.speed} m/s</p>
        <p><span className="detail-emoji">🌊</span> Pressure: {data.main.pressure} hPa</p>
      </div>
    </div>
  );
}