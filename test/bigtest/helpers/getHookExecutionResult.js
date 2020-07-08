import React from 'react';

import { mountWithContext } from './mountWithContext';

export const getHookExecutionResult = (hook, hookArguments = []) => {
  const result = {};
  const TestComponent = () => {
    Object.assign(result, hook(...hookArguments));

    return null;
  };

  mountWithContext(<TestComponent />);

  return result;
};
