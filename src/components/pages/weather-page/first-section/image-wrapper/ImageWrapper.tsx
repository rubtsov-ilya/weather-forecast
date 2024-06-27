import { FC, useLayoutEffect, useState } from 'react'
import styles from './ImageWrapper.module.scss'
import Clock from '../../../../ui/clock/Clock';
import DividerSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Divider.svg?react'
import FewCloudsNight from '../../../../../assets/images/weather-page-images/weather-svg/night/Weather=FewClouds,Moment=Night.svg?react'
import FewCloudsDay from '../../../../../assets/images/weather-page-images/weather-svg/day/Weather=FewClouds,Moment=Day.svg?react'
import CloudyNight from '../../../../../assets/images/weather-page-images/weather-svg/night/Weather=Cloudy,Moment=Night.svg?react'
import { IWeatherData } from '../../../../../interfaces/WeatherData.interface';
import useCityInfo from '../../../../../hooks/useCityInfo';

interface ImageWrapperProps {
  weatherDataState: IWeatherData | null
}
 
const ImageWrapper: FC<ImageWrapperProps> = ({ weatherDataState }) => {
  const [dayTime, setDayTime] = useState<'day' | 'night'| null>(null)
  const { shortenedAddress } = useCityInfo()
  const currentDate = new Date();
  

  useLayoutEffect(() => {
    const currentHour = weatherDataState?.current?.time.getHours()
    if (currentHour !== undefined) {
      if (currentHour >= 18 || currentHour < 6) {
        setDayTime('night')
      } else {
        setDayTime('day')
      }
    }
  }, [weatherDataState])
  console.log(dayTime)
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
          <h1 className={styles["image-wrapper__location"]}>{shortenedAddress}</h1>
          <p className={styles["image-wrapper__date"]}>{formattedString}</p>
        </div>
        <Clock weatherDataState={weatherDataState}/>
      </div>
      <div className={styles["image-wrapper__bottom-wrapper"]}>
        <div className={styles["image-wrapper__temperature-wrapper"]}><p className={styles["image-wrapper__temperature-now"]}>{weatherDataState ? Math.round(weatherDataState?.current?.temperature2m) : null}ºc</p>
          
          <div className={styles["image-wrapper__temperature-maxmin-wrapper"]}>
            <p className={styles["image-wrapper__temperature-maxmin"]}>{weatherDataState ? Math.round(weatherDataState?.daily.temperature2mMax[0]) : null}ºc / {weatherDataState ? Math.round(weatherDataState?.daily.temperature2mMin[0]) : null}ºc </p>
            <DividerSvg className={styles["image-wrapper__divider"]}/>
            <p className={styles["image-wrapper__weather-desc"]}>Погоды код</p>
          </div>
        </div>
        {WeatherIconComponent && <WeatherIconComponent className={styles["image-wrapper__weather-image"]}/>}
        {!WeatherIconComponent && <div className={styles["image-wrapper__weather-image"]}></div>}
      </div>
    </div>
  )
}

export default ImageWrapper