import useAuthQuery from "src/api-utils/queryHelper";
import { mapBoxConfig } from "../config/config";
import { SearchByIdResponse, SearchByPlaceResponse } from "../models/mapbox";

const { searchByPlace, searchById } = mapBoxConfig;

export const useSearchByPlace = ({ searchText }: { searchText: string }) => {
  const { url, queryKey } = searchByPlace;
  const enabled = !!searchText;
  return useAuthQuery(
    queryKey(searchText),
    (axiosInstance) => {
      return axiosInstance.get<SearchByPlaceResponse>(url(searchText));
    },
    {
      enabled,
    }
  );
};

export const useSearchById = ({ id }: { id: string; isEnabled?: boolean }) => {
  const { queryKey, url } = searchById;
  const enabled = !!id;
  return useAuthQuery(
    queryKey(id),
    (axiosInstance) => {
      return axiosInstance.get<SearchByIdResponse>(url(id));
    },
    {
      enabled,
    }
  );
};
