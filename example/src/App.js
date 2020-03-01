import React, { useMemo } from 'react';
import { PageSlider } from '@hant/react-page-slider';

import TestComp01 from './components/TestComp01';
import TestComp02 from './components/TestComp02';
import TestComp03 from './components/TestComp03';
import TestComp04 from './components/TestComp04';
import TestComp05 from './components/TestComp05';

function App() {
  const compList = useMemo(
    () => [
      TestComp01,
      TestComp02,
      <TestComp03 />,
      () => TestComp04,
      async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return TestComp05;
      },
      () => import('./components/TestComp06'),
    ],
    [],
  );

  return (
    <div className="App">
      <PageSlider
        compList={compList}
        navigation={{ type: 'right', hide: false, size: 16 }}
      />
    </div>
  );
}

export default App;
