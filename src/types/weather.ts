export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export interface CitySearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface ForecastData {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
}
