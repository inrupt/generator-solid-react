import React, { useCallback, useState } from 'react';
import { successToaster, errorToaster } from '@utils';
import { Select } from '@util-components';
import { ShexFormModel, FormModel } from '@inrupt/solid-sdk-forms';
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
} from '../form-model.style';

/**
 * Form Model Converter UI component, containing the styled components for the Form Model Converter
 * @param props
 */
const FormModelConverter = () => {
  const { t } = useTranslation();
  const [schemaUrl, setSchemaUrl] = useState('');
  const [layoutUrl, setLayoutUrl] = useState('');
  const [formModel, setFormModel] = useState('');
  const [selectedInput, setSelectedInput] = useState(t('formLanguage.shex'));
  const [layoutText, setLayoutText] = useState(t('formLanguage.shexLayout'));
  const [shapeText, setShapeText] = useState(t('formLanguage.shexShape'));
  const [hasLayoutFile, setHasLayoutFile] = useState(false);

  // Temporarily filtering out anything except ShEx as that's all that works currently
  const filteredOptions = ConverterTypesList.filter(
    item => t(`formLanguage.${item}`) === t('formLanguage.shex')
  );
  const optionsList = filteredOptions.map(item => t(`formLanguage.${item}`));

  /**
   * Helper function to detect if choice is ShEx or SHACL
   * @param value
   * @returns {boolean}
   */
  const isShEx = value =>
    value === t(`formLanguage.${ConverterTypes.Shex}`) ||
    value === t(`formLanguage.${ConverterTypes.ShexLayout}`);

  /**
   * Helper function to detect if choice has a layout or extension or not
   * @param value
   * @returns {boolean}
   */
  const hasLayout = value =>
    value === t(`formLanguage.${ConverterTypes.ShaclExtension}`) ||
    value === t(`formLanguage.${ConverterTypes.ShexLayout}`);

  /**
   * Change event for the shape/schema URL field
   */
  const onSchemaChange = useCallback((e: Event) => {
    setSchemaUrl(e.target.value);
    setFormModel('');
  });

  /**
   * Change event for layout/extension URL field
   */
  const onLayoutChange = useCallback((e: Event) => {
    setLayoutUrl(e.target.value);
    setFormModel('');
  });

  /**
   * Use the form library to convert a shex shape to a form model and
   * set the response to output to a text area
   * @returns {Promise<void>}
   */
  const convertShex = useCallback(async () => {
    // This code may move to another function, to allow for layouts
    const formModel = new FormModel();
    const schema = await formModel.parseSchema(schemaUrl);
    const shexClass = new ShexFormModel(schema);
    const formModelOutput = shexClass.convert();
    setFormModel(formModelOutput);
  });

  /**
   * Submit function for the form, to do the conversion and set up the output
   */
  const onSubmit = useCallback(async (e: Event) => {
    e.preventDefault();
    try {
      switch (selectedInput) {
        case t('formLanguage.shacl'):
          // Convert Shacl
          // await convertShacl();
          break;
        case t('formLanguage.shaclExtension'):
          // Convert Shacl with extension
          break;
        case t('formLanguage.shex'):
          await convertShex();
          break;
        case t('formLanguage.shexLayout'):
          // TODO: Add layout code
          await convertShex();
          break;
        default:
          errorToaster(t('notifications.unknownError'), t('notifications.error'));
          break;
      }
    } catch (e) {
      errorToaster(e.message, t('notifications.error'));
    }
  });

  /**
   * Copy the form model directly to the user's computer's clipboard
   */
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(formModel);
    successToaster(t('formLanguage.converter.copySuccess'), t('notifications.success'));
  });

  /**
   * Change event for the input list change, setting up the form conditions
   */
  const onListChange = useCallback((e: Event) => {
    const newValue = e.target.value;

    // Set the label for the label or extension field
    if (isShEx(newValue)) {
      setLayoutText(t('formLanguage.layout'));
      setShapeText(t('formLanguage.shexShape'));
    } else {
      setLayoutText(t('formLanguage.extension'));
      setShapeText(t('formLanguage.shaclShape'));
    }

    // Set boolean to disable or enable the layout/extension textbox
    setHasLayoutFile(hasLayout(newValue));
    setSelectedInput(newValue);
  });

  return (
    <FormModelContainer>
      <FormWrapper>
        <Form onSubmit={onSubmit}>
          <h3>{t('formLanguage.converter.title')}</h3>
          <ConverterInput>
            <label htmlFor="selected-filter">{t('formLanguage.input')}</label>
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
              data-testid="layout-text-box"
            />
          </ConverterInput>
          <Button type="submit" data-testid="convert-button" disabled={!(schemaUrl !== '')}>
            {t('formLanguage.converter.convert')}
          </Button>
        </Form>
        <Result>
          <ResultHeader>
            <h4>{t('formLanguage.formModel')}</h4>
            <button
              type="button"
              onClick={copyToClipboard}
              data-testid="copy-button"
              disabled={!formModel}
            >
              {t('formLanguage.copyToClipboard')}
            </button>
          </ResultHeader>
          <textarea value={formModel} onChange={() => formModel} />
        </Result>
      </FormWrapper>
    </FormModelContainer>
  );
};

export default FormModelConverter;
