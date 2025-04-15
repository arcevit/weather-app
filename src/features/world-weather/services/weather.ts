import { weatherConfig } from "../config/config";
import axiosClient from "src/api-utils/axiosClient";

const { currentWeather } = weatherConfig;

export const getWeather = async (lng: number, lat: number) => {
  let data = null;
  let isError = false;

  try {
    const res = await axiosClient.get(currentWeather.url, {
      params: {
        latitude: lat,
        longitude: lng,
        current_weather: true,
      },
    });
    data = res.data;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    isError = true;
  }

  return { data, isError };
};
