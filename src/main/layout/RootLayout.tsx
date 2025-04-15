import { Box } from "@chakra-ui/react";
import { WorldWeather } from "src/features/world-weather/Main";

export default function RootLayout() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      w="100vw"
      h="100vh"
      overflow="hidden"
    >
      <WorldWeather />
    </Box>
  );
}
