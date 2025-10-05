import { render } from "@testing-library/react";
import { useQueryStates } from "nuqs";
import useSWR from "swr";
import { vi } from "vitest";

import PetList from "./PetList";

vi.mock("swr");
vi.mock("nuqs");

useQueryStates.mockReturnValue([{}, vi.fn()]);

const testData = [
  {
    id: 0,
    name: "Woofo",
    type: "Rock",
    age: 14,
    feeds: 5,
  },
  {
    id: 1,
    name: "The Whiskertron",
    type: "Antelope",
    age: 5,
    feeds: 3,
  },
  {
    id: 2,
    name: "Dogbert",
    type: "Rock",
    age: 12,
    feeds: 2,
  },
];

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

test("renders a generic error when the API fails", () => {
  useSWR.mockReturnValue({
    error: new Error("500: Unable to retrieve data"),
  });

  const { queryByRole, getByRole } = render(<PetList />);

  const petsList = queryByRole("list");
  expect(petsList).not.toBeInTheDocument();

  expect(getByRole("alert")).toBeInTheDocument();
  expect(getByRole("heading")).toHaveTextContent(/Unable to find pets/i);
  expect(getByRole("alert")).toHaveTextContent(/something went wrong/i);
});

test("renders data in the order retreived by the API", () => {
  useSWR.mockReturnValue({
    data: testData,
  });

  const { getByRole, getAllByRole } = render(<PetList />);

  const petsList = getByRole("list");
  expect(petsList).not.toHaveAttribute("aria-busy", "true");

  const petsItems = getAllByRole("listitem");
  expect(petsItems).toHaveLength(3);
  expect(petsItems[0]).toHaveTextContent("Woofo");
  expect(petsItems[1]).toHaveTextContent("Whiskertron");
  expect(petsItems[2]).toHaveTextContent("Dogbert");
});

test("renders data filtered by search queries", async () => {
  useSWR.mockReturnValue({
    data: testData,
  });
  useQueryStates.mockReturnValue([{ q: "Whisker" }, vi.fn()]);

  const { getAllByRole } = render(<PetList />);

  const petsItems = getAllByRole("listitem");

  expect(petsItems).toHaveLength(1);
  expect(petsItems[0]).toHaveTextContent("Whiskertron");
});

test("renders data filtered by type", async () => {
  useSWR.mockReturnValue({
    data: testData,
  });
  useQueryStates.mockReturnValue([{ type: "Rock" }, vi.fn()]);

  const { getAllByRole } = render(<PetList />);

  const petsItems = getAllByRole("listitem");

  expect(petsItems).toHaveLength(2);
  expect(petsItems[0]).toHaveTextContent("Woofo");
  expect(petsItems[1]).toHaveTextContent("Dogbert");
});

test("renders data filtered by query and type", async () => {
  useSWR.mockReturnValue({
    data: testData,
  });
  useQueryStates.mockReturnValue([{ q: "BeRt", type: "Rock" }, vi.fn()]);

  const { getAllByRole } = render(<PetList />);

  const petsItems = getAllByRole("listitem");

  expect(petsItems).toHaveLength(1);
  expect(petsItems[0]).toHaveTextContent("Dogbert");
});
