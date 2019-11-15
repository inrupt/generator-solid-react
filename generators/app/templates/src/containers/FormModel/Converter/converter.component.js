import React, { useCallback, useState } from 'react';
import { successToaster, errorToaster } from '@utils';
import { Select } from '@util-components';
import { ShexFormModel, FormModel } from '@inrupt/solid-sdk-forms';
import { ConverterTypesList, ConverterTypes } from '@constants';
import { useTranslation } from 'react-i18next';
import { Util } from '@shexjs/core';
import SHACLValidator from 'shacl-js';
import * as N3 from 'n3';
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

  const Meta = {
    shexc: {
      prefixes: {},
      base: window.location.href
    },
    data: {
      prefixes: {},
      base: window.location.href
    },
    layout: {
      prefixes: {},
      base: window.location.href
    }
  };

  // Temporary code for Shex Layout testing
  /* eslint-disable */
  // This is from Eric's code and is required for AnnotateSchema
  const F = N3.DataFactory;
  const NS_Rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
  const IRI_RdfType = NS_Rdf + 'type';
  const NS_Layout = 'http://janeirodigital.com/layout#';
  const TERM_RdfType = F.namedNode(IRI_RdfType);
  const TERM_LayoutType = F.namedNode(NS_Layout + 'Layout');
  const TERM_LayoutAnnotation = F.namedNode(NS_Layout + 'annotation');
  const TERM_LayoutPath = F.namedNode(NS_Layout + 'path');
  const TERM_LayoutRef = F.namedNode(NS_Layout + 'ref');

  //TODO: This is Eric's code, and requires an update to shex.js with shexpath to work. Leaving for now
  const annotateSchema = (schema, layout) => {
    const newSchema = JSON.parse(JSON.stringify(schema)); // modify copy, not original.
    let index = Util.index(newSchema); // update index to point at copy.
    const shexPath = Util.shexPath(newSchema, Meta.shexc);
    layout.getQuads(null, TERM_RdfType, TERM_LayoutType).forEach(quad => {
      const annotated = layout.getQuads(quad.subject, TERM_LayoutAnnotation, null).map(t => {
        let elt = null;
        const quads = layout.getQuads(t.object, TERM_LayoutRef, null);
        if (quads.length) {
          if (!index) index = Util.index(newSchema);
          let lookFor = quads[0].object.value;
          elt = index.shapeExprs[lookFor] || index.tripleExprs[lookFor];
        } else {
          const pathStr = layout.getQuads(t.object, TERM_LayoutPath, null)[0].object.value;
          elt = shexPath.search(pathStr)[0];
        }
        const newAnnots = layout
          .getQuads(t.object, null, null)
          .filter(t => !t.predicate.equals(TERM_LayoutPath))
          .map(t => {
            return {
              type: 'Annotation',
              predicate: t.predicate.value,
              object: RDFJStoJSONLD(t.object)
            };
          });
        elt.annotations = newAnnots; // @@ merge, overriding same predicate values?
        return elt;
      });
    });
    console.log(newSchema);
    return newSchema;
  };
  /* eslint-enable */

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
    let shexClass;
    let newSchema;
    let layout;

    if (hasLayoutFile) {
      const response = await fetch(layoutUrl);
      layout = await response.text();
      newSchema = annotateSchema(schema, layout);
      shexClass = new ShexFormModel(newSchema);
      console.log(newSchema); // eslint-disable-line no-console
    } else {
      shexClass = new ShexFormModel(schema);
    }
    const formModelOutput = shexClass.convert();
    setFormModel(formModelOutput);
  });

  /**
   * Convert SHACL
   */
  const convertShacl = async () => {
    const validator = new SHACLValidator();
    const response = await fetch('https://jmartin.inrupt.net/public/shapes/book-shacl.ttl');
    const shape = await response.text();
    const newResponse = await fetch('https://jmartin.inrupt.net/public/books/book.ttl');
    const data = await newResponse.text();

    // TODO: Currently this is just validating the shacl. This is where the converter code will be called once it is ready
    validator.validate(data, 'text/turtle', shape, 'text/turtle', (e, report) => {
      if (report.conforms() === false) {
        let message = 'Error in ';
        report.results().forEach(result => {
          // TODO: Put this in a function to handle shacl errors
          result.resultNode['http://www.w3.org/ns/shacl#resultPath'].forEach(m => {
            message += `${m['@id']} `;
          });

          message += ' with the following errors: ';

          result.resultNode['http://www.w3.org/ns/shacl#resultMessage'].forEach(n => {
            message += `${n['@value']} \n`;
          });
        });

        // Reports out the errors
        console.log(message); // eslint-disable-line no-console
      }
    });
  };

  /**
   * Submit function for the form, to do the conversion and set up the output
   */
  const onSubmit = useCallback(async (e: Event) => {
    e.preventDefault();
    try {
      switch (selectedInput) {
        case t('formLanguage.shacl'):
          // Convert Shacl
          await convertShacl();
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
