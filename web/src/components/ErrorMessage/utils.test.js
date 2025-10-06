import { describe, test, expect } from "vitest";
import { parseError } from "./utils";

describe("parseError", () => {
  test("returns string as-is when error is a string", () => {
    const errorMessage = "Network connection failed";
    const result = parseError(errorMessage);
    expect(result).toBe(errorMessage);
  });

  test.each(["", undefined, null, {}, ["error1"], new Error("Unsupported")])(
    'returns default message when error is "%s"',
    (errorMessage) => {
      const result = parseError(errorMessage);
      expect(result).toBe("Something went wrong!");
    }
  );
});
