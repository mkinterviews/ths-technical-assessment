import { PET_TYPES } from "../../../../mocks/generatePets";
import { SearchInput } from "../../../SearchInput/SearchInput";
import { Select } from "../../../Select/Select";

import "./PetFilters.css";

export const PetFilters = ({ filters, setFilters }) => {
  return (
    <div className="PetFilters">
      <SearchInput
        label="Search"
        value={filters["q"]}
        onChange={(value) =>
          setFilters((filters) => ({ ...filters, q: value }))
        }
      />
      <Select
        label="Type"
        value={filters["type"]}
        onChange={(value) =>
          setFilters((filters) => ({ ...filters, type: value }))
        }
      >
        <option value="">All types</option>
        {PET_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
    </div>
  );
};
