import styles from './FirstSection.module.scss'
import { FC, useLayoutEffect, useState } from 'react'
import LogoSvg from '../../../../assets/images/logo-icons/Logo-city-page.svg?react'
import SearchSelect from '../../../ui/search-select/SearchSelect'
import ImageWrapper from './image-wrapper/ImageWrapper'
import WeatherDetail from './weather-details/WeatherDetail'
import DaysForecast from './days-forecast/DaysForecast'

const FirstSection: FC = () => {
  const [dayTime, setDayTime] = useState<'day' | 'night'>('day')
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  useLayoutEffect(() => {
    if (currentHour >= 18 || currentHour < 6) {
      setDayTime('night')
    } else {
      return
    }
  }, [currentHour])
  return (
    <section className={styles["first-section"]}>
    <div className="container">
      <div className={styles["first-section__content"]}>
        <div className={styles["first-section__main-left-wrapper"]}>
          <div className={styles["first-section__search-wrapper"]}>
            <LogoSvg className={styles["first-section__logo"]}/>
            <SearchSelect isCityPage={true}/>
          </div>
          <ImageWrapper dayTime={dayTime}/>
        </div>
        <div className={styles["first-section__main-right-wrapper"]}>
          <WeatherDetail />
          <DaysForecast />
        </div>
      </div>
    </div>
  </section>
  )
}

export default FirstSection