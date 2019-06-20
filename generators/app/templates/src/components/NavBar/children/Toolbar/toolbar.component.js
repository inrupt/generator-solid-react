import React from 'react';

type Props = {
  toolbar: Array<Object>,
  open: Boolean,
  customClass: String
};

const Toolbar = ({ toolbar, open, customClass }: Props) => (
  <nav className="nav nav__toolbar">
    <ul>
      {toolbar &&
        toolbar.map(({ component: Component, props }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i} data-testid="item">
            <Component {...props} open={open} customClass={customClass} />
          </li>
        ))}
    </ul>
  </nav>
);

export default Toolbar;
