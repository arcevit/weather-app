import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import axiosClient from "src/api-utils/axiosClient";

type AuthQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryFn"> & {
  queryFn: () => Promise<TQueryFnData>;
};

function useAuthQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  fetcher: (
    axiosInstanceWithAuth: AxiosInstance,
    queryFnContext?: QueryFunctionContext<QueryKey, TQueryKey>
  ) => TQueryFnData | Promise<TQueryFnData>,
  options: Omit<
    AuthQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryFn" | "queryKey"
  > = {}
) {
  const queryFn = () => fetcher(axiosClient);
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

export default useAuthQuery;
