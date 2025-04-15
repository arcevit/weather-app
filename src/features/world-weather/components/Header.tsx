import React from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import { SegmentGroup } from "src/chakra-ui-components";
import { temperatureUnits } from "../constants/constants";
import { useWeatherMap } from "../context/TempUnitContext";
import { ETemperatureUnits } from "../models/weather";

const { Celsius, Fahrenheit } = ETemperatureUnits;

export const Header: React.FC = () => {
  const { setTempUnit } = useWeatherMap();

  return (
    <Box as="header" overflow="hidden" py={5}>
      <HStack justifyContent="space-evenly">
        <Stack>WeatherMap</Stack>
        <HStack spaceX={7}>
          <SearchBar />
          <SegmentGroup
            items={temperatureUnits}
            defaultValue={temperatureUnits[0]}
            onChange={(value) =>
              setTempUnit(value === temperatureUnits[1] ? Fahrenheit : Celsius)
            }
          />
        </HStack>
      </HStack>
    </Box>
  );
};
