import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item, ProviderItemStyle } from "./provider.style";

type Props = {
  data: any,
  onSelect: Function,
  radioName: String,
  id: String,
  checked: Boolean
};

const ProviderItem = ({ data, onSelect, radioName, id, checked }: Props) => {
  return (
    <Item data-testid="provider-item">
      <input
        type="radio"
        name={radioName}
        id={id}
        onChange={onSelect}
        value={data.registerLink}
        checked={checked}
      />
      <ProviderItemStyle htmlFor={id} className="provider-item">
        <div className="img-group">
          <img src={data.image} alt={data.label} />
          <span className={"label"}>{data.label}</span>
        </div>
        <FontAwesomeIcon icon="check" className="checked" />
      </ProviderItemStyle>
    </Item>
  );
};

export default ProviderItem;
