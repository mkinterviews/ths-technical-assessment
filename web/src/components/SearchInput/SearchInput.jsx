import { useId } from "react";
import { FormField } from "../FormField/FormField";

import "./SearchInput.css";

export const SearchInput = (props) => {
  const { label = "Search", value, onChange } = props;

  const id = useId();

  return (
    <FormField label={label} inputId={id}>
      <input
        id={id}
        className="SearchInput"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </FormField>
  );
};
