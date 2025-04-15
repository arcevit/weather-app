import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import { ETemperatureUnits, TIsDay } from "../models/weather";
import { useWeatherMap } from "../context/TempUnitContext";
import { getWeather } from "../services/weather";
import { weatherCode } from "../constants/weatherCode";
import { MAPBOX_ACCESS_TOKEN } from "../config/config";

import "mapbox-gl/dist/mapbox-gl.css";
import "./css/index.css";

const { Fahrenheit, Celsius } = ETemperatureUnits;

const MapSection = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapPopupRef = useRef<mapboxgl.Popup | null>(null);
  const {
    lngLat,
    tempUnit,
    shouldWeatherCardPopup,
    setShouldWeatherCardPopup,
  } = useWeatherMap();
  const { lng, lat } = lngLat;

  async function onPopup(langtitude: number, latitude: number) {
    mapPopupRef.current = new mapboxgl.Popup()
      .setLngLat({ lng: langtitude, lat: latitude })
      .setHTML(loadingContent)
      .addTo(mapRef.current!);

    const { data, isError } = await getWeather(langtitude, latitude);

    if (isError || !data) {
      mapPopupRef.current.setHTML(errorContent);
      return;
    }

    const currentWeather = data.current_weather;
    const weathercodeAsString =
      currentWeather.weathercode.toString() as keyof typeof weatherCode;

    const isDay: TIsDay = currentWeather.is_day;
    const src = weatherCode[weathercodeAsString][isDay].image;
    const description = weatherCode[weathercodeAsString][isDay].description;
    const temperature = currentWeather.temperature;

    const popupContent = getpopupContent(src, description, temperature);

    mapPopupRef.current.setHTML(popupContent);
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 9,
    });

    if (shouldWeatherCardPopup) {
      mapRef.current.on("load", () => {
        onPopup(lng, lat);
        setShouldWeatherCardPopup(false);
      });
    }

    mapRef.current.on("click", async (e) => {
      onPopup(e.lngLat.lng, e.lngLat.lat);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  useEffect(() => {
    if (!mapPopupRef.current) return;
    const h4El = mapPopupRef.current?._content?.querySelector("h4");
    if (h4El) {
      const temperature = h4El.textContent;
      const temperatureValue = parseFloat(temperature!);

      const convertedTemperature =
        tempUnit === Fahrenheit
          ? (temperatureValue * 9) / 5 + 32
          : ((temperatureValue - 32) * 5) / 9;
      h4El.textContent = convertedTemperature.toFixed(1);
      h4El.classList.remove(Fahrenheit, Celsius);
      h4El.classList.add(tempUnit === Fahrenheit ? Fahrenheit : Celsius);
    }
  }, [tempUnit]);

  return (
    <Box aspectRatio="1.7" p={10} overflow="hidden">
      <div ref={mapContainerRef} id="map" style={{ height: "100%" }} />;
    </Box>
  );
};

export default MapSection;

const errorContent = `
<div class="weather-popup">
  <p>Something went wrong.</p>
</div>
`;

const loadingContent = `
<div class="weather-popup">
  <p>Loading...</p>
</div>
`;

const getpopupContent = (
  src: string,
  description: string,
  temperature: number
) => `
      <div class="weather-popup">
        <div class="weather-header">
          <img src=${src} alt="${description}" />
          <div>
            <h4 class="celsius">${temperature}</h4>
            <p>${description}</p>
          </div>
        </div>
      </div>
    `;
