export enum ETemperatureUnits {
  Celsius = "celsius",
  Fahrenheit = "fahrenheit",
}

export type TIsDay = 0 | 1;

export type TLngLat = {
  lng: number;
  lat: number;
};

export type TWeatherMapContext = {
  lngLat: TLngLat;
  setLngLat: (lngLat: TLngLat) => void;
  tempUnit: ETemperatureUnits;
  setTempUnit: (tempUnit: ETemperatureUnits) => void;
  shouldWeatherCardPopup: boolean;
  setShouldWeatherCardPopup: (shouldWeatherPopup: boolean) => void;
};
