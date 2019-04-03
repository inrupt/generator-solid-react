import React from "react";

type Props = {
  toolbar: Array<Object>,
  t: Function
};

const Toolbar = ({ toolbar }: Props) => {
  return (
    <nav className="nav nav__toolbar">
      <ul>
        {toolbar &&
          toolbar.map(({ component: Component, props }, i) => (
            <li key={i} data-testid="item">
              <Component {...props} />
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Toolbar;
