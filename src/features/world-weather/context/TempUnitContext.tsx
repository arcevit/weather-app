import { createContext, ReactNode, useContext, useState } from "react";
import { ETemperatureUnits, TWeatherMapContext } from "../models/weather";

const { Celsius } = ETemperatureUnits;

const WeatherMapContext = createContext<TWeatherMapContext>(
  {} as TWeatherMapContext
);

export const WeatherMapContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lngLat, setLngLat] = useState({
    lng: 12.5,
    lat: 55.6,
  });
  const [tempUnit, setTempUnit] = useState<ETemperatureUnits>(Celsius);
  const [shouldWeatherCardPopup, setShouldWeatherCardPopup] = useState(false);

  const value = {
    lngLat,
    setLngLat,
    tempUnit,
    setTempUnit,
    shouldWeatherCardPopup,
    setShouldWeatherCardPopup,
  };
  return (
    <WeatherMapContext.Provider value={value}>
      {children}
    </WeatherMapContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWeatherMap = () => {
  const context = useContext(WeatherMapContext);
  if (!context) {
    throw new Error(
      "WeatherMapContext must be used within a WeatherMapContextProvider"
    );
  }
  return context;
};
