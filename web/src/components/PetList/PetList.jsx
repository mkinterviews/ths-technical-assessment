import React from "react";
import useSWR from "swr";

import PetItem from "./components/PetItem";

import "./PetList.css";

const PetList = () => {
  const { data } = useSWR("/api/pets", async (key) => {
    const response = await fetch(key);
    return await response.json();
  });

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      {data?.map((pet) => {
        return <PetItem key={pet.id} pet={pet} />;
      })}
    </>
  );
};

export default PetList;
