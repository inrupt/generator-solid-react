import React, { useCallback, useState, useEffect } from 'react';
import data from '@solid/query-ldflex';
import shexParser from '@shexjs/parser';
import shexCore from '@shexjs/core';

export const useShex = (root: String, documentUri: String) => {
    const [shexData, setShexData] = useState({});
    const [formValues, setFormValues] = useState({});
    let shapes = [];

    const fetchShex = useCallback(async () => {
        const rootShex = await fetch(root, {
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

    let formData = {};

    const getNodeValues = async (predicate, document) => {
        const values = [];

        for await (let predicateValue of document) {
            values.push(predicateValue.value);
        }
        return values;
    };

    const isSelect = async (id) => {
      const currentShape = shapes.find(shape =>
        shape.id === id
      );
      return currentShape && currentShape.values || null;
    }

    const fillShexJData = async (rootShape: Object, document) => {
        const currentShape = shapes.find(shape =>
            shape.id.includes(rootShape.id)
        );
        let formData = {};
        let linksValues = [];

        if (currentShape && currentShape.expression) {
            const {
                expression: { expressions },
            } = currentShape;

            for await (let currentExpression of expressions) {

                const values = await getNodeValues(
                    currentExpression,
                    document[currentExpression.predicate]
                );

                for await (let value of values) {
                    const optionsSelect = !isSelect(currentExpression.valueExpr);
                    if (isLink(currentExpression.valueExpr) && !optionsSelect) {
                      linksValues = await fillShexJData(
                        {
                          id: currentExpression.valueExpr,
                          parentPredicate: currentExpression.predicate,
                        },
                        document[currentExpression.predicate]
                      );
                    } else {
                      linksValues = optionsSelect;
                    }
                    // console.log(value, currentExpression);
                    const idAttribute = currentExpression.predicate;
                    // console.log(value, 'value', currentExpression);
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

    /* const fillShexJData = useCallback(async (rootShape: Object, document) => {
        const shape = shapes.find(shape => shape.id.includes(rootShape.id));

        if (shape.expression) {
            for await (let expression of shape.expression.expressions) {

              if (isLink(expression.valueExpr)) {
                  const newRootShape = {
                    id: expression.valueExpr,
                    parentRootId: rootShape.id,
                    predicate: expression.predicate,
                    parentLink:
                      formData[expression.predicate] &&
                      formData[expression.predicate].value,
                  };
                  await fillShexJData(
                    newRootShape,
                    document[expression.predicate]
                  );
                }

                for await (let predicateValue of document[expression.predicate]) {
                    const idAttribute =
                        rootShape.parentLink || expression.predicate;

                    if (formData[idAttribute]) {
                        if (
                            Array.isArray(formData[idAttribute].value) &&
                            formData[idAttribute].value.length === 1
                        ) {
                            formData[idAttribute] = {
                                value: [
                                    {
                                        link: isLink(expression.valueExpr) ,
                                        predicate:
                                            formData[idAttribute].predicate,
                                        value: formData[idAttribute].value[0],
                                    },
                                ],
                            };
                        }
                        formData[idAttribute] = {
                            ...formData[idAttribute],
                            value: [
                                ...formData[idAttribute].value,
                                {
                                    predicate: expression.predicate,
                                    value: predicateValue.value,
                                },
                            ],
                        };
                    } else {
                        formData = {
                            ...formData,
                            [idAttribute]: {
                                link: isLink(expression.valueExpr),
                                predicate: expression.predicate,
                                value: [predicateValue.value],
                            },
                        };
                    }
                }
            }

            return formData;
        }
    }); */

    const toShexJS = useCallback(async () => {
        const shexString = await fetchShex();
        const parser = shexParser.construct(window.location.href);
        const podDocument = await fetchDocument();
        const shexJ = shexCore.Util.AStoShExJ(parser.parse(shexString));

        shapes = shexJ.shapes;

        if (shapes.length > 0) {
            const podResult = await fillShexJData(
                { id: 'UserProfile' },
                podDocument
            );
            setFormValues(podResult);
        }
        setShexData(shexJ);
    });

    useEffect(() => {
        toShexJS();
    }, [root, documentUri]);

    return {
        shexData,
        formValues,
    };
};
