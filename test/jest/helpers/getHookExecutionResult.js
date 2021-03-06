import React from 'react';
import { isFunction } from 'lodash';

import { renderWithIntl } from './renderWithIntl';

export const getHookExecutionResult = (hook, hookArguments = [], translations = []) => {
  let result = {};
  const TestComponent = () => {
    const hookResult = hook(...hookArguments);

    if (isFunction(hookResult)) {
      result = hookResult;
    } else {
      Object.assign(result, hookResult);
    }

    return null;
  };

  renderWithIntl(<TestComponent />, translations);

  return result;
};
