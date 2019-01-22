import { Component } from "react";

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
    this.state = this.state = {
      hasError: false,
      error: null,
      info: null
    };
  }
  // Catch error and update state to render custom error component
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.component(this.state.error, this.state.info);
    } else {
      return this.props.children;
    }
  }

  props: Props;
}
