import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Input = props => {
  return (
    <div className="input wrap input-wrap--inline">
      <label>
        <FontAwesomeIcon icon={props.icon} className="icon" />
      </label>
      <input {...props} />
    </div>
  );
};
