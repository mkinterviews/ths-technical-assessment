import "./FormField.css";

export const FormField = (props) => {
  const { inputId, label, children } = props;

  return (
    <div className="FormField">
      <label htmlFor={inputId}>{label}</label>
      {children}
    </div>
  );
};
