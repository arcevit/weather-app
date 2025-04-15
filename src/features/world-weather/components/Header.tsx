import React from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import { SegmentGroup } from "src/chakra-ui-components";
import { temperatureUnits } from "../constants/constants";

export const Header: React.FC = () => {
  return (
    <Box as="header" overflow="hidden" py={5}>
      <HStack justifyContent="space-evenly">
        <Stack>WeatherMap</Stack>
        <HStack spaceX={7}>
          <SearchBar />
          <SegmentGroup
            items={temperatureUnits}
            defaultValue={temperatureUnits[0]}
          />
        </HStack>
      </HStack>
    </Box>
  );
};
