import React, { useCallback, useState } from 'react';
import { successToaster } from '@utils';
import { Select } from '@util-components';
import { ConverterTypesList, ConverterTypes } from '@constants';
import { useTranslation } from 'react-i18next';
import {
  FormModelContainer,
  FormWrapper,
  Form,
  Input,
  Result,
  ResultHeader,
  Button,
  ConverterInput
} from './converter.style';

/**
 * Form Model Converter UI component, containing the styled components for the Form Model Converter
 * @param props
 */
const FormModelConverter = () => {
  const { t } = useTranslation();
  const [schemaUrl, setSchemaUrl] = useState('');
  const [layoutUrl, setLayoutUrl] = useState('');
  const [formModel, setFormModel] = useState('');
  const [selectedInput, setSelectedInput] = useState('');
  const [layoutText, setLayoutText] = useState(t('formLanguage.converter.extension'));
  const [shapeText, setShapeText] = useState(t('formLanguage.converter.shaclShape'));
  const [hasLayoutFile, setHasLayoutFile] = useState('');
  const optionsList = ConverterTypesList.map(item => t(`formLanguage.converter.${item}`));

  /**
   * Helper function to detect if choice is ShEx or SHACL
   * @param value
   * @returns {boolean}
   */
  const isShEx = value =>
    value === t(`formLanguage.converter.${ConverterTypes.Shex}`) ||
    value === t(`formLanguage.converter.${ConverterTypes.ShexLayout}`);

  /**
   * Helper function to detect if choice has a layout or extension or not
   * @param value
   * @returns {boolean}
   */
  const hasLayout = value =>
    value === t(`formLanguage.converter.${ConverterTypes.ShaclExtension}`) ||
    value === t(`formLanguage.converter.${ConverterTypes.ShexLayout}`);

  /**
   * Change event for the shape/schema URL field
   */
  const onSchemaChange = useCallback((e: Event) => {
    setSchemaUrl(e.target.value);
  });

  /**
   * Change event for layout/extension URL field
   */
  const onLayoutChange = useCallback((e: Event) => {
    setLayoutUrl(e.target.value);
  });

  /**
   * Submit function for the form, to do the conversion and set up the output
   */
  const onSubmit = useCallback((e: Event) => {
    console.log('Submitted!', e); // eslint-disable-line no-console
  });

  /**
   * Copy the form model directly to the user's computer's clipboard
   */
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(formModel);
    successToaster('Turtle Successfully Copied', 'Success!');
  });

  /**
   * Change event for the input list change, setting up the form conditions
   */
  const onListChange = useCallback((e: Event) => {
    const newValue = e.target.value;

    // Set the label for the label or extension field
    if (isShEx(newValue)) {
      setLayoutText(t('formLanguage.converter.layout'));
      setShapeText(t('formLanguage.converter.shexShape'));
    } else {
      setLayoutText(t('formLanguage.converter.extension'));
      setShapeText(t('formLanguage.converter.shaclShape'));
    }

    // Set boolean to disable or enable the layout/extension textbox
    setHasLayoutFile(hasLayout(newValue));
  });

  return (
    <FormModelContainer>
      <FormWrapper>
        <Form onSubmit={onSubmit}>
          <h3>{t('formLanguage.converter.title')}</h3>
          <ConverterInput>
            <label htmlFor="selected-filter">{t('formLanguage.converter.input')}</label>
            <Select
              name="selected-filter"
              id="selected-filter"
              options={optionsList}
              onChange={onListChange}
            />
          </ConverterInput>
          <ConverterInput>
            <label htmlFor="converter-input">{shapeText}</label>
            <Input
              type="text"
              placeholder="ShExC"
              name="converter-input"
              id="converter-input"
              onChange={onSchemaChange}
              value={schemaUrl}
            />
          </ConverterInput>
          <ConverterInput>
            <label htmlFor="layout-input">{layoutText}</label>
            <Input
              type="text"
              placeholder={layoutText}
              onChange={onLayoutChange}
              disabled={!hasLayoutFile}
              value={layoutUrl}
              name="layout-input"
              id="layout-input"
            />
          </ConverterInput>
          <Button type="submit" disabled={!(schemaUrl !== '')}>
            {t('formLanguage.converter.convert')}
          </Button>
        </Form>
        <Result>
          <ResultHeader>
            <h4>{t('formLanguage.converter.formModel')}</h4>
            <button type="button" onClick={copyToClipboard} disabled={!formModel}>
              {t('formLanguage.converter.copyToClipboard')}
            </button>
          </ResultHeader>
          <textarea value={formModel} onChange={() => formModel} />
        </Result>
      </FormWrapper>
    </FormModelContainer>
  );
};

export default FormModelConverter;
