import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputWrapper } from './input.style';

export const Input = (props) => {
  return(
    <InputWrapper>
      <FontAwesomeIcon icon={props.icon} className="icon" />
      <input {...props} />
    </InputWrapper>
  );
};
