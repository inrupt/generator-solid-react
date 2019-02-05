import React, { Component } from "react";
import { Loader } from "@util-components";

function isLoading(HOComponent) {
  return class extends Component {
    render() {
      const { isLoading, ...rest } = this.props;
      return isLoading ? <Loader /> : <HOComponent {...rest} />;
    }
  };
}

export default isLoading;
