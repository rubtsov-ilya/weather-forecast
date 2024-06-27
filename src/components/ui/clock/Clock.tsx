import { FC, useLayoutEffect, useState } from 'react';
import styles from './Clock.module.scss'
import { IWeatherData } from '../../../interfaces/WeatherData.interface';

interface ClockProps {
  weatherDataState: IWeatherData | null;
}

const Clock: FC<ClockProps> = ({ weatherDataState }) => {
  const [time, setTime] = useState<string>('');
  const [differenceFromMoscowHour, setDifferenceFromMoscowHour] = useState<number | null>(null);
  useLayoutEffect(() => {
    if (weatherDataState) {
      const dataCurrentHour = weatherDataState.current.time.getHours() !== 0 ? weatherDataState.current.time.getHours() : 24
      setDifferenceFromMoscowHour(dataCurrentHour - new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' })).getHours());
      getTime()
    }
    const timer = setInterval(() => {
      getTime()
    }, 1000);

    return () => clearInterval(timer);
  }, [weatherDataState, differenceFromMoscowHour]);

  function getTime(): void {
    const currentTime = new Date();
    const moscowTime = new Date(currentTime.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
    if (differenceFromMoscowHour!== null)  {
      const hours = (moscowTime.getHours() + differenceFromMoscowHour).toString().padStart(2, '0')
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      setTime(`${hours !== '24' ? hours : '00'}:${minutes}`);
    }
    
  }

  return (
    <>
      {weatherDataState && <p className={styles["сlock"]}>{time}</p>}
    </>
  )
}

export default Clock