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

    let shexDataG = {};

    const fillShexJData = useCallback(
        async (rootShape: Object, document) => {
            const shape = shapes.find(shape => shape.id.includes(rootShape.id));
            let expressions = [];
            if (shape.expression) {
              for await (let expression of shape.expression.expressions) {
                expression._formValues = [];
                console.log(shape, rootShape, 'child');
                if (typeof expression.valueExpr === 'string') {
                  const newRootShape = {
                    id: expression.valueExpr,
                    parentRootId: rootShape.id,
                    predicate: expression.predicate
                  };
                  await fillShexJData(newRootShape, document[expression.predicate]);
                }

                for await (let predicateValue of document[expression.predicate]) {
                  expression._formValues.push(predicateValue.value);
                  console.log(predicateValue.value);
                }

                if (! rootShape.parentRootId) {
                  expressions = [...expressions, expression];
                } else {
                  if (shexDataG.shapes) {
                    // console.log(shexDataG, 'into');
                    const newShex = shexDataG.shapes.map(shex => {
                      if (shex.id.includes(rootShape.parentRootId)) {
                        // console.log(shex);
                        return {
                          ...shex,
                          expression: {
                            expressions: shex.expression.expressions.map(exp => {
                              // if (exp.predicate === 'http://www.w3.org/2006/vcard/ns#hasEmail') console.log(exp, expression);
                              if (exp.predicate === rootShape.predicate) {
                                return { ...exp, _formValues: [...exp._formValues, ...expression._formValues]};
                              }
                              return exp;
                            })
                          }
                        };
                      }
                      return shex;
                    });
                    // console.log(newShex, 'new');
                    shexDataG = { ...shexData, shapes: newShex };
                  }
                }
              }


              const newShapes = shapes.map(shape => {
                if (shape.id.includes(rootShape.id)) {
                  return {
                    ...shape,
                    expressions,
                  };
                }
                return shape;
              });

              return shexDataG = { ...shexData, shapes: newShapes };
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
          const newShex = await fillShexJData(
            { id : 'UserProfile'},
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
