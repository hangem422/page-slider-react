/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import * as utils from '../utils';

interface ViewProps {
  compList: (React.ReactNode | utils.CompFunc)[];
  horizontal: boolean;
  position: number;
}

function View({ compList, horizontal, position }: ViewProps) {
  const [init, setInit] = useState<React.ReactNode[]>(
    new Array(compList.length).fill(null),
  );
  const [temp, setTemp] = useState<{
    result: React.ReactNode;
    index: number;
  }>();
  const [items, setItems] = useState<React.ReactNode>([]);

  useEffect(() => {
    const newInit = [...init];
    compList.forEach(
      (comp: React.ReactNode | utils.CompFunc, index: number) => {
        if (typeof comp === 'object') newInit[index] = comp;
        else if (typeof comp === 'function')
          utils
            .initComp(comp as utils.CompFunc)
            .then(result => setTemp({ result, index }));
        else console.error(`The ${index}th component format is not correct.`);
      },
    );
    setInit(newInit);
  }, [compList]);

  useEffect(() => {
    if (temp) {
      const newInit = [...init];
      newInit[temp.index] = temp.result;
      setInit(newInit);
    }
  }, [temp]);

  useEffect(() => {
    const getStyleFunc = horizontal
      ? utils.getPositionHoriziontal
      : utils.getPositionVertical;
    setItems(
      init.map((value, index) => {
        return (
          <div
            key={`page-slider-item${index}`}
            className="page-slider-item"
            style={getStyleFunc(index, position)}
          >
            {value}
          </div>
        );
      }),
    );
  }, [horizontal, init, position]);

  return <>{items}</>;
}

export default View;
