import React, { useCallback, useState, useEffect } from 'react';
import * as shexParser  from '@shexjs/parser';


export const useShex = (root, documentUri) => {

  const [shexData, setShexData] = useState({});

  const fetchShex = async () => {
    const rootShex = await fetch(root);

    setShexData(rootShex);
  }

  const fetchDocument = () => {}

  const toShexJS = async () => {
    await fetchShex();
    console.log(shexParser, 'object');
    const parser = shexParser.construct(window.location.href);
    const shexJ = parser.parse(shexData);

    console.log(shexJ, 'ToShexJ');
  };

  useEffect( () => {
    toShexJS();
  }, [root, documentUri]);

  return {
    shexData
  };

}
