export interface IWeatherData {
  current: {
    time: Date;
    temperature2m: number;
    relativeHumidity2m: number;
    apparentTemperature: number;
    isDay: number;
    weatherCode: number;
    windSpeed10m: number;
};
daily: {
  dayOfWeek: string[];
  weatherCode: Float32Array;
  temperature2mMax: Float32Array;
  temperature2mMin: Float32Array;
  uvIndexMax: Float32Array;
  precipitationProbabilityMax: Float32Array;
};
}