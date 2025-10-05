import { Text } from "../../../Text/Text";
import dog from "./assets/PetsPlaceholder/Dog.svg";

import "./PetItem.css";

const PetItem = ({ pet, isLoading }) => {
  const { name, type, feeds } = pet || {};
  const imageUrl = pet?.imageUrl || dog;
  const ariaLabel = pet?.name ? `pet-${pet.name}` : undefined;
  return (
    <article
      className="Pet-item"
      aria-labelledby={`${ariaLabel}-name`}
      aria-busy={isLoading ? "true" : undefined}
    >
      <div>
        <img src={imageUrl} className="Pet-image" alt="pet" />
      </div>
      <div>
        <div>
          <Text className="Pet-details-label">Name: </Text>
          <Text id={`${ariaLabel}-name`} isLoading={isLoading}>
            {name}
          </Text>
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
    </article>
  );
};

export default PetItem;
