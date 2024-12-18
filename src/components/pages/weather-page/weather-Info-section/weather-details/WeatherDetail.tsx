import { FC } from 'react';

import TemperatureSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=thermometer-simple-light.svg?react';
import CloudSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=cloud-rain-light.svg?react';
import WindSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=wind-light.svg?react';
import DropSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=drop-light.svg?react';
import SunSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=sun-dim-light.svg?react';
import { IWeatherData } from '../../../../../interfaces/WeatherData.interface';

import styles from './WeatherDetail.module.scss';
import WeatherDetailsItem from './weather-details-item/WeatherDetailsItem';

interface WeatherDetailProps {
  weatherDataState: IWeatherData | null;
}

const WeatherDetail: FC<WeatherDetailProps> = ({ weatherDataState }) => {
  return (
    <div className={styles['weather-details']}>
      <h2 className={styles['weather-details__title']}>
        Подробности на сегодня
      </h2>

      <div className={styles['weather-details__main-wrapper']}>
        {/* По ощущению */}
        <WeatherDetailsItem
          Svg={TemperatureSvg}
          text={'По ощущению'}
          unit={'ºc'}
          value={weatherDataState?.current?.apparentTemperature}
        />

        {/* Вероятность дождя */}
        <WeatherDetailsItem
          Svg={CloudSvg}
          text={'Вероятность осадков'}
          unit={'%'}
          value={weatherDataState?.daily?.precipitationProbabilityMax[0]}
        />

        {/* Скорость ветра */}
        <WeatherDetailsItem
          Svg={WindSvg}
          text={'Скорость ветра'}
          unit={' km/h'}
          value={weatherDataState?.current?.windSpeed10m}
        />

        {/* Влажность */}
        <WeatherDetailsItem
          Svg={DropSvg}
          text={'Влажность'}
          unit={'%'}
          value={weatherDataState?.current?.relativeHumidity2m}
        />

        {/* УФ-индекс */}
        <WeatherDetailsItem
          Svg={SunSvg}
          text={'УФ-индекс'}
          unit={''}
          value={weatherDataState?.daily?.uvIndexMax[0]}
        />
      </div>
    </div>
  );
};

export default WeatherDetail;
