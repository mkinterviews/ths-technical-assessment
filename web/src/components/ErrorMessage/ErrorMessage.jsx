import { parseError } from "./utils";

import "./ErrorMessage.css";

export const ErrorMessage = (props) => {
  const { title } = props;
  const error = parseError(props.error);

  return (
    <div className="error-box" role="alert" aria-live="assertive">
      {title && <h2>{title}</h2>}
      <span>{error}</span>
    </div>
  );
};
