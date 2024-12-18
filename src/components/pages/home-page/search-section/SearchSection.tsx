/// <reference types='vite-plugin-svgr/client' />

import { FC } from 'react';

import LogoSvg from '../../../../assets/images/logo-icons/Logo-main-page.svg?react';
import SearchSelect from '../../../ui/search-select/SearchSelect';

import styles from './FirstSection.module.scss';

const SearchSection: FC = () => {
  return (
    <section className={styles['first-section']}>
      <div className="container">
        <div className={styles['first-section__content']}>
          <LogoSvg className={styles['first-section__logo']} />
          <h1 className={styles['first-section__title']}>
            Приветствуем в{' '}
            <span className={styles['first-section__title-span']}>
              TypeWeather
            </span>
          </h1>
          <p className={styles['first-section__subtitle']}>
            Выберите город, чтобы увидеть прогноз погоды
          </p>
          <SearchSelect />
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
