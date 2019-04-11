import React from "react";

type Props = {
  toolbar: Array<Object>,
  t: Function
};

const Toolbar = ({ toolbar, open, customClass }: Props) => {
  return (
    <nav className="nav nav__toolbar">
      <ul>
        {toolbar &&
          toolbar.map(({ component: Component, props }, i) => (
            <li key={i} data-testid="item">
              <Component {...props} open={open} customClass={customClass} />
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Toolbar;
