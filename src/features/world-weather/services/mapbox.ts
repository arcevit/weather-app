import useAuthQuery from "src/api-utils/queryHelper";
import { mapBoxConfig } from "../config/config";

const { searchByPlace, searchById } = mapBoxConfig;

export const useSearchByPlace = ({ searchText }: { searchText: string }) => {
  const { url, queryKey } = searchByPlace;
  const enabled = !!searchText;
  return useAuthQuery(
    queryKey(searchText),
    (axiosInstance) => {
      return axiosInstance.get<unknown>(url(searchText));
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
      return axiosInstance.get<unknown>(url(id));
    },
    {
      enabled,
    }
  );
};
