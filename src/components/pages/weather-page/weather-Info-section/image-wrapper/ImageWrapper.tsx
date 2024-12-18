import { FC, useLayoutEffect, useState } from 'react';

import Clock from '../../../../ui/clock/Clock';
import DividerSvg from '../../../../../assets/images/weather-page-images/phosphor-icons/Divider.svg?react';
import { IWeatherData } from '../../../../../interfaces/WeatherData.interface';
import useCityInfo from '../../../../../hooks/useCityInfo';
import useGetBgInImageWrapper from '../../../../../hooks/useGetBgInImageWrapper';
import useGetSvgIcon from '../../../../../hooks/useGetSvgIcon';

import styles from './ImageWrapper.module.scss';

interface ImageWrapperProps {
  weatherDataState: IWeatherData | null;
  dayTime: 'day' | 'night' | null;
}

const ImageWrapper: FC<ImageWrapperProps> = ({ weatherDataState, dayTime }) => {
  const { shortenedAddress } = useCityInfo();
  /* const [backgroudImagePath, setBackgroudImagePath] = useState<string>('') */

  /* useEffect(() => {
    if (weatherDataState && dayTime) {
      const bgPath = useGetBgInImageWrapper(weatherDataState.current.weatherCode , dayTime);
      setBackgroudImagePath(bgPath)
    }

  }, [dayTime, weatherDataState]) */

  const WeatherIconComponent =
    weatherDataState && dayTime
      ? useGetSvgIcon(weatherDataState?.current.weatherCode, dayTime)
      : null;

  return (
    <div
      style={{
        backgroundImage:
          weatherDataState && dayTime
            ? `url('${useGetBgInImageWrapper(weatherDataState.current.weatherCode, dayTime)}`
            : undefined,
      }}
      className={styles['image-wrapper']}
    >
      {/* <div style={{ backgroundImage: backgroudImagePath && `url('${backgroudImagePath}` }} className={styles["image-wrapper"]}></div> */}
      <div className={styles['image-wrapper__top-wrapper']}>
        <div className={styles['image-wrapper__info']}>
          <h1 className={styles['image-wrapper__location']}>
            {shortenedAddress}
          </h1>
          <p className={styles['image-wrapper__date']}>
            {weatherDataState?.daily.date}
          </p>
        </div>
        <Clock weatherDataState={weatherDataState} />
      </div>
      {weatherDataState && (
        <div className={styles['image-wrapper__bottom-wrapper']}>
          <div className={styles['image-wrapper__temperature-wrapper']}>
            <p className={styles['image-wrapper__temperature-now']}>
              {Math.round(weatherDataState?.current?.temperature2m)}ºc
            </p>
            <div
              className={styles['image-wrapper__temperature-maxmin-wrapper']}
            >
              <p className={styles['image-wrapper__temperature-maxmin']}>
                {Math.round(weatherDataState?.daily.temperature2mMax[0])}ºc /{' '}
                {Math.round(weatherDataState.daily.temperature2mMin[0])}ºc{' '}
              </p>
              <DividerSvg className={styles['image-wrapper__divider']} />
              <p className={styles['image-wrapper__weather-desc']}>
                {weatherDataState.current.weatherCodeDescription}
              </p>
            </div>
          </div>
          {WeatherIconComponent && (
            <WeatherIconComponent
              className={styles['image-wrapper__weather-image']}
            />
          )}
          {!WeatherIconComponent && (
            <div className={styles['image-wrapper__weather-image']}></div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageWrapper;
