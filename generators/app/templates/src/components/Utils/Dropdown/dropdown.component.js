import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import enhanceWithClickOutside from "react-click-outside";
import {
  DropdownContainer,
  DropdownMain,
  DropdownItemContainer,
  Item
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
    const { actions, children, className, hover } = this.props;
    const { open } = this.state;
    return (
      <DropdownContainer
        className={className}
        onClick={this.toggleOpen}
        onMouseEnter={hover ? this.toggleOpen : null}
        onMouseLeave={hover ? this.toggleOpen : null}
      >
        <DropdownMain onClick={this.toggleOpen}>{children}</DropdownMain>
        {open && (
          <DropdownItemContainer>
            <ul>
              {actions.map((action, i) => (
                <Item key={i}>
                  <button onClick={action.onClick}>
                    {action.icon && (
                      <FontAwesomeIcon icon={action.icon} className="checked" />
                    )}
                    <span>{action.label}</span>
                  </button>
                </Item>
              ))}
            </ul>
          </DropdownItemContainer>
        )}
      </DropdownContainer>
    );
  }
}

Dropdown.defaultProps = {
  hover: false
};

export default enhanceWithClickOutside(Dropdown);
