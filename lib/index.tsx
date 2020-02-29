import React, { useState, useMemo, useCallback } from 'react';

import * as utils from './utils';

import Slider from './components/Slider';
import Nav from './components/Nav';
import View from './components/View';

interface PageSliderProps {
  compList: (React.ReactNode | utils.CompFunc)[];
  horizontal: boolean;
  actionFlagTime: number;
  sensitivity: number;
  navigation: {
    type?: 'top' | 'bottom' | 'right' | 'left';
    hide?: boolean;
    timer?: number;
    size?: number;
    unit?: 'px' | 'em' | 'rem' | 'vh' | 'vw' | '%';
  };
}

function Test({
  compList,
  horizontal,
  actionFlagTime,
  sensitivity,
  navigation,
}: PageSliderProps) {
  const [position, setPosition] = useState<number>(0);
  const limit = useMemo(() => compList.length - 1, [compList.length]);

  const navOptions = useMemo(
    () => ({
      type: navigation.type || 'bottom',
      hide: navigation.hide || false,
      timer: navigation.timer || 200,
      size: navigation.size || 16,
      unit: navigation.unit || 'px',
    }),
    [navigation],
  );

  const setPositionNormal = useCallback(
    (type: boolean) => {
      if (type && position < limit) setPosition(position + 1);
      if (!type && position > 0) setPosition(position - 1);
    },
    [limit, position],
  );
  const setPositionForced = useCallback(
    (index: number) => {
      if (index >= 0 && index <= limit) setPosition(index);
    },
    [limit],
  );

  return (
    <Slider
      setPositionNormal={setPositionNormal}
      horizontal={horizontal}
      actionFlagTime={actionFlagTime}
      sensitivity={sensitivity}
    >
      {navigation.type && (
        <Nav
          setPositionForced={setPositionForced}
          index={limit}
          position={position}
          options={navOptions}
        />
      )}
      <View compList={compList} horizontal={horizontal} position={position} />
    </Slider>
  );
}

Test.defaultProps = {
  horizontal: false,
  actionFlagTime: 500,
  sensitivity: 100,
  navigation: { type: 'bottom', hide: false, timer: 200, size: 16, unit: 'px' },
};

export default Test;
