import React from "react";

import dog from "./assets/PetsPlaceholder/Dog.svg";
import { Text } from "../../../Text/Text";

import "./PetItem.css";

const PetItem = ({ pet, isLoading }) => {
  const { name, type, feeds } = pet || {};
  const imageUrl = pet?.imageUrl || dog;
  return (
    <div className="Pet-item">
      <div>
        <img src={imageUrl} className="Pet-image" alt="pet" />
      </div>
      <div>
        <div>
          <Text className="Pet-details-label">Name: </Text>
          <Text isLoading={isLoading}>{name}</Text>
        </div>
        <div>
          <Text className="Pet-details-label">Animal Type: </Text>
          <Text isLoading={isLoading}>{type}</Text>
        </div>
        <div>
          <Text className="Pet-details-label">Number of feeds: </Text>
          <Text isLoading={isLoading} loadingText="0">
            {feeds}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PetItem;
