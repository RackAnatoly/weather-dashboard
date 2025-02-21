import { getCurrentWeather, searchCities } from "../services/weatherService";

global.fetch = jest.fn();

const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe("WeatherService", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    (console.error as jest.Mock).mockClear();
  });

  it("getCurrentWeather fetches and transforms data correctly", async () => {
    const mockApiResponse = {
      name: "London",
      main: { temp: 15.5 },
      weather: [{ main: "Cloudy", icon: "03d" }],
      coord: { lat: 51.5074, lon: -0.1278 }
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    });

    const result = await getCurrentWeather(51.5074, -0.1278);

    expect(result).toEqual({
      city: "London",
      temperature: 16,
      condition: "Cloudy",
      icon: "03d",
      coordinates: {
        lat: 51.5074,
        lon: -0.1278
      }
    });
  });

  it("searchCities returns empty array when no results found", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    const results = await searchCities("NonexistentCity");
    expect(results).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      "Error searching cities:",
      expect.any(Error)
    );
  });

  it("searchCities handles successful response", async () => {
    const mockCities = [
      { name: "London", country: "GB", lat: 51.5074, lon: -0.1278 }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCities)
    });

    const results = await searchCities("London");
    expect(results).toEqual(mockCities);
    expect(console.error).not.toHaveBeenCalled();
  });
});
