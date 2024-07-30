import { useState, useEffect } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b6f06d04fd6f7dede359be36f50e6f1b`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching weather data:", error);
      }
    };

    const handleLocation = (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    };

    const handleLocationError = (error) => {
      setError(`Error getting location: ${error.message}`);
      console.error("Error getting location:", error);
      fetchWeather(41.2995, 69.2401);
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          handleLocation,
          handleLocationError
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        fetchWeather(41.2995, 69.2401); 
      }
    };

    getLocation();
  }, []);

  if (error) {
    return <div className="flex items-center text-red-500">{error}</div>;
  }

  return (
    <div className="lg:flex hidden items-center">
      {weather ? (
        <div className="text-center flex justify-between gap-3 items-center">
          <p className="text-xl font-semibold">{weather.name}</p>
          <p className="text-lg font-semibold">{weather.main.temp}°C</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
