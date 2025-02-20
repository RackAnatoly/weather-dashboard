import { WeatherData } from "../types/weather";
import { ENV } from "../../env";

const API_KEY = ENV.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    };
  } catch (error) {
    throw new Error("Error fetching weather data");
  }
};
