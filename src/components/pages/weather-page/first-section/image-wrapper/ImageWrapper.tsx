import { FC, useEffect, useLayoutEffect, useState } from 'react'
import styles from './ImageWrapper.module.scss'
import Clock from '../../../../ui/clock/Clock';
import DividerSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Divider.svg?react'
import { IWeatherData } from '../../../../../interfaces/WeatherData.interface';
import useCityInfo from '../../../../../hooks/useCityInfo';
import useGetBgInImageWrapper from '../../../../../hooks/useGetBgInImageWrapper';
import useGetSvgIcon from '../../../../../hooks/useGetSvgIcon';

interface ImageWrapperProps {
  weatherDataState: IWeatherData | null
}
 
const ImageWrapper: FC<ImageWrapperProps> = ({ weatherDataState }) => {
  const [dayTime, setDayTime] = useState<'day' | 'night'| null>(null)
  const [backgroudImagePath, setBackgroudImagePath] = useState<string>('')
  const { shortenedAddress } = useCityInfo()

  useLayoutEffect(() => {
    if (weatherDataState) {  
      const currentHour = weatherDataState.current.time.getHours()
      if (currentHour >= 18 || currentHour < 6) {
        setDayTime('night')
      } else {
        setDayTime('day')
      }
    }
  }, [weatherDataState])

  useEffect(() => {
    if (weatherDataState && dayTime) {
      const bgPath = useGetBgInImageWrapper(weatherDataState.daily.weatherCode[0] , dayTime);
      setBackgroudImagePath(bgPath)
    }

  }, [dayTime, weatherDataState])

  const WeatherIconComponent = weatherDataState && dayTime ? useGetSvgIcon(weatherDataState?.current.weatherCode, dayTime) : null;

  return (
    <div style={{ backgroundImage: backgroudImagePath && `url('${backgroudImagePath}` }} className={styles["image-wrapper"]}>
      <div className={styles["image-wrapper__top-wrapper"]}>
        <div className={styles["image-wrapper__info"]}>
          <h1 className={styles["image-wrapper__location"]}>{shortenedAddress}</h1>
          <p className={styles["image-wrapper__date"]}>{weatherDataState?.daily.date}</p>
        </div>
        <Clock weatherDataState={weatherDataState}/>
      </div>
      {weatherDataState && <div className={styles["image-wrapper__bottom-wrapper"]}>
        <div className={styles["image-wrapper__temperature-wrapper"]}><p className={styles["image-wrapper__temperature-now"]}>{Math.round(weatherDataState?.current?.temperature2m)}ºc</p>
          <div className={styles["image-wrapper__temperature-maxmin-wrapper"]}>
            <p className={styles["image-wrapper__temperature-maxmin"]}>{Math.round(weatherDataState?.daily.temperature2mMax[0])}ºc / {Math.round(weatherDataState.daily.temperature2mMin[0])}ºc </p>
            <DividerSvg className={styles["image-wrapper__divider"]}/>
            <p className={styles["image-wrapper__weather-desc"]}>{weatherDataState.current.weatherCodeDescription}</p>
          </div>
        </div>
        {WeatherIconComponent && <WeatherIconComponent className={styles["image-wrapper__weather-image"]}/>}
        {!WeatherIconComponent && <div className={styles["image-wrapper__weather-image"]}></div>}
      </div>}
    </div>
  )
}

export default ImageWrapper