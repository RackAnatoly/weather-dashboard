# Weather App

A React Native weather application built with Expo that provides real-time weather information and forecasts.

## Features

- 📍 Location-based weather data
- 🔍 City search with autocomplete
- 🌤 Current weather conditions with dynamic backgrounds
- 📅 5-day weather forecast
- ⭐ Favorites system for quick access to preferred cities

## Technologies

- React Native
- Expo
- TypeScript
- OpenWeatherMap API
- React Navigation
- AsyncStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RackAnatoly/weather-dashboard.git
```

2. Install dependencies:
```bash
cd weather-app
yarn install
```

3. Create a env.ts file in the root directory and add your OpenWeatherMap API key:
```bash
export const ENV = {
  OPENWEATHER_API_KEY: "API"
};
```
```
OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
yarn start
```

## Project Structure

```
src/
  ├── components/        # Reusable UI components
  ├── screens/          # Screen components
  ├── hooks/            # Custom React hooks
  ├── services/         # API and business logic
  ├── constants/        # Constants and configuration
  └── types/            # TypeScript type definitions
```

## Testing

Run the test suite:
```bash
yarn test
```

## Design Decisions

- Used React Navigation for seamless navigation between screens
- Implemented a custom hook (useWeather) for centralized weather data management
- Utilized AsyncStorage for persistent storage of favorite cities
- Dynamic backgrounds based on weather conditions for better UX
- Implemented error boundaries and comprehensive error handling

## Limitations and Future Improvements

- Weather data is currently limited to the OpenWeatherMap API
- No offline support (could be improved with caching)
- Limited to hourly updates due to API constraints
- Could add more weather details and widgets

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
