import useSWR from "swr";

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import PetItem from "./components/PetItem";
import { PetListFilters } from "./components/PetListFilters/PetListFIlters";
import { usePetFilters } from "./components/PetListFilters/usePetFilters";

import "./PetList.css";

const PetList = () => {
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

  if (!data) {
    return (
      <>
        <h1 className="Pets-title">My Pets</h1>
        <span role="status" aria-live="polite">
          You don't have any pets registered with us.
        </span>
      </>
    );
  }

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      <PetListFilters filters={filters} setFilters={setFilters} />
      <ul className="PetList">
        {data.map((pet) => {
          return (
            <li key={pet.id}>
              <PetItem key={pet.id} pet={pet} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PetList;
