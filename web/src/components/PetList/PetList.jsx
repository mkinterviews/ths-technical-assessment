import React from "react";
import useSWR from "swr";

import PetItem from "./components/PetItem";

import "./PetList.css";

const PetList = () => {
  const { data, isLoading } = useSWR("/api/pets", async (key) => {
    const response = await fetch(key);
    return await response.json();
  });

  if (isLoading) {
    return (
      <>
        <h1 className="Pets-title">My Pets</h1>
        <ul className="PetList" aria-busy="true" aria-live="polite">
          {Array.from({ length: 3 }).map((_, i) => (
            <li>
              <PetItem key={i} isLoading />
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
      <ul className="PetList">
        {data?.map((pet) => {
          return (
            <li>
              <PetItem key={pet.id} pet={pet} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PetList;
