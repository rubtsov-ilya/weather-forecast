import styles from './DaysForecast.module.scss';
import { useMediaQuery } from 'react-responsive';
import ClearSvg from '../../../../../assets/images/weather-page-images/days-forecast-svg/Weather=Clear,Moment=Day.svg?react';
import CloudySvg from '../../../../../assets/images/weather-page-images/days-forecast-svg/Weather=Cloudy,Moment=Day.svg?react';
import FewCloudsSvg from '../../../../../assets/images/weather-page-images/days-forecast-svg/Weather=FewClouds,Moment=Day.svg?react';
import RainSvg from '../../../../../assets/images/weather-page-images/days-forecast-svg/Weather=Rain,Moment=Day.svg?react';
import SnowSvg from '../../../../../assets/images/weather-page-images/days-forecast-svg/Weather=Snow,Moment=Day.svg?react';
import StormSvg from '../../../../../assets/images/weather-page-images/days-forecast-svg/Weather=Storm,Moment=Day.svg?react';

type WeatherIconsType = {
  [Key in 'clear' | 'cloudy' | 'fewClouds' | 'rain' | 'snow' | 'storm']: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

interface IDays {
  name: string;
  icon: keyof WeatherIconsType;
  desc: string;
  maxTemp: string;
  minTemp: string;
};

interface IWeatherData {
  weather: keyof WeatherIconsType;
  desc: string;
};

const DaysForecast = () => {
  const days: IDays[] = [];
  const currentDate = new Date();
  const isMobileMediaQuery = useMediaQuery({ query: '(max-width: 575px)' });
  const weatherData: IWeatherData[] = [{weather: 'storm', desc: 'Слабая облачность'}, {weather: 'rain', desc: 'Слабая облачность'}, {weather: 'fewClouds', desc: 'Слабая облачность'}, {weather: 'cloudy', desc: 'Облачно'}, {weather: 'clear', desc: 'Ясно'}]

  for (let i = 0; i < 5; i++) {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() + i + 1);
    const dayName = day.toLocaleDateString('ru-RU', { weekday: 'long' });
    days.push({
      name: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      icon: weatherData[i].weather,
      desc: weatherData[i].desc,
      maxTemp: '13',
      minTemp: '27',
    });
  }

  const weatherIcons: WeatherIconsType = {
    clear: ClearSvg,
    cloudy: CloudySvg,
    fewClouds: FewCloudsSvg,
    rain: RainSvg,
    snow: SnowSvg,
    storm: StormSvg,
  };

  return (
    <div className={styles["days-forecast"]}>
      <h3 className={styles["days-forecast__title"]}>Прогноз на 5 дней</h3>
      <div className={styles["days-forecast__days-wrapper"]}>
        {days.map((day, index) => {
          const WeatherIcon = weatherIcons[day.icon] ? weatherIcons[day.icon] : null;

          return (
            <div key={index} className={styles["days-forecast__day-wrapper"]}>
              {!isMobileMediaQuery && <p className={styles["days-forecast__day-name"]}>{index === 0 ? 'Завтра' : day.name}</p>}
              {isMobileMediaQuery && (
              <p className={styles["days-forecast__day-name"]}>
                {day.name === 'Понедельник' ? 'Пн' :
                day.name === 'Вторник' ? 'Вт' :
                day.name === 'Среда' ? 'Ср' :
                day.name === 'Четверг' ? 'Чт' :
                day.name === 'Пятница' ? 'Пт' :
                day.name === 'Суббота' ? 'Сб' :
                'Вс'}
              </p>
              )}
              {WeatherIcon && <WeatherIcon className={styles["days-forecast__svg-icon"]}/>}
              <p className={styles["days-forecast__weather-desc"]}>{day.desc}</p>
              <div className={styles["days-forecast__minmax-temp-wrapper"]}>
                <p className={styles["days-forecast__max-temp"]}>{day.maxTemp}ºc</p>
                <p className={styles["days-forecast__min-temp"]}>{day.minTemp}ºc</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaysForecast;