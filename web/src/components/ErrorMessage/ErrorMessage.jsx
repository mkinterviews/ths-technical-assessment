import React from "react";

import { parseError } from "./utils";

import "./ErrorMessage.css";

export const ErrorMessage = (props) => {
  const { title } = props;
  const error = parseError(props.error);

  return (
    <div role="alert" aria-live="assertive" class="error-box">
      {title && <h2>{title}</h2>}
      <span>{error}</span>
    </div>
  );
};
