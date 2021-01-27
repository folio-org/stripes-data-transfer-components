import React from 'react';
import ReactDOM from 'react-dom';

import { Harness } from '../../helpers';
import { getCleanTestingRoot } from './getCleanTestingRoot';

export function mountWithContext(component, translations = [], stripes) {
  return new Promise(resolve => {
    ReactDOM.render(
      <Harness
        translations={translations}
        shouldMockOffsetSize={false}
        stripes={stripes}
      >
        {component}
      </Harness>,
      getCleanTestingRoot(),
      resolve
    );
  });
}
