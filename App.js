import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import sunny from "./images/sunny.jpg";
import rainy from "./images/rainy.jpg";
import cloudy from "./images/cloudy.jpg";
import stormy from "./images/stormy.jpg";

function App() {
    const API_KEY = "your api token"; // Replace with your OpenWeather API key
    const [city, setCity] = useState("Delhi"); // Default city
    const [weather, setWeather] = useState("sunny"); // Default weather
    const [temperature, setTemperature] = useState(null); // Temperature

    // Define background images for different weather conditions
    const weatherBackgrounds = {
        sunny: sunny,
        rainy: rainy,
        cloudy: cloudy,
        stormy: stormy,
    };

    // List of cities to select from
    const cities = [
        "Delhi",
        "Mumbai",
        "Chennai",
        "Kolkata",
        "Bangalore",
        "Hyderabad",
        "Pune",
        "Jaipur",
    ];

    // Function to fetch weather data from API
    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const weatherCondition = response.data.weather[0].main.toLowerCase();
            setTemperature(response.data.main.temp);

            // Update weather based on the condition
            if (weatherCondition.includes("rain")) {
                setWeather("rainy");
            } else if (weatherCondition.includes("cloud")) {
                setWeather("cloudy");
            } else if (weatherCondition.includes("storm")) {
                setWeather("stormy");
            } else {
                setWeather("sunny");
            }
        } catch (error) {
            alert("Error fetching weather data. Please try again.");
        }
    };

    return (
        <div
            className="app"
            style={{
                backgroundImage: `url(${weatherBackgrounds[weather]})`,
            }}
        >
            <div className="weather-container">
                <h1>Weather App</h1>
                <p>City: {city}</p>
                <p>Weather: {weather.charAt(0).toUpperCase() + weather.slice(1)}</p>
                {temperature && <p>Temperature: {temperature}°C</p>}

                {/* Dropdown to select city */}
                <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>

                {/* Button to fetch weather */}
                <button onClick={fetchWeather}>Get Weather</button>
            </div>
        </div>
    );
}

export default App;
