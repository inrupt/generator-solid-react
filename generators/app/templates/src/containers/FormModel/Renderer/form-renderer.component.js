/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormModel } from '@inrupt/solid-react-components';
import { Select, Loader } from '@util-components';
import ldflex from '@solid/query-ldflex';

import { RendererTypesList, ConverterTypes } from '@constants';
import { successToaster, errorToaster } from '@utils';
import {
  FormModelContainer,
  FormWrapper,
  FormRenderContainer,
  Form,
  Input,
  Result,
  ResultHeader,
  Button,
  ConverterInput
} from '../form-model.style';

import '@inrupt/solid-react-components/build/static/css/index.css';
import { AutoSaveSpinner } from '@components';

/**
 * Form Model Renderer UI component, containing the styled components for the Form Model Converter
 */
const FormModelRenderer = () => {
  const { t } = useTranslation();
  const [selectedInput, setSelectedInput] = useState(t('formLanguage.formModel'));
  const [layoutUrl, setLayoutUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [layoutText, setLayoutText] = useState(t('formLanguage.extension'));
  const [shapeText, setShapeText] = useState(t('formLanguage.formModel'));
  const [source, setSource] = useState('');
  const [schemaUrl, setSchemaUrl] = useState('');
  const [submitted, setSubmitted] = useState(null);
  const [hasLayoutFile, setHasLayoutFile] = useState('');
  const [isViewMode, setViewMode] = useState(true);

  const filteredOptions = RendererTypesList.filter(
    item => t(`formLanguage.${item}`) === t('formLanguage.formModel')
  );
  const optionsList = filteredOptions.map(item => t(`formLanguage.${item}`));

  /**
   * Helper function to detect if choice is ShEx
   * @param value
   * @returns {boolean}
   */
  const isShEx = value =>
    value === t(`formLanguage.${ConverterTypes.Shex}`) ||
    value === t(`formLanguage.${ConverterTypes.ShexLayout}`);

  /**
   * Helper function to detect if choice is SHACL
   * @param value
   * @returns {boolean}
   */
  const isShacl = value =>
    value === t(`formLanguage.${ConverterTypes.Shacl}`) ||
    value === t(`formLanguage.${ConverterTypes.ShaclExtension}`);

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
  });

  /**
   * Change event for layout/extension URL field
   */
  const onLayoutChange = useCallback((e: Event) => {
    setLayoutUrl(e.target.value);
  });

  /**
   * Change event for the source
   */
  const onSourceChange = useCallback((e: Event) => {
    setSource(e.target.value);
  });

  /**
   * Submit function for the form, to do the conversion and set up the output
   * This function is for the view button
   * Clears the ldflex cache before submission
   * in case something changed in the pod and not on the generator side,
   * it will attempt to fetch the file again and not the cached one
   */
  async function onSubmit(e: Event) {
    e.preventDefault();
    ldflex.clearCache();
    await setSubmitted(null);
    let obj = {};
    if (schemaUrl !== '') obj = { ...obj, schemaUrl };
    if (source !== '') obj = { ...obj, source };
    setSubmitted(obj);
  }

  /**
   * Change event for the input list change, setting up the form conditions
   */
  const onListChange = useCallback((e: Event) => {
    const newValue = e.target.value;

    // Set the label for the label or extension field
    if (isShEx(newValue)) {
      setLayoutText(t('formLanguage.layout'));
      setShapeText(t('formLanguage.shexShape'));
    } else if (isShacl(newValue)) {
      setLayoutText(t('formLanguage.extension'));
      setShapeText(t('formLanguage.shaclShape'));
    } else {
      setLayoutText(t('formLanguage.extension'));
      setShapeText(t('formLanguage.formModel'));
    }

    // Set boolean to disable or enable the layout/extension textbox
    setHasLayoutFile(hasLayout(newValue));
    setSelectedInput(newValue);
    console.log(selectedInput);
  });

  const onError = e => {
    if (e.message.toString().indexOf('Validation failed') < 0) {
      errorToaster(t('formLanguage.renderer.formNotLoaded'), t('notifications.error'), {
        label: t('errorFormRender.link.label'),
        href: t('errorFormRender.link.href')
      });
      setIsLoading(false);
    }
  };

  const onDelete = () => {
    successToaster(t('formLanguage.renderer.fieldDeleted'), t('notifications.success'));
  };

  const onAddNewField = () => {
    successToaster(t('formLanguage.renderer.fieldAdded'), t('notifications.success'));
  };

  return (
    <FormModelContainer>
      <FormWrapper>
        <Form onSubmit={onSubmit}>
          <h3>{t('formLanguage.renderer.title')}</h3>
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
            <label htmlFor="converter-input-shape-text">{shapeText}</label>
            <Input
              type="text"
              placeholder={shapeText}
              name="converter-input-shape-text"
              id="converter-input-shape-text"
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
          <ConverterInput>
            <label htmlFor="converter-input-form-language">{t('formLanguage.source')}</label>
            <Input
              type="text"
              placeholder={t('formLanguage.source')}
              name="converter-input-form-language"
              id="converter-input-form-language"
              onChange={onSourceChange}
              value={source}
            />
          </ConverterInput>
          <Button type="submit">{t('formLanguage.renderer.submitBtn')}</Button>
        </Form>
        <Result>
          <ResultHeader>
            <h4>{t('formLanguage.formModel')}</h4>
            <div>
              <Button
                type="button"
                className={isViewMode ? 'active' : ''}
                onClick={() => setViewMode(true)}
              >
                {t('formLanguage.renderer.viewBtn')}
              </Button>
              <Button
                type="button"
                className={!isViewMode ? 'active' : ''}
                onClick={() => setViewMode(false)}
              >
                {t('formLanguage.renderer.editBtn')}
              </Button>
            </div>
          </ResultHeader>
        </Result>
        <FormRenderContainer>
          {submitted !== null && (
            <div>
              <FormModel
                {...{
                  modelPath: submitted.schemaUrl,
                  podPath: (submitted && submitted.source) || '',
                  viewer: isViewMode,
                  onInit: () => setIsLoading(true),
                  onLoaded: () => setIsLoading(false),
                  onSuccess: () => {},
                  onSave: () => {},
                  onError: error => {
                    onError(error);
                  },
                  onAddNewField: response => onAddNewField(response),
                  onDelete: response => onDelete(response),
                  settings: {
                    theme: {
                      inputText: 'input-wrap',
                      inputCheckbox: 'sdk-checkbox checkbox',
                      form: 'inrupt-sdk-form',
                      childGroup: 'inrupt-form-group'
                    },
                    savingComponent: AutoSaveSpinner
                  }
                }}
                autoSave
              />
            </div>
          )}
        </FormRenderContainer>
        {isLoading && <Loader absolute />}
      </FormWrapper>
    </FormModelContainer>
  );
};

export default FormModelRenderer;
