import React, { useCallback, useState, useEffect } from 'react';
import data from '@solid/query-ldflex';
import shexParser from '@shexjs/parser';
import shexCore from '@shexjs/core';

export const useShex = (root: String, documentUri: String) => {
    const [shexData, setShexData] = useState({});
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

    let formData = {};

    const fillShexJData = useCallback(async (rootShape: Object, document) => {
        const shape = shapes.find(shape => shape.id.includes(rootShape.id));

        if (shape.expression) {
            for await (let expression of shape.expression.expressions) {
                for await (let predicateValue of document[
                    expression.predicate
                ]) {
                    const idAttribute =
                        rootShape.parentLink || expression.predicate;

                    if (formData[idAttribute]) {
                        if (Array.isArray(formData[idAttribute].value) && formData[idAttribute].value.length === 1 ) {
                          formData[idAttribute] = {
                            value: [{ predicate: formData[idAttribute].predicate, value: formData[idAttribute].value[0]}]
                          }
                        }
                        formData[idAttribute] = {
                            ...formData[idAttribute],
                            value: [
                              ...formData[idAttribute].value,
                              {
                                predicate: expression.predicate,
                                value: predicateValue.value
                              }
                            ],
                        };
                    } else {
                        /// const value = expression.valueExpr === 'string' ?
                        formData = {
                            ...formData,
                            [idAttribute]: {
                                link:
                                    typeof expression.valueExpr === 'string' ||
                                    null,
                                predicate: expression.predicate,
                                value: [predicateValue.value],
                            },
                        };
                    }
                }

                if (typeof expression.valueExpr === 'string') {
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
            }

            return formData;
        }
    });

    const toShexJS = useCallback(async () => {
        const shexString = await fetchShex();
        const parser = shexParser.construct(window.location.href);
        const podDocument = await fetchDocument();
        const shexJ = shexCore.Util.AStoShExJ(parser.parse(shexString));

        shapes = shexJ.shapes;

        if (shapes.length > 0) {
            const newShex = await fillShexJData(
                { id: 'UserProfile' },
                podDocument
            );

            setShexData(newShex);
        }
        setShexData(shexJ);
    });

    useEffect(() => {
        toShexJS();
    }, [root, documentUri]);

    return {
        shexData,
    };
};
