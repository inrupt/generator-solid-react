import React, { useCallback } from 'react';
import { successToaster } from '@utils';
import {
  FormModelContainer,
  FormWrapper,
  Form,
  Input,
  Result,
  ResultHeader,
  Button,
  SelectLabel
} from './converter.style';
import { Select } from '../../../components/Utils';

/**
 * Form Model Converter UI component, containing the styled components for the Form Model Converter
 * @param props
 */
const FormModelConverterView = () => {
  const schemaUrl = '';
  const formModel = '';
  const optionsList = ['SHACL', 'SHACL + RDF Extension', 'ShEx', 'ShEx + Layout'];

  const onChange = useCallback((e: Event) => {
    console.log('Changed!', e); // eslint-disable-line no-console
  });

  const onSubmit = useCallback((e: Event) => {
    console.log('Submitted!', e); // eslint-disable-line no-console
  });

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(formModel);
    successToaster('Turtle Successfully Copied', 'Success!');
  });

  const onListChange = useCallback(() => {});

  return (
    <FormModelContainer>
      <FormWrapper>
        <Form onSubmit={onSubmit}>
          <h3>ShEx Form Model</h3>
          <SelectLabel htmlFor="selected-filter">
            <Select
              name="selected-filter"
              id="selected-filter"
              options={optionsList}
              onChange={onListChange}
            />
          </SelectLabel>
          <Input type="text" placeholder="ShExC" onChange={onChange} value={schemaUrl} />
          <Input type="text" placeholder="UI Model" />
          <Button type="submit" disabled={!(schemaUrl !== '')}>
            Convert to Turtle
          </Button>
        </Form>
        <Result>
          <ResultHeader>
            <h4>Turtle result: </h4>
            <button type="button" onClick={copyToClipboard} disabled={!formModel}>
              Copy to Clipboard
            </button>
          </ResultHeader>
          <textarea value={formModel} onChange={() => formModel} />
        </Result>
      </FormWrapper>
    </FormModelContainer>
  );
};

export default FormModelConverterView;
