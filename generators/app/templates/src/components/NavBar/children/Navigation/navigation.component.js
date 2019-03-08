import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  navigation: Object
};

const Navigation = ({ navigation }: Props) => {
  return (
    <nav role="navigation" className="nav nav__primary">
      <ul>
        {navigation &&
          navigation.map(item => (
            <li key={item.id} data-testid="item">
              <NavLink to={item.to} activeClassName="active">
                <span className="icon">
                  <img src={item.icon} alt={item.id} className="nav-icon" />
                </span>
                <span className="label">{item.label}</span>
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navigation;
