import styles from './FirstSection.module.scss'
import { FC } from 'react'
import LogoSvg from '../../../../assets/images/logo-icons/Logo-city-page.svg?react'
import SearchSelect from '../../../ui/search-select/SearchSelect'
import ImageWrapper from './image-wrapper/ImageWrapper'

const FirstSection: FC = () => {
  return (
    <section className={styles["first-section"]}>
    <div className="container">
      <div className={styles["first-section__content"]}>
        <div className={styles["first-section__main-left-wrapper"]}>
          <div className={styles["first-section__search-wrapper"]}>
            <LogoSvg className={styles["first-section__logo"]}/>
            <SearchSelect isCityPage={true}/>
          </div>
          <ImageWrapper />
        </div>
        <div className={styles["first-section__main-right-wrapper"]}>
          <div className={styles["first-section__weather-details"]}>компонент локальный</div>
          <div className={styles["first-section__5-day-forecast"]}>компонент локальный</div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default FirstSection