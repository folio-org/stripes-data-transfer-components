import React from 'react';

import { mountWithContext } from './mountWithContext';

export const getHookExecutionResult = (hook, hookArguments = [], translations = []) => {
  const result = {};
  const TestComponent = () => {
    Object.assign(result, hook(...hookArguments));

    return null;
  };

  mountWithContext(<TestComponent />, translations);

  return result;
};
