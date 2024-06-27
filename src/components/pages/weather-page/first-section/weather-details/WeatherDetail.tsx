import styles from "./WeatherDetail.module.scss";
import TemperatureSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=thermometer-simple-light.svg?react'
import CloudSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=cloud-rain-light.svg?react'
import WindSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=wind-light.svg?react'
import DropSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=drop-light.svg?react'
import SunSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=sun-dim-light.svg?react'
import { FC } from "react";
import { IWeatherData } from "../../../../../interfaces/WeatherData.interface";

interface WeatherDetailProps {
  weatherDataState: IWeatherData | null
}

const WeatherDetail: FC<WeatherDetailProps> = ({ weatherDataState }) => {
  return (
    <div className={styles["weather-details"]}>
      <h2 className={styles["weather-details__title"]}>
        Подробности на сегодня
      </h2>
      <div className={styles["weather-details__main-wrapper"]}>
        {/* По ощущению */}
        <div className={styles["weather-details__item-wrapper"]}>
          <div className={styles["weather-details__desc-wrapper"]}>
            <TemperatureSvg className={styles["weather-details__svg-icon"]}/>
            <p className={styles["weather-details__desc"]}>По ощущению</p>
          </div>
          {weatherDataState && <p className={styles["weather-details__value"]}>{Math.round(weatherDataState?.current?.apparentTemperature)}<span className={styles["weather-details__value-span"]}>ºc</span></p>}
        </div>
        {/* Вероятность дождя */}
        <div className={styles["weather-details__item-wrapper"]}>
          <div className={styles["weather-details__desc-wrapper"]}>
            <CloudSvg className={styles["weather-details__svg-icon"]}/>
            <p className={styles["weather-details__desc"]}>Вероятность осадков</p>
          </div>
          {weatherDataState && <p className={styles["weather-details__value"]}>{Math.round(weatherDataState?.daily?.precipitationProbabilityMax[0])}<span className={styles["weather-details__value-span"]}>%</span></p>}
        </div>
        {/* Скорость ветра */}
        <div className={styles["weather-details__item-wrapper"]}>
          <div className={styles["weather-details__desc-wrapper"]}>
            <WindSvg className={styles["weather-details__svg-icon"]}/>
            <p className={styles["weather-details__desc"]}>Скорость ветра</p>
          </div>
          {weatherDataState && <p className={styles["weather-details__value"]}>{Math.round(weatherDataState?.current?.windSpeed10m)} <span className={styles["weather-details__value-span"]}>km/h</span></p>}
        </div>
        {/* Влажность */}
        <div className={styles["weather-details__item-wrapper"]}>
          <div className={styles["weather-details__desc-wrapper"]}>
            <DropSvg className={styles["weather-details__svg-icon"]}/>
            <p className={styles["weather-details__desc"]}>Влажность</p>
          </div>
          {weatherDataState && <p className={styles["weather-details__value"]}>{Math.round(weatherDataState?.current?.relativeHumidity2m)}<span className={styles["weather-details__value-span"]}>%</span></p>}
        </div>
        {/* УФ-индекс */}
        <div className={styles["weather-details__item-wrapper"]}>
          <div className={styles["weather-details__desc-wrapper"]}>
            <SunSvg className={styles["weather-details__svg-icon"]}/>
            <p className={styles["weather-details__desc"]}>УФ-индекс</p>
          </div>
          {weatherDataState && <p className={styles["weather-details__value"]}>{Math.round(weatherDataState?.daily?.uvIndexMax[0])}</p>}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
