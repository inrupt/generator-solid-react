import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import enhanceWithClickOutside from "react-click-outside";
import {
  DropdownContainer,
  DropdownMain,
  DropdownItemContainer
} from "./dropdown.style";
type Props = {
  actions: Array<Object>,
  children: React.Node,
  className: String
};

type State = { open: Boolean };

class Dropdown extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggleOpen = () => this.setState({ open: !this.state.open });

  handleClickOutside() {
    this.setState({ open: false });
  }

  render() {
    const { actions, children, className } = this.props;
    const { open } = this.state;
    /*   <DropdownContainer className={className} onClick={this.toggleOpen}>
        <DropdownMain onClick={this.toggleOpen}>{children}</DropdownMain>
        {open && (
          <DropdownItemContainer>
            <ul>
              {data.map((item, i) => (
                <li key={i}>
                  <button onClick={item.onClick}>
                    <FontAwesomeIcon icon={item.icon} className="checked" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </DropdownItemContainer>
        )}
      </DropdownContainer>
              */
    return (
      <div className="hasChildren">
        <button onClick={this.toggleOpen}>{children}</button>
        <ul class="sub-nav-dropdown">
          {actions.map((item, i) => (
            <li key={i}>
              <button onClick={item.onClick}>
                {item.icon && (
                  <FontAwesomeIcon icon={item.icon} className="checked" />
                )}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default enhanceWithClickOutside(Dropdown);
