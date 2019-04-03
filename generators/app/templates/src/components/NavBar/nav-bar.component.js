import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Navigation, Toolbar } from "./children";
type Props = { navigation: Array<Object>, toolbar: Array<React.Node>, sticky: boolean };

const NavBar = (props: Props) => {
  const { navigation, toolbar, sticky } = props;
  let componentElement = React.createRef();

  const setNavFixed = () => {
    const navHeight = componentElement.clientHeight;
    const content = document.getElementsByClassName('contentApp');
    if (content.length > 0) {
      content[0].style['margin-top'] = `${navHeight}px`;
    }

  };

  const onComponentResize = () => {
    window.addEventListener('resize', setNavFixed());
  }

  useEffect(() => {
    if (sticky) {
      onComponentResize();
    }
  }, [props]);
  return (
    <header role="navigation" className="header header__desktop fixed" ref={el => componentElement = el}>
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

NavBar.defaultProps = {
  sticky: true
};

export default NavBar;
