import React, { Component } from "react";
import { LoaderWrapper } from "./loader.style";
type Props = {
  show: boolean
};

class Loader extends Component<Props> {
  render() {
    const { show } = this.props;
    return (
      <LoaderWrapper show={show}>
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
      </LoaderWrapper>
    );
  }
}

export default Loader;
