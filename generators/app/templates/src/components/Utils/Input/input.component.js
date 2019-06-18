/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Input = ({ icon, ...rest }) => (
  <div className="input wrap input-wrap--inline">
    <label>
      <FontAwesomeIcon icon={icon} className="icon" />
    </label>
    <input {...rest} />
  </div>
);
