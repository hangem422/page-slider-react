import React, { useEffect, useState, useMemo, useCallback } from 'react';
import classnames from 'classnames';

interface NavProps {
  index: number;
  position: number;
  options: {
    type: 'top' | 'bottom' | 'right' | 'left' | 'none';
    hide: boolean;
    timer: number;
    size: number;
    unit: 'px' | 'em' | 'rem' | 'vh' | 'vw' | '%';
  };
  setPositionForced: (index: number) => void;
}

function Nav({ index, position, options, setPositionForced }: NavProps) {
  const [hide, setHide] = useState(options.hide);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);

  const showNav = useCallback(() => {
    if (options.hide) {
      setHide(false);
      setHideTimer(setTimeout(() => setHide(true), options.timer));
    }
  }, [options.hide, options.timer]);

  const buttons = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= index; i += 1) {
      arr.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={classnames('nav-button', { highlight: i === position })}
          key={`nav-button${i}`}
          onClick={() => setPositionForced(i)}
        >
          <circle cx="12" cy="12" r="12" />
        </svg>,
      );
    }
    return arr;
  }, [index, position, setPositionForced]);

  useEffect(() => {
    showNav();
  }, [showNav, position]);

  useEffect(() => {
    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  });

  return (
    <div
      className={classnames('page-slider-nav', options.type, { hide })}
      style={{ fontSize: options.size + options.unit }}
    >
      {buttons}
    </div>
  );
}

export default Nav;
