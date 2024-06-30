export interface IWeatherData {
  current: {
    time: Date;
    temperature2m: number;
    relativeHumidity2m: number;
    apparentTemperature: number;
    isDay: number;
    weatherCode: number;
    weatherCodeDescription: string;
    windSpeed10m: number;
};
daily: {
  dayOfWeek: string[];
  date: string;
  weatherCode: Float32Array;
  weatherCodeDescription: string[];
  temperature2mMax: Float32Array;
  temperature2mMin: Float32Array;
  uvIndexMax: Float32Array;
  precipitationProbabilityMax: Float32Array;
};
}