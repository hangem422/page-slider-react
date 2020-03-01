import React, { useMemo } from 'react';
import { PageSlider } from '@hant/react-page-slider';

import TestComp01 from './examples/TestComp01';
import TestComp02 from './examples/TestComp02';
import TestComp03 from './examples/TestComp03';
import TestComp04 from './examples/TestComp04';
import TestComp05 from './examples/TestComp05';

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
      () => import('./examples/TestComp06'),
    ],
    [],
  );

  return (
    <div className="App">
      <PageSlider
        compList={compList}
        navigation={{ type: 'bottom', hide: false, size: 16 }}
      />
    </div>
  );
}

export default App;
