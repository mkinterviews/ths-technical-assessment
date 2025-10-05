import React from "react";
import { render } from "@testing-library/react";
import PetList from "./PetList";
import useSWR from "swr";
import { vi } from "vitest";

vi.mock("swr");

test("renders empty state when no pets returned", () => {
  useSWR.mockReturnValue({
    data: undefined,
    isLoading: false,
  });

  const { getByRole } = render(<PetList />);

  expect(getByRole("status")).toBeInTheDocument();
  expect(getByRole("status")).toHaveTextContent(
    /You don't have any pets registered with us/
  );
});

test("renders skeleton loading states when request loading", () => {
  useSWR.mockReturnValue({
    isLoading: true,
  });

  const { getByRole, getAllByRole } = render(<PetList />);

  const petsList = getByRole("list");

  expect(petsList).toBeInTheDocument();
  expect(petsList).toHaveAttribute("aria-busy", "true");

  // The loading skeleton should show three items
  expect(getAllByRole("listitem")).toHaveLength(3);
});
