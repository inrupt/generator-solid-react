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
        async (rootShape: Object, document, parentExpression: Object) => {
            const shape = shapes.find(shape => shape.id.includes(rootShape.id));
            let expressions = [];
            let newParentExpression = null;

            for await (let expression of shape.expression.expressions) {
                expression._formValues = [];
                if ( typeof expression.valueExpr === 'string') {
                  const newRootShape = {
                    parentShapeId: rootShape.id,
                    id: expression.valueExpr,
                    predicate: expression.predicate
                  };
                  return fillShexJData(newRootShape, document[expression.predicate], shape.expression.expressions);
                }

                for await (let predicateValue of document[expression.predicate] ) {
                  if (rootShape.parentShapeId) {

                    newParentExpression = parentExpression.find(pre => pre.predicate === rootShape.predicate);
                    newParentExpression = {
                      ...newParentExpression,
                      _formValues: [...newParentExpression._formValues, predicateValue.value]
                    }
                    // console.log(newParentExpression, 'new ex');
                  } else {
                    expression._formValues.push(predicateValue.value);
                  }
                }

                expressions = [...expressions, expression];
            }

            if (newParentExpression) {

              const newShapes = shapes.map(shape => {
                if (shape.id.includes(rootShape.parentShapeId)) {
                  return {
                    ...shape,
                    expression : shape.expression.expressions.map(sh => {
                      // console.log(sh.predicate, newParentExpression, 'into other map');
                      if ( sh.predicate === newParentExpression.predicate) {
                        return newParentExpression
                      }
                      return sh;
                    }),
                  };
                }

                return shape;
              });

              console.log(newShapes, 'new shapes');

              return { ...shexData, shapes: newShapes };

            }

            const newShapes = shapes.map(shape => {
                if (shape.id.includes(rootShape.id)) {
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

        shapes = shexJ.shapes;

        if (shapes.length > 0) {
          const newShex = await fillShexJData(
            { id : 'UserProfile'},
            podDocument
          );
          return setShexData({...shexJ, ...newShex});
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
