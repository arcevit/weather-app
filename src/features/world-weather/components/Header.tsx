import React from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";

export const Header: React.FC = () => {
  return (
    <Box as="header" overflow="hidden" py={5}>
      <HStack justifyContent="space-evenly">
        <Stack>WeatherMap</Stack>
        <SearchBar />
      </HStack>
    </Box>
  );
};
