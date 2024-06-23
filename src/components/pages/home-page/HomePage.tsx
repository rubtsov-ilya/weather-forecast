import { FC } from "react";
import FirstSection from "./first-section/FirstSection.tsx";
import useCityInfo from "../../../hooks/useCityInfo.ts";
import { Navigate } from "react-router-dom";

const HomePage: FC = () => {
  const { label, value } = useCityInfo()
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
