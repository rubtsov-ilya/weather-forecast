import styles from './FirstSection.module.scss'
import { FC, useLayoutEffect, useState } from 'react'
import LogoSvg from '../../../../assets/images/logo-icons/Logo-city-page.svg?react'
import SearchSelect from '../../../ui/search-select/SearchSelect'
import ImageWrapper from './image-wrapper/ImageWrapper'
import WeatherDetail from './weather-details/WeatherDetail'
import DaysForecast from './days-forecast/DaysForecast'
import { fetchWeatherApi } from 'openmeteo';
import useCityInfo from '../../../../hooks/useCityInfo'
import { IWeatherData } from '../../../../interfaces/WeatherData.interface'

const FirstSection: FC = () => {
  const [weatherDataState, setWeatherDataState] = useState<IWeatherData | null>(null)
  const { latitude, longitude } = useCityInfo()
  const params = {
    "latitude": latitude,
    "longitude": longitude,
    "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "weather_code", "wind_speed_10m"],
    "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "uv_index_max", "precipitation_probability_max"],
    "timezone": "auto"
  };
  const url = "https://api.open-meteo.com/v1/forecast";



useLayoutEffect(() => {
  if (latitude && longitude) {
    const fetchWeatherData = async () => {
      const responses = await fetchWeatherApi(url, params);
      // Helper function to form time ranges
      const range = (start: any, stop: any, step: any) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];
      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const daily = response.daily()!;
      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        current: {
          time: new Date(Number(current.time()) * 1000 + utcOffsetSeconds * 1000 - 3 * 60 * 60 * 1000),
          temperature2m: current.variables(0)!.value(),
          relativeHumidity2m: current.variables(1)!.value(),
          apparentTemperature: current.variables(2)!.value(),
          isDay: current.variables(3)!.value(),
          weatherCode: current.variables(4)!.value(),
          windSpeed10m: current.variables(5)!.value(),
        },
        daily: {
          dayOfWeek: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000).toLocaleDateString('ru-RU', { weekday: 'long' })
          ),
          weatherCode: daily.variables(0)!.valuesArray()!,
          temperature2mMax: daily.variables(1)!.valuesArray()!,
          temperature2mMin: daily.variables(2)!.valuesArray()!,
          uvIndexMax: daily.variables(3)!.valuesArray()!,
          /* вероятность осадков */
          precipitationProbabilityMax: daily.variables(4)!.valuesArray()!,
        },
    
      };
    
      setWeatherDataState(weatherData)
    };
    fetchWeatherData();
  }
  }, 
[latitude, longitude]);

  // weatherData now contains a simple structure with arrays for datetime and weather data
for (let i = 0; weatherDataState && i < weatherDataState.daily.dayOfWeek.length; i++) {
  console.log(
    weatherDataState.daily.dayOfWeek[i],
    weatherDataState.daily.weatherCode[i],
    weatherDataState.daily.temperature2mMax[i].toFixed(2),
    weatherDataState.daily.temperature2mMin[i].toFixed(2),
    weatherDataState.daily.uvIndexMax[i].toFixed(2),
    weatherDataState.daily.precipitationProbabilityMax[i].toFixed(2)
  );
}

  return (
    <section className={styles["first-section"]}>
    <div className="container">
      <div className={styles["first-section__content"]}>
        <div className={styles["first-section__main-left-wrapper"]}>
          <div className={styles["first-section__search-wrapper"]}>
            <LogoSvg className={styles["first-section__logo"]}/>
            <SearchSelect isCityPage={true}/>
          </div>
          <ImageWrapper weatherDataState={weatherDataState}/>
        </div>
        <div className={styles["first-section__main-right-wrapper"]}>
          <WeatherDetail />
          <DaysForecast />
        </div>
      </div>
    </div>
  </section>
  )
}

export default FirstSection