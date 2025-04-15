import { useEffect, useState } from "react";
import { SearchInput } from "src/chakra-ui-components";
import { useWeatherMap } from "../context/TempUnitContext";
import { useSearchById, useSearchByPlace } from "../services/mapbox";
import { SelectItem } from "../models/mapbox";

export const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [mapBoxId, setMapBoxId] = useState("");
  const { setLngLat, setShouldWeatherCardPopup } = useWeatherMap();

  const { isLoading: isSearchByPlaceLoading, data: dataSearchByPlace } =
    useSearchByPlace({
      searchText: search,
    });

  const suggestions =
    dataSearchByPlace?.data?.suggestions
      .filter((s) => !!s.full_address)
      .map((s) => ({
        label: s.full_address || "",
        value: s.mapbox_id,
      })) || [];

  const {
    isLoading: isSearchByIdLoading,
    data: dataSearchById,
    isSuccess,
  } = useSearchById({
    id: mapBoxId,
  });
  const features = dataSearchById?.data?.features;
  const isLoading = isSearchByPlaceLoading || isSearchByIdLoading;

  const onSelect = (item: SelectItem): void => {
    setMapBoxId(item.value);
  };

  useEffect(() => {
    if (isSuccess && features) {
      const coordinates = features[0].geometry.coordinates;
      const lng = coordinates[0];
      const lat = coordinates[1];
      setShouldWeatherCardPopup(true);
      setLngLat({ lng, lat });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <SearchInput
      items={suggestions}
      placeholder="Search for location"
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
      onSelect={onSelect}
    />
  );
};
