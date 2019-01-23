import React from "react";
import { Link } from "react-router-dom";
import { Navigation, Toolbar } from "./children";
type Props = { navigation: Array<Object>, toolbar: Array<React.Node> };

const NavBar = (props: Props) => {
  const { navigation, toolbar } = props;
  return (
    <header role="navigation" className="header header__desktop">
      <section className="header-wrap">
        <div className="logo-block">
          <Link to="/welcome">
            <img src="/img/inrupt.svg" alt="inrupt" />
          </Link>
        </div>
        {navigation ? <Navigation navigation={navigation} /> : ""}
        {toolbar ? <Toolbar toolbar={toolbar} /> : ""}
      </section>
    </header>
  );
};

export default NavBar;
