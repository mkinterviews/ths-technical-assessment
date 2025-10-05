import { PET_TYPES } from "../../../../mocks/generatePets";

import "./PetFilters.css";

export const PetFilters = ({ filters, setFilters }) => {
  return (
    <div className="PetFilters">
      <input
        aria-label="Search"
        value={filters["q"]}
        onChange={(e) =>
          setFilters((filters) => ({ ...filters, q: e.target.value }))
        }
      />
      <select
        aria-label="Type"
        value={filters["type"]}
        onChange={(e) =>
          setFilters((filters) => ({ ...filters, type: e.target.value }))
        }
      >
        <option value="">All types</option>
        {PET_TYPES.map((type) => (
          <option>{type}</option>
        ))}
      </select>
    </div>
  );
};
