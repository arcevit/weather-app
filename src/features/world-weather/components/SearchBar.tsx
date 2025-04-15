import { useState } from "react";
import { SearchInput } from "src/chakra-ui-components";

export const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <SearchInput
      items={[]}
      placeholder="Search for location"
      isLoading={false}
      search={search}
      setSearch={setSearch}
      onSelect={() => {}}
    />
  );
};
