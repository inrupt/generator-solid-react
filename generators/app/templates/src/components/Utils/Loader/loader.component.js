import React, { Component } from 'react';
import { LoaderWrapper, CubeGrid, Cube } from './loader.style';

type Props = {
  delay?: Number,
  absolute?: Boolean
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
    const cubes = [
      { id: '0', value: 0.2 },
      { id: '1', value: 0.3 },
      { id: '2', value: 0.4 },
      { id: '3', value: 0.1 },
      { id: '4', value: 0.2 },
      { id: '5', value: 0.3 },
      { id: '6', value: 0 },
      { id: '7', value: 0.1 },
      { id: '8', value: 0.2 }
    ];
    const { show } = this.state;
    const { absolute } = this.props;
    return (
      show && (
        <LoaderWrapper absolute={absolute}>
          <CubeGrid>
            {cubes.map(({ id, value }) => (
              <Cube key={id} delay={value} />
            ))}
          </CubeGrid>
        </LoaderWrapper>
      )
    );
  }
}

Loader.defaultProps = {
  delay: 300,
  absolute: false
};

export default Loader;
