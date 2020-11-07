import React from 'react';
import { render } from '@testing-library/react';

import { Harness } from '../../helpers';

export const renderWithIntl = (children, translations = []) => render(
  <Harness translations={translations}>
    {children}
  </Harness>
);
