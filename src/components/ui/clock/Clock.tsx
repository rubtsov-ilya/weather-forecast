import { useEffect, useState } from 'react';
import styles from './Clock.module.scss'

const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className={styles["сlock"]}>{time}</p>
  )
}

export default Clock