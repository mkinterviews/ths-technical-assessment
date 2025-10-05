import useSWR from "swr";

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { PetFilters } from "./components/PetFilters/PetFilters";
import { usePetFilters } from "./components/PetFilters/usePetFilters";
import PetItem from "./components/PetItem";

import "./PetList.css";

const PetList = () => {
  const [filters, setFilters] = usePetFilters();

  const { data, isLoading, error } = useSWR("/api/pets");

  if (error) {
    return <ErrorMessage title="Unable to find pets" error={error} />;
  }

  if (isLoading) {
    return (
      <>
        <h1 className="Pets-title">My Pets</h1>
        <ul className="PetList" aria-busy="true" aria-live="polite">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <PetItem isLoading />
            </li>
          ))}
        </ul>
      </>
    );
  }

  const filteredData = data
    ?.filter((pet) => {
      return (
        !filters["q"] ||
        pet.name.toLowerCase().includes(filters["q"].toLowerCase())
      );
    })
    .filter((pet) => {
      return !filters["type"] || pet.type === filters["type"];
    })
    .map((pet) => {
      return (
        <li key={pet.id}>
          <PetItem key={pet.id} pet={pet} />
        </li>
      );
    });

  if (!filteredData || filteredData.length < 1) {
    return (
      <>
        <h1 className="Pets-title">My Pets</h1>
        <PetFilters filters={filters} setFilters={setFilters} />
        <span className="PetList-empty" role="status" aria-live="polite">
          {!filteredData
            ? "You don't have any pets registered with us."
            : "No pets found."}
        </span>
      </>
    );
  }

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      <PetFilters filters={filters} setFilters={setFilters} />
      <ul className="PetList">{filteredData}</ul>
    </>
  );
};

export default PetList;
