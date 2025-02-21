export const COLORS = {
  background: "#F5FCFF",
  text: "#000000",
  primary: "#007AFF",
  inactive: "#8E8E93",
  error: "#FF3B30",
  white: "#FFFFFF"
} as const;

export const WEATHER_GRADIENTS = {
  Clear: ["#4DA0B0", "#D39D38"] as const,
  Clouds: ["#616161", "#9BC5C3"] as const,
  Rain: ["#000046", "#1CB5E0"] as const,
  Snow: ["#E6DADA", "#274046"] as const,
  Thunderstorm: ["#232526", "#414345"] as const,
  default: ["#2C3E50", "#3498DB"] as const
} as const;
