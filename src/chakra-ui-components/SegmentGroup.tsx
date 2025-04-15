import { SegmentGroup as ChakraUiSegmentGroup } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  items: string[];
  onChange?: (value: string | null) => void;
  defaultValue: string;
}

export const SegmentGroup: React.FC<Props> = ({
  items,
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<string | null>(defaultValue);
  return (
    <ChakraUiSegmentGroup.Root
      value={value}
      onValueChange={(e) => {
        setValue(e.value);
        onChange?.(e.value);
      }}
    >
      <ChakraUiSegmentGroup.Indicator />
      <ChakraUiSegmentGroup.Items items={items} />
    </ChakraUiSegmentGroup.Root>
  );
};
