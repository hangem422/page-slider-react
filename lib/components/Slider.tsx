import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';

interface SliderProps {
  horizontal: boolean;
  actionFlagTime: number;
  sensitivity: number;
  children: React.ReactNode;
  setPositionNormal: (type: boolean) => void;
}

function Slider({
  horizontal,
  actionFlagTime,
  sensitivity,
  children,
  setPositionNormal,
}: SliderProps) {
  const [xy, setXy] = useState<number[]>([]);
  const [actionFlag, setActionFlag] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const wheelCallback = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (actionFlag) return;
      if (Math.abs(e.deltaX) < sensitivity && Math.abs(e.deltaY) < sensitivity)
        return;

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && horizontal) {
        if (e.deltaX > 0) setPositionNormal(true);
        if (e.deltaX < 0) setPositionNormal(false);
      }
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && !horizontal) {
        if (e.deltaY > 0) setPositionNormal(true);
        if (e.deltaY < 0) setPositionNormal(false);
      }

      setActionFlag(true);
      setTimer(setTimeout(() => setActionFlag(false), actionFlagTime));
    },
    [actionFlag, actionFlagTime, horizontal, sensitivity, setPositionNormal],
  );

  const touchStartCallback = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches && e.touches.length > 1) return;
      const { clientX, clientY } = e.touches[0];
      setXy([clientX, clientY]);
    },
    [],
  );

  const touchEndCallback = useCallback(() => {
    setActionFlag(false);
    setXy([]);
  }, []);

  const touchMoveCallback = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (actionFlag) return;
      if (xy.length < 2) return;
      const { clientX, clientY } = e.touches[0];
      const deltaX = xy[0] - clientX;
      const deltaY = xy[1] - clientY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (horizontal && absX > absY && absX > sensitivity) {
        if (deltaX > 0) setPositionNormal(true);
        if (deltaX < 0) setPositionNormal(false);
        setActionFlag(true);
      }
      if (!horizontal && absX < absY && absY > sensitivity) {
        if (deltaY > 0) setPositionNormal(true);
        if (deltaY < 0) setPositionNormal(false);
        setActionFlag(true);
      }
    },
    [actionFlag, horizontal, sensitivity, setPositionNormal, xy],
  );

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  return (
    <div
      className={classnames(
        'page-slider',
        { horizontal },
        { vertical: !horizontal },
      )}
      onWheel={wheelCallback}
      onTouchStart={touchStartCallback}
      onTouchEnd={touchEndCallback}
      onTouchMove={touchMoveCallback}
    >
      {children}
    </div>
  );
}

export default Slider;
