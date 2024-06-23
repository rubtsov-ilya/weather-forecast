import { FC, useEffect, useLayoutEffect, useState } from 'react'
import styles from './ImageWrapper.module.scss'
import Clock from '../../../../ui/clock/Clock';
import DividerSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Divider.svg?react'
import FewCloudsNight from '../../../../../assets/images/weather-page-images/weather-svg/night/Weather=FewClouds,Moment=Night.svg?react'
import FewCloudsDay from '../../../../../assets/images/weather-page-images/weather-svg/day/Weather=FewClouds,Moment=Day.svg?react'
import CloudyNight from '../../../../../assets/images/weather-page-images/weather-svg/night/Weather=Cloudy,Moment=Night.svg?react'
import { IWeatherData } from '../../../../../interfaces/WeatherData.interface';

interface ImageWrapperProps {
  weatherDataState: IWeatherData | null
}
 
const ImageWrapper: FC<ImageWrapperProps> = ({ weatherDataState }) => {
  const [dayTime, setDayTime] = useState<'day' | 'night'| null>(null)
  const currentDate = new Date();
  const currentHour = weatherDataState?.current?.time.getHours()

  useLayoutEffect(() => {
    if (currentHour) {
      if (currentHour >= 18 || currentHour < 6) {
        setDayTime('night')
      } else {
        return
      }
    }
  }, [currentHour])

  const weatherIcons = {
    night: {
      fewclouds: FewCloudsNight,
      cloudy: CloudyNight,
      // другие иконки для night и меняем ключ на название какого-нибудь ключа из апи, чтобы по данным с апи вызывать эти картинки
    },
    day: {
      fewclouds: FewCloudsDay,
      // другие иконки для night и меняем ключ на название какого-нибудь ключа из апи, чтобы по данным с апи вызывать эти картинки
    }
  };
  const WeatherIconComponent = dayTime !== null && weatherIcons[dayTime] && weatherIcons[dayTime]['fewclouds'] ? weatherIcons[dayTime]['fewclouds'] : null;
  
  const formattedDate = currentDate.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const firstLetter = formattedDate.charAt(0).toUpperCase();
  const restOfString = formattedDate.slice(1);
  const formattedString = firstLetter + restOfString.replace(' г.', '');


  return (
    <div style={{ backgroundImage: `url('../../../../../../src/assets/images/weather-page-images/weather-bg/${dayTime}/Weather=fewClouds.png')` }} className={styles["image-wrapper"]}>
      <div className={styles["image-wrapper__top-wrapper"]}>
        <div className={styles["image-wrapper__info"]}>
          <h1 className={styles["image-wrapper__location"]}>Алагир, Республика Северная Осетия - Алания</h1>
          <p className={styles["image-wrapper__date"]}>{formattedString}</p>
        </div>
        <Clock />
      </div>
      <div className={styles["image-wrapper__bottom-wrapper"]}>
        <div className={styles["image-wrapper__temperature-wrapper"]}>
          <p className={styles["image-wrapper__temperature-now"]}>28ºc</p>
          <div className={styles["image-wrapper__temperature-maxmin-wrapper"]}>
            <p className={styles["image-wrapper__temperature-maxmin"]}>32ºc / 26ºc </p>
            <DividerSvg className={styles["image-wrapper__divider"]}/>
            <p className={styles["image-wrapper__weather-desc"]}>Слабая облачность</p>
          </div>
        </div>
        {WeatherIconComponent && <WeatherIconComponent className={styles["image-wrapper__weather-image"]}/>}
        {!WeatherIconComponent && <div className={styles["image-wrapper__weather-image"]}></div>}
      </div>
    </div>
  )
}

export default ImageWrapper