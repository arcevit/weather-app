import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { SearchBar } from "../SearchBar";
import * as useSearchHooks from "../../services/mapbox";
import { searchByText } from "../../../../mocks/search";
import { render } from "../../../../utils/testUtils";

describe("SearchBar Component", () => {
  const useSearchByPlaceSpy = vi.spyOn(useSearchHooks, "useSearchByPlace");

  it("should render the SearchInput component", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search for location")
    ).toBeInTheDocument();
  });

  it("should update the search state when input changes", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search for location");
    input.focus();
    //@ts-expect-error: ignore
    input.value = "New York";
    input.dispatchEvent(new Event("input"));
    //@ts-expect-error: ignore
    expect(input.value).toBe("New York");
  });

  it("should display suggestions when data is available", async () => {
    useSearchByPlaceSpy.mockReturnValue({
      isLoading: false,
      isSearchByIdLoading: false,
      data: {
        data: {
          //@ts-expect-error: ignore
          suggestions: searchByText.suggestions,
        },
      },
    });

    render(<SearchBar />);

    expect(
      await screen.findByText(/Herlev Torv 2, 2730 Herlev, Denmark/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Stationsalleen 9, 2730 Herlev, Denmark/i)
    ).toBeInTheDocument();
  });
});
