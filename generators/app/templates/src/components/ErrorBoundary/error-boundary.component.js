import { Component } from 'react';

type Props = {
  children: Node,
  component: (error: String, info: Object) => Node
};

/**
 * ErrorBoundary component to catch React component errors
 * You can use you own markup to show Error in your components
 */
export default class ErrorBoundary extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null
    };
  }

  // Catch error and update state to render custom error component
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info
    });
  }

  render() {
    const { hasError, error, info } = this.state;
    const { component, children } = this.props;
    return hasError ? component(error, info) : children;
  }
}
