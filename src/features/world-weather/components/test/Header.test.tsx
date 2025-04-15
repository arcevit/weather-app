import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../Header";
import "@testing-library/jest-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "../../../../utils/testUtils";
import * as temUnitContext from "../../context/TempUnitContext";
import { temperatureUnits } from "../../constants/constants";

describe("Header Component", () => {
  const useWeatherMapSpy = vi.spyOn(temUnitContext, "useWeatherMap");
  const mockSetTempUnit = vi.fn();

  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;

  beforeEach(() => {
    //@ts-expect-error: ignore
    useWeatherMapSpy.mockReturnValue({
      setTempUnit: mockSetTempUnit,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Header component with WeatherMap text", () => {
    render(<Header />);
    expect(screen.getByText("WeatherMap")).toBeInTheDocument();
  });

  it("renders the SearchBar component", () => {
    render(<Header />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the SegmentGroup with temperature units", () => {
    render(<Header />);
    temperatureUnits.forEach((unit) => {
      expect(screen.getByText(unit)).toBeInTheDocument();
    });
  });

  it("calls setTempUnit when a temperature unit is selected", async () => {
    render(<Header />);
    const user = userEvent.setup();

    const fahrenheitButton = screen.getByText(temperatureUnits[1]);
    await user.click(fahrenheitButton);

    expect(mockSetTempUnit).toHaveBeenCalledWith("fahrenheit");
  });
});
