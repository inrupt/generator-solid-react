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

  renderIcon = (action: Object) => {
    return action.customIcon ? <div
      className={`flag-icon flag-icon-${action.icon}`}
    /> : <FontAwesomeIcon icon={action.icon} className="checked" />
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
        <DropdownMain onClick={this.toggleOpen} data-testid="dropdownMain">{children}</DropdownMain>
        {open && (
          <DropdownItemContainer className={'dropdownItem'}>
            <ul data-testid="list">
              {actions.map((action, i) => (
                <Item key={i} className="item">
                  <button onClick={action.onClick}>
                    {action.icon && (
                      this.renderIcon(action)
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
