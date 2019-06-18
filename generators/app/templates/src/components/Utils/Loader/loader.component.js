import React, { Component } from 'react';
import { LoaderWrapper, CubeGrid, Cube } from './loader.style';

type Props = {
  delay?: Number
};

class Loader extends Component<Props> {
  state = { show: false };

  componentDidMount() {
    const { delay } = this.props;
    this.delayTimer = setTimeout(this.show, delay);
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimer);
  }

  show = () => this.setState({ show: true });

  render() {
    const cubes = [0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0, 0.1, 0.2];
    const { show } = this.state;
    return (
      show && (
        <LoaderWrapper>
          <CubeGrid>
            {cubes.map((delay, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cube key={i} delay={delay} />
            ))}
          </CubeGrid>
        </LoaderWrapper>
      )
    );
  }
}

Loader.defaultProps = {
  delay: 300
};

export default Loader;
