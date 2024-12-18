import { Routes, Route, Navigate } from 'react-router-dom';

import ScrollToTopProvider from '../providers/ScrollToTopProvider.tsx';
import NotfoundPage from '../components/pages/not-found-page/NotfoundPage.tsx';
import HomePage from '../components/pages/home-page/HomePage.tsx';
import WeatherPage from '../components/pages/weather-page/WeatherPage.tsx';
import useCityInfo from '../hooks/useCityInfo.ts';

export default function App() {
  const { label, value } = useCityInfo();

  return (
    <>
      <ScrollToTopProvider />
      <Routes>
        <Route
          path="/"
          element={
            value && label ? <Navigate to="/weather" replace /> : <HomePage />
          }
        />
        <Route
          path="weather"
          element={
            value === null && label === null ? (
              <Navigate to="/" replace />
            ) : (
              <WeatherPage />
            )
          }
        />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
}
