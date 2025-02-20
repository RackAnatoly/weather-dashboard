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
