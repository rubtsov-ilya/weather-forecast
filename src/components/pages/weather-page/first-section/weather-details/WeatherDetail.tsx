import styles from "./WeatherDetail.module.scss";
import TemperatureSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=thermometer-simple-light.svg?react'
import CloudSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=cloud-rain-light.svg?react'
import WindSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=wind-light.svg?react'
import DropSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=drop-light.svg?react'
import SunSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Type=sun-dim-light.svg?react'

const WeatherDetail = () => {
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
          <p className={styles["weather-details__value"]}>{'40'}<span className={styles["weather-details__value-span"]}>ºc</span></p>
        </div>
        {/* Вероятность дождя */}
        <div className={styles["weather-details__item-wrapper"]}>
          <div className={styles["weather-details__desc-wrapper"]}>
            <CloudSvg className={styles["weather-details__svg-icon"]}/>
            <p className={styles["weather-details__desc"]}>Вероятность осадков</p>
          </div>
          <p className={styles["weather-details__value"]}>{'22'}<span className={styles["weather-details__value-span"]}>%</span></p>
        </div>
        {/* Скорость ветра */}
        <div className={styles["weather-details__item-wrapper"]}>
          <div className={styles["weather-details__desc-wrapper"]}>
            <WindSvg className={styles["weather-details__svg-icon"]}/>
            <p className={styles["weather-details__desc"]}>Скорость ветра</p>
          </div>
          <p className={styles["weather-details__value"]}>{'31'} <span className={styles["weather-details__value-span"]}>km/h</span></p>
        </div>
        {/* Влажность */}
        <div className={styles["weather-details__item-wrapper"]}>
          <div className={styles["weather-details__desc-wrapper"]}>
            <DropSvg className={styles["weather-details__svg-icon"]}/>
            <p className={styles["weather-details__desc"]}>Влажность</p>
          </div>
          <p className={styles["weather-details__value"]}>{'50'}<span className={styles["weather-details__value-span"]}>%</span></p>
        </div>
        {/* УФ-индекс */}
        <div className={styles["weather-details__item-wrapper"]}>
          <div className={styles["weather-details__desc-wrapper"]}>
            <SunSvg className={styles["weather-details__svg-icon"]}/>
            <p className={styles["weather-details__desc"]}>УФ-индекс</p>
          </div>
          <p className={styles["weather-details__value"]}>{'6'}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
