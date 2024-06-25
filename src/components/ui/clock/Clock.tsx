import { FC, useLayoutEffect, useState } from 'react';
import styles from './Clock.module.scss'

interface ClockProps {
  currentHour: number | null
}

const Clock: FC<ClockProps> = ({ currentHour }) => {
  const [time, setTime] = useState('');
  useLayoutEffect(() => {
    const currentTimeRender = new Date();
    const minutesRender = currentTimeRender.getMinutes().toString().padStart(2, '0');
    setTime(`${currentHour}:${minutesRender}`);
    const timer = setInterval(() => {
      const currentTime = new Date();
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      setTime(`${currentHour}:${minutes}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentHour]);

  return (
    <>
      {currentHour !== null && <p className={styles["сlock"]}>{time}</p>}
    </>
  )
}

export default Clock