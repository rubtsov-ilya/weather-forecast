import styles from './DaysForecast.module.scss';
import { useMediaQuery } from 'react-responsive';
import { FC } from 'react';
import { IWeatherData } from '../../../../../interfaces/WeatherData.interface';
import useGetSvgIcon from '../../../../../hooks/useGetSvgIcon';

interface DaysForecastProps {
  weatherDataState: IWeatherData | null
}

const DaysForecast: FC<DaysForecastProps> = ({ weatherDataState }) => {
  const isMobileMediaQuery = useMediaQuery({ query: '(max-width: 575px)' });

  return (
    <div className={styles["days-forecast"]}>
      <h3 className={styles["days-forecast__title"]}>Прогноз на 5 дней</h3>
      <div className={styles["days-forecast__days-wrapper"]}>
        {weatherDataState && weatherDataState.daily.weatherCode && weatherDataState.daily.dayOfWeek && weatherDataState.daily.dayOfWeek.map((dayOfWeekValue, index) => {
          const WeatherIcon = useGetSvgIcon(weatherDataState.daily.weatherCode[index])!;
          /* console.log(useGetSvgIcon(weatherDataState.daily.weatherCode[index])) */
          return (
            index > 0 && index < 6 &&
            <div key={index} className={styles["days-forecast__day-wrapper"]}>
              {!isMobileMediaQuery && <p className={styles["days-forecast__day-name"]}>{index === 1 ? 'Завтра' : dayOfWeekValue}</p>}
              {isMobileMediaQuery && (
              <p className={styles["days-forecast__day-name"]}>
                {dayOfWeekValue === 'Понедельник' ? 'Пн' :
                  dayOfWeekValue === 'Вторник' ? 'Вт' :
                  dayOfWeekValue === 'Среда' ? 'Ср' :
                  dayOfWeekValue === 'Четверг' ? 'Чт' :
                  dayOfWeekValue === 'Пятница' ? 'Пт' :
                  dayOfWeekValue === 'Суббота' ? 'Сб' :
                  'Вс'}
              </p>
              )}
              <WeatherIcon className={styles["days-forecast__svg-icon"]}/>
              <p className={styles["days-forecast__weather-desc"]}>{weatherDataState.daily.weatherCodeDescription[index]}</p>
              <div className={styles["days-forecast__minmax-temp-wrapper"]}>
                <p className={styles["days-forecast__max-temp"]}>{Math.round(weatherDataState.daily.temperature2mMax[index])}ºc</p>
                <p className={styles["days-forecast__min-temp"]}>{Math.round(weatherDataState.daily.temperature2mMin[index])}ºc</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaysForecast;