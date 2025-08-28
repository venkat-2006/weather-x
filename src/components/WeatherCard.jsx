import "./WeatherCard.css";

export default function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <div className="weather-main">
        <h3>{data.weather[0].main}</h3>
        <p className="description">{data.weather[0].description}</p>
      </div>
      <p className="temp">{Math.round(data.main.temp)}°C</p>
      <div className="details">
        <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} m/s</p>
        <p>Pressure: {data.main.pressure} hPa</p>
      </div>
    </div>
  );
}