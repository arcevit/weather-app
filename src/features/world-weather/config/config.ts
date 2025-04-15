import { uuid } from "../utils/utils";

export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const mapBoxBaseUrl = import.meta.env.VITE_MAPBOX_BASE_URL;

export const weatherBaseUrl = import.meta.env.VITE_WEATHER_BASE_URL;

const session_token = uuid();

export const mapBoxConfig = {
  searchByPlace: {
    url: (searchText: string) => {
      return `${mapBoxBaseUrl}/search/searchbox/v1/suggest?q=${searchText}&access_token=${MAPBOX_ACCESS_TOKEN}&session_token=${session_token}`;
    },
    queryKey: (searchText: string) => ["search", searchText],
  },
  searchById: {
    url: (id: string) => {
      return `${mapBoxBaseUrl}/search/searchbox/v1/retrieve/${id}?access_token=${MAPBOX_ACCESS_TOKEN}&session_token=${session_token}`;
    },
    queryKey: (id: string) => ["retrieve", id],
  },
};

export const weatherConfig = {
  currentWeather: {
    url: `${weatherBaseUrl}/v1/forecast`,
    queryKey: (latitude: number, longitude: number) => [
      "search",
      latitude,
      longitude,
    ],
  },
};
