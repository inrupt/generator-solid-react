import React from "react";

type Props = {
  label: String,
  checked: Boolean,
  name: String,
  id: String,
  onChange: Function,
  value: String
};

const RadioButton = (props: Props) => {
  const { label, onChange, name, id, checked, value } = props;
  return (
    <label class="radio" for={id}>
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      {label}
    </label>
  );
};

export default RadioButton;
