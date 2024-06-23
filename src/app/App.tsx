import { Routes, Route } from "react-router-dom";
import ScrollToTopProvider from "../providers/ScrollToTopProvider.tsx";
import ServerErrorProvider from "../providers/ServerErrorProvider.tsx";
import NotfoundPage from "../components/pages/not-found-page/NotfoundPage.tsx";
import HomePage from "../components/pages/home-page/HomePage.tsx";
import WeatherPage from "../components/pages/weather-page/WeatherPage.tsx";

export default function App() {
  return (
    <ServerErrorProvider>
      <ScrollToTopProvider />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="weather" element={<WeatherPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </ServerErrorProvider>
  );
}
