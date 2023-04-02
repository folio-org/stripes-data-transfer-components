import React from 'react';
import ReactDOM from 'react-dom';

import { Harness } from './index';
import { getCleanTestingRoot } from './getCleanTestingRoot';

export function mountWithContext(component, translations = [], stripes) {
  return new Promise(resolve => {
    ReactDOM.render(
      <Harness
        translations={translations}
        stripes={stripes}
      >
        {component}
      </Harness>,
      getCleanTestingRoot(),
      resolve
    );
  });
}
