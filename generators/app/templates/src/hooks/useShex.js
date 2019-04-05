import { useCallback, useState, useEffect } from 'react';
import data from '@solid/query-ldflex';
import shexParser from '@shexjs/parser';
import shexCore from '@shexjs/core';

export const useShex = (fileShex: String, documentUri: String, shapeName: String) => {
    const [shexData, setShexData] = useState({});
    let shapes = [];

    const fetchShex = useCallback(async () => {
        const rootShex = await fetch(fileShex, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
        const rootShexText = await rootShex.text();

        return rootShexText.toString();
    });

    const fetchDocument = async () => {
        const document = await data[documentUri];

        return document;
    };

    const isLink = valueExpr => {
        return typeof valueExpr === 'string' || null;
    };

    const getNodeValues = async (predicate, document) => {
        const values = [];

        for await (let predicateValue of document) {
            values.push(predicateValue.value);
        }
        return values;
    };

    const isSelect = (id) => {
      const currentShape = shapes.find(shape =>
        shape.id === id && shape.values
      );
      return currentShape;
    }

    const selectDefaultOption = (options, defaultValue) => {
      return options.values.map(option => {
        if (option.value === defaultValue) {
          return {
            value: option.value,
            selected: true
          }
        }
        return option;
      });
    }

    const fillFormData = async (rootShape: Object, document) => {
        const currentShape = shapes.find(shape => shape.id.includes(rootShape.id));
        let formData = {};
        let linksValues = [];

        if (currentShape && currentShape.expression) {
            const { expression: { expressions } } = currentShape;

            for await (let currentExpression of expressions) {
                const values = await getNodeValues(currentExpression, document[currentExpression.predicate]);

                for await (let value of values) {

                    if (isLink(currentExpression.valueExpr)) {
                      linksValues = await fillFormData(
                        {
                          id: currentExpression.valueExpr,
                          parentPredicate: currentExpression.predicate,
                        },
                        document[currentExpression.predicate]
                      );

                      const optionsSelect = isSelect(currentExpression.valueExpr);

                      if (optionsSelect) {
                        linksValues = selectDefaultOption(optionsSelect, value);
                      }
                    }

                    const idAttribute = currentExpression.predicate;

                    formData = {
                        ...formData,
                        [idAttribute]: {
                            link: isLink(currentExpression.valueExpr),
                            values: isLink(currentExpression.valueExpr)
                                ? linksValues
                                : formData[idAttribute] ? [...formData[idAttribute].values, value] : [value],
                        },
                    };
                }
            }
            return formData;
        }
    };


    const toShexJS = useCallback(async () => {
        const shexString = await fetchShex();
        const parser = shexParser.construct(window.location.href);
        const podDocument = await fetchDocument();
        const shexJ = shexCore.Util.AStoShExJ(parser.parse(shexString));

        shapes = shexJ.shapes;

        if (shapes.length > 0) {
            const formData = await fillFormData(
                { id: shapeName },
                podDocument
            );
            setShexData({ shexJ, formData });
        }
    });

    useEffect(() => {
        toShexJS();
    }, [fileShex, documentUri]);

    return {
        shexData
    };
};
