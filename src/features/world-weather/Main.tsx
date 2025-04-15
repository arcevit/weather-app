import React from "react";
import MapSection from "src/features/world-weather/components/MapSection";
import { Header } from "src/features/world-weather/components/Header";
import { WeatherMapContextProvider } from "./context/TempUnitContext";

export const WorldWeather: React.FC = () => (
  <WeatherMapContextProvider>
    <Header />
    <MapSection />
  </WeatherMapContextProvider>
);
