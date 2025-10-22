import { useId } from "react";
import { FormField } from "../FormField/FormField";

import "./Select.css";

export const Select = (props) => {
  const { label, value, onChange, children } = props;

  const id = useId();

  return (
    <FormField label={label} inputId={id}>
      <select
        id={id}
        className="Select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </FormField>
  );
};
