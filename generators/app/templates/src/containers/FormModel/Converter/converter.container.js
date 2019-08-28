import React, { Component } from 'react';
import FormModelConverterView from './converter.component';

/**
 * Container component the Form Model Converter Page
 */
export class FormModelConverterComponent extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return <FormModelConverterView />;
  }
}
