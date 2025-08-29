import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // New states for suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hoveredSuggestion, setHoveredSuggestion] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // stored in .env

  // Cities database
  const cities = [
    "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
    "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
    "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC",
    "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Boston, MA",
    "Miami, FL", "Atlanta, GA", "Las Vegas, NV", "Detroit, MI", "Nashville, TN",
    "London, UK", "Paris, France", "Tokyo, Japan", "Sydney, Australia", "Berlin, Germany",
    "Rome, Italy", "Madrid, Spain", "Amsterdam, Netherlands", "Vienna, Austria", "Prague, Czech Republic",
    "Mumbai, India", "Delhi, India", "Bangalore, India", "Chennai, India", "Kolkata, India",
    "Hyderabad, India", "Pune, India", "Ahmedabad, India", "Jaipur, India", "Surat, India"
  ];

  // Filter cities based on input
  useEffect(() => {
    if (city.length > 0) {
      const filtered = cities
        .filter((cityName) => cityName.toLowerCase().includes(city.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [city]);

  // Get dynamic placeholder
  const getPlaceholder = () => {
    if (city.length === 0) return "Enter city...";

    const displayText =
      hoveredSuggestion ||
      suggestions.find((cityName) =>
        cityName.toLowerCase().startsWith(city.toLowerCase())
      );

    return displayText || "Enter city...";
  };

  // Get the auto-complete text to show in overlay
  const getAutoCompleteText = () => {
    const placeholder = getPlaceholder();
    if (placeholder === "Enter city..." || !city) return "";

    if (placeholder.toLowerCase().startsWith(city.toLowerCase())) {
      return placeholder.slice(city.length);
    }
    return "";
  };

  // Handle suggestion hover leave
  const handleSuggestionLeave = () => {
    setHoveredSuggestion("");
  };

  // Fetch weather from API
  const fetchWeather = async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error("City not found!");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchWeather(city);
    setShowSuggestions(false);
  };

  // Handle key down for autocomplete
  const handleKeyDown = (e) => {
    const autoCompleteText = getAutoCompleteText();

    if ((e.key === "Tab" || e.key === "ArrowRight") && autoCompleteText) {
      e.preventDefault();
      const fullText = city + autoCompleteText;
      setCity(fullText);
      setShowSuggestions(false);
      setHoveredSuggestion("");
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
      setHoveredSuggestion("");
    }
  };

  // Handle suggestion hover
  const handleSuggestionHover = (cityName) => {
    setHoveredSuggestion(cityName);
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>

      <form onSubmit={handleSubmit} className="search-box">
        <div className="input-container">
          {/* Auto-complete suggestion overlay */}
          {city.length > 0 && getAutoCompleteText() && (
            <div className="placeholder-overlay">
              <span className="invisible-text">{city}</span>
              <span className="suggestion-text">{getAutoCompleteText()}</span>
            </div>
          )}

          <input
            type="text"
            value={city}
            placeholder={city.length === 0 ? "Enter city..." : ""}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => {
              setTimeout(() => {
                setShowSuggestions(false);
                setHoveredSuggestion("");
              }, 150);
            }}
          />

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((cityName, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleSuggestionHover(cityName)}
                  onMouseLeave={handleSuggestionLeave}
                  onClick={() => {
                    setCity(cityName);
                    setShowSuggestions(false);
                  }}
                  className="suggestion-item"
                >
                  <span className="highlight">
                    {cityName.slice(0, city.length)}
                  </span>
                  {cityName.slice(city.length)}
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
