import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { matchMedia } from "../utils/testUtils.tsx";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import "@testing-library/jest-dom";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

beforeEach(() => {
  matchMedia();
});
