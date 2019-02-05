import React, { Component } from "react";
import { LoaderWrapper, CubeGrid, Cube } from "./loader.style";
type Props = {
  show: boolean
};

class Loader extends Component<Props> {
  render() {
    const { show } = this.props;
    const cubes = [0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0, 0.1, 0.2];

    return (
      <LoaderWrapper show={show}>
        <CubeGrid>
          {cubes.map((delay, i) => (
            <Cube key={i} delay={delay} />
          ))}
        </CubeGrid>
      </LoaderWrapper>
    );
  }
}

export default Loader;
