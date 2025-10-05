import React from "react";
import { render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ErrorMessage } from "./ErrorMessage";
import * as utils from "./utils";

describe("ErrorMessage", () => {
  test("renders error message without title", () => {
    const { getByRole } = render(
      <ErrorMessage error="Network error occurred" />
    );

    const alert = getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("aria-live", "assertive");
    expect(alert).toHaveClass("error-box");
    expect(alert).toHaveTextContent("Network error occurred");
  });

  test("renders error message with title", () => {
    const { getByRole, getByText } = render(
      <ErrorMessage title="Connection Error" error="Failed to load data" />
    );

    const alert = getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("aria-live", "assertive");

    const titleElement = getByText("Connection Error");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H2");

    expect(alert).toHaveTextContent("Failed to load data");
  });
});
