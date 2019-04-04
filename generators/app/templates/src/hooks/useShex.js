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

    const fillShexJData = useCallback(
        async (rootShape: Object, document) => {
            const shape = shapes.find(shape => shape.id.includes(rootShape.id));
            let expressions = [];
            if (shape.expression) {
              for await (let expression of shape.expression.expressions) {
                expression._formValues = [];
                if (typeof expression.valueExpr === 'string') {

                  await fillShexJData({ id: expression.valueExpr }, document[expression.predicate]);
                }

                for await (let predicateValue of document[expression.predicate]) {
                  expression._formValues.push(predicateValue.value);
                }

                expressions = [...expressions, expression];
              }


              const newShapes = shapes.map(shape => {
                if (shape.id.includes(rootShape.id)) {
                  return {
                    ...shape,
                    expressions,
                  };
                }
              });

              setShexData({ ...shexData, shapes: newShapes });
            }
        }
    );

    const toShexJS = useCallback(async () => {
        const shexString = await fetchShex();
        const parser = shexParser.construct(window.location.href);
        const podDocument = await fetchDocument();
        const shexJ = shexCore.Util.AStoShExJ(parser.parse(shexString));

        shapes = shexJ.shapes;

        if (shapes.length > 0) {
          await fillShexJData(
            { id : 'UserProfile'},
            podDocument
          );

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
