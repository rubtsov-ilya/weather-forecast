import { FC } from 'react';

import { Navigate } from 'react-router-dom';

import useCityInfo from '../../../hooks/useCityInfo.ts';

import FirstSection from './first-section/FirstSection.tsx';

const HomePage: FC = () => {
  const { label, value } = useCityInfo();
  if (value && label) {
    return <Navigate to="/weather" replace />;
  }

  return (
    <main>
      <FirstSection />
    </main>
  );
};

export default HomePage;
