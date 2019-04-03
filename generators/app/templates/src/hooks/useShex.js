import React, { useCallback, useState, useEffect } from 'react';
import data from '@solid/query-ldflex';
import shexParser from '@shexjs/parser';
import shexCore from '@shexjs/core';

export const useShex = (root: String, documentUri: String) => {
    const [shexData, setShexData] = useState({});

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

    const fillShexJData = useCallback(
        async (shapes: Array<Object>, shapeId: String, document) => {
            const shape = shapes.find(shape => shape.id === shapeId);
            let expressions = [];
            console.log(shape, 'shape');
            for await (let expression of shape.expression.expressions) {
                expression._formValues = [];
                /* if ( typeof expression.valueExpr === 'string') {
            // return fillShexJData(expression.valueExpr, expression.predicate, document);
          } */

                const predicateValue = await document[expression.predicate];

                expression._formValues.push(predicateValue.value);

                expressions = [...expressions, expression];
            }

            // const parentExpresion = {...shape.expression, expressions};
            // const newShape = {...shape, expression: {...shape.expression, expressions}};
            const newShapes = shapes.map(shape => {
                if (shape.id === shapeId) {
                    return {
                        ...shape,
                        expressions,
                    };
                }
            });

            return { ...shexData, shapes: newShapes };
        }
    );

    const toShexJS = useCallback(async () => {
        const shexString = await fetchShex();
        const parser = shexParser.construct(window.location.href);
        const podDocument = await fetchDocument();
        const shexJ = shexCore.Util.AStoShExJ(parser.parse(shexString));
        console.log(newShex, shexJ, 'hello');
        const newShex = await fillShexJData(
            shexJ.shapes,
            'https://localhost:3001/profile#UserProfile',
            podDocument
        );

        setShexData(shexJ);
    });

    useEffect(() => {
        toShexJS();
    }, [root, documentUri]);

    return {
        shexData,
    };
};
