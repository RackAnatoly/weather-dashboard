import { CitySearchResult, ForecastData, WeatherData } from "../types/weather";
import { ENV } from "../../env";

const API_KEY = ENV.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

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

export const searchCities = async (
  query: string
): Promise<CitySearchResult[]> => {
  if (query.length < 3) return [];

  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(
        query
      )}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    const data = await response.json();

    return data.map((city: any) => ({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon
    }));
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
};

export const getForecast = async (
  lat: number,
  lon: number
): Promise<ForecastData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const data = await response.json();

    const dailyForecasts = data.list.reduce(
      (acc: ForecastData[], item: any) => {
        const timestamp = item.dt * 1000;
        const date = new Date(timestamp).toISOString().split("T")[0];

        const existingForecast = acc.find((forecast) => forecast.date === date);

        if (!existingForecast) {
          acc.push({
            date,
            minTemp: item.main.temp_min,
            maxTemp: item.main.temp_max,
            condition: item.weather[0].main,
            icon: item.weather[0].icon
          });
        } else {
          existingForecast.minTemp = Math.min(
            existingForecast.minTemp,
            item.main.temp_min
          );
          existingForecast.maxTemp = Math.max(
            existingForecast.maxTemp,
            item.main.temp_max
          );
        }

        return acc;
      },
      []
    );

    return dailyForecasts.slice(0, 5);
  } catch (error) {
    throw new Error("Error fetching forecast data");
  }
};
