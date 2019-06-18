import React from 'react';

type Props = {
  toggleMobileMenu: Function
};

const HamburgerButton = ({ toggleMobileMenu }: Props) => {
  return (
    <div className="mobile-navigation__toggle">
      <button onClick={toggleMobileMenu}>
        <span className="icon">
          <img src="/img/bars-nav.svg" alt={'Icon Menu'} />
        </span>
      </button>
    </div>
  );
};

export default HamburgerButton;
