import { renderHook } from "@testing-library/react";
import { mapBoxConfig } from "../../config/config";
import { useSearchByPlace, useSearchById } from "../mapbox";
import { afterEach, describe, expect, it, Mock, vi } from "vitest";
import useAuthQuery from "src/api-utils/queryHelper";

vi.mock("src/api-utils/queryHelper");
const mockedUseAuthQuery = useAuthQuery as Mock;

const { searchByPlace } = mapBoxConfig;

describe("useSearchByPlace", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call useAuthQuery with correct parameters when searchText is provided", () => {
    const searchText = "New York";

    const url = searchByPlace.url(searchText);

    renderHook(() => useSearchByPlace({ searchText }));

    expect(mockedUseAuthQuery).toHaveBeenCalledWith(
      searchByPlace.queryKey(searchText),
      expect.any(Function),
      { enabled: true }
    );

    const axiosInstance = { get: vi.fn() };
    const fetchFunction = mockedUseAuthQuery.mock.calls[0][1];
    fetchFunction(axiosInstance);

    expect(axiosInstance.get).toHaveBeenCalledWith(url);
  });
});

describe("useSearchById", () => {
  it("should call useAuthQuery with correct parameters when id is provided", () => {
    const id = "12345";

    const url = mapBoxConfig.searchById.url(id);
    const queryKey = mapBoxConfig.searchById.queryKey(id);

    renderHook(() => useSearchById({ id }));

    expect(mockedUseAuthQuery).toHaveBeenCalledWith(
      queryKey,
      expect.any(Function),
      { enabled: true }
    );

    const axiosInstance = { get: vi.fn() };
    const fetchFunction = mockedUseAuthQuery.mock.calls[0][1];
    fetchFunction(axiosInstance);

    expect(axiosInstance.get).toHaveBeenCalledWith(url);
  });
});
