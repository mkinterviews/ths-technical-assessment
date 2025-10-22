import { useQueryState } from "nuqs";

import { PET_TYPES } from "../../../../mocks/generatePets";
import { SearchInput } from "../../../SearchInput/SearchInput";
import { Select } from "../../../Select/Select";

import "./PetFilters.css";

export const PetFilters = ({ filters, setFilters }) => {
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [type, setType] = useQueryState("type", { defaultValue: "" });

  return (
    <div className="PetFilters">
      <SearchInput label="Search" value={q} onChange={(value) => setQ(value)} />
      <Select label="Type" value={type} onChange={(value) => setType(value)}>
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
