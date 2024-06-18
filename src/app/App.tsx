import { Routes, Route } from "react-router-dom";
import ScrollToTopProvider from "../providers/ScrollToTopProvider.tsx";
import ServerErrorProvider from "../providers/ServerErrorProvider.tsx";
import NotfoundPage from "../components/pages/not-found-page/NotfoundPage.tsx";
import HomePage from "../components/pages/home-page/HomePage.tsx";
import CityPage from "../components/pages/city-page/CityPage.tsx";

export default function App() {
  return (
    <ServerErrorProvider>
      <ScrollToTopProvider />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="city" element={<CityPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </ServerErrorProvider>
  );
}
