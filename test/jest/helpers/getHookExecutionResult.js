import React from 'react';

import { renderWithIntl } from './renderWithIntl';

export const getHookExecutionResult = (hook, hookArguments = []) => {
  const result = {};
  const TestComponent = () => {
    Object.assign(result, hook(...hookArguments));

    return null;
  };

  renderWithIntl(<TestComponent />);

  return result;
};
