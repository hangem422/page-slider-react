# React Page Slider

> Full Screen React Page slider. Navigational bars, mouse wheels, and mobile touch are available. Supports asynchronous rendering of various types of components.

![react-page-slider-sample](https://user-images.githubusercontent.com/46883562/75833202-a5ea6d80-5dfb-11ea-8cac-bbf615c68600.gif)

## Usage

#### installing

```zsh
$ npm install page-slider-react
```

#### Conditions

- `page-slider-react` must always be in a component that is `100%` `width` and `height`.
- `Css` embedded in `page-slider-react` contains code for adjusting the `height` of the elements to `100%`.

```css
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
#root,
.App {
  height: 100%;
}
```

#### Example

###### TestComp.js

```JSX
import React from 'react';

function TestComp01() {
  return <div className="test-comp">Test Component</div>;
}

export default TestComp01;
```

###### App.js

```JSX
import React from 'react';
import { PageSlider } from 'page-slider-react';

import TestComp from './components/TestComp';

function App() {
  const compList = [
    TestComp, // Functional Component
    <TestComp />, // React Node
    () => TestComp, // Function that returns Functional Component
    async () => { // Asynchronous function that returns Functional Component
      await new Promise(resolve => setTimeout(resolve, 2000));
      return TestComp;
    },
    () => import('./components/TestComp'), // Dynamic Import
  ];

  return (
    <div className="App">
      <PageSlider compList={compList} />
    </div>
  );
}
```

## Options

#### compList

List of compositions to show on the slider. It is an essential Property.

#### horizontal

If this value is `true` then the horizontal slider is created, and if `false` then the vertical slider is created. Default value is `false`.

#### actionFlagTime

Specifies the time between slide actions. The smaller the value, the shorter the time between the action and the action. If this value is too short, two actions can be taken at a time of scrolling. Default value is `500`.

#### sensitivity

Adjust sensitivity for mouse scrolling and mobile touch. The smaller the number, the more sensitive. Default value is `80`.

#### navigation

Specify detailed settings for the navigation bar.

- **type:** Specify locate of navigation bar. Enter either `top`, `right`, `bottom`, `left`, or `none`. If you type `none`, the navigation bar is not visible. Default value is `none`.
- **hide:** Make the navigation bar invisible when not in use. Default value is `false`.
- **timer:** Set the time navigation bar is displayed when the `hide` is `true`. The unit is milliseconds. Default value is `2000`.
- **size:** Specify the size of navigation bar. Style unit is internally used `em`, navigation bar is resized to match the changes of this value. Default value is `16`.
- **unit:** It is a unit of size. Enter either `px`, `em`, `rem`, `vh`, `vw` or `'%'`. Default value is `px`.

```JSX
<PageSlider
  compList={compList}
  horizontal={false}
  actionFlagTime={500}
  sensitivity={100}
  navigation={{
    type: 'right',
    hide: true,
    timer: 2000,
    size: 16,
    unit: 'px',
  }}
/>
```

## Demo Deploy

```zsh
$ npm install
$ npm run build
$ npm run build:types
$ cd example
$ npm install
$ npm start
```
