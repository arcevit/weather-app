import {
  InputGroup,
  Input,
  InputProps,
  Box,
  Flex,
  Portal,
  Popover,
  CloseButton,
  Spinner,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { SelectItem } from "src/features/world-weather/models/mapbox";
import { debounce } from "src/features/world-weather/utils/utils";

type Props = {
  items: {
    label: string;
    value: string;
  }[];
  size?: InputProps["size"];
  minW?: InputProps["minW"];
  placeholder?: string;
  onSelect?: (item: SelectItem) => void;
  isLoading?: boolean;
  search: string;
  setSearch: (value: string) => void;
};

export const SearchInput: React.FC<Props> = ({
  items,
  size = "md",
  minW = "md",
  placeholder = "Search...",
  onSelect,
  isLoading = false,
  search,
  setSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLButtonElement | null>(null);
  const [showResults, setShowResults] = useState(false);

  const onBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 170);
  };

  const onFocus = () => {
    setTimeout(() => {
      setShowResults(true);
    }, 170);
  };

  const endElement = isLoading ? (
    <Spinner size="xs" />
  ) : (
    <CloseButton
      size="xs"
      onClick={() => {
        setSearch("");
        setSearchTerm("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  );

  const open = showResults && !!search && !!items.length;

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(onSearch, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: string) => {
    setSearchTerm(value);
    debouncedResults(value);
  };

  return (
    <Box maxW="md" mx="auto" minW={minW}>
      <Popover.Root
        positioning={{ sameWidth: true }}
        initialFocusEl={() => inputRef.current}
        open={open}
      >
        <Popover.Trigger asChild>
          <InputGroup
            flex="1"
            startElement={<LuSearch />}
            endElement={endElement}
          >
            <Input
              {...{
                size,
                placeholder,
                value: searchTerm,
                onChange: (e) => handleChange(e.target.value),
                onFocus,
                onBlur,
              }}
              //@ts-expect-error: ignore it can be null
              ref={inputRef}
            />
          </InputGroup>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content width="auto">
              <Popover.Body>
                {items.length > 0
                  ? items.map((item) => (
                      <Box
                        key={item.value}
                        cursor="pointer"
                        _hover={{
                          bgColor: "#f9fafb",
                        }}
                        onClick={() => {
                          onSelect?.(item);
                          setSearch(item.label);
                        }}
                      >
                        <Flex alignItems="center">
                          <Box p="0.8em" margin="0" color="black">
                            {item.label}
                          </Box>
                        </Flex>
                      </Box>
                    ))
                  : null}
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Box>
  );
};
