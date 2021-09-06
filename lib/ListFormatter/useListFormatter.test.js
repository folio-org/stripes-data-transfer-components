import React from 'react';
import { render } from '@testing-library/react';

import '../../test/jest/__mock__';
import '../../test/jest/__new_mock__';

import { useListFormatter } from './useListFormatter';

const record = {
  id: '1737d899-6fb9-44f4-ba16-9a8b111cd61d',
  name: 'AP holdings-MARC Bib',
  description: 'Use for PurpleVendor approval plan MARC files',
  userInfo: {
    firstName: 'John',
    lastName: 'M',
    userName: 'john_m',
  },
  metadata: { updatedDate: '2018-12-04T09:05:30.000+0000' },
};

const getHookExecutionResult = (hook, hookArguments = []) => {
  const result = {};
  const TestComponent = () => {
    Object.assign(result, hook(...hookArguments));

    return null;
  };

  render(<TestComponent />);

  return result;
};

describe('useListFormatter', () => {
  const {
    name,
    userInfo: {
      firstName,
      lastName,
      userName,
    },
  } = record;

  const customFormatters = { userName: item => item.userInfo.userName };
  const listFormatter = getHookExecutionResult(useListFormatter, [customFormatters]);

  it('should format name field value correctly', () => {
    expect(listFormatter.name(record)).toBe(name);
  });

  it('should format updatedBy field correctly', () => {
    expect(listFormatter.updatedBy(record)).toBe(`${firstName} ${lastName}`);
  });

  it('should format empty updatedBy field correctly', () => {
    expect(listFormatter.updatedBy({})).toBe('');
  });

  it('should format completed date field value correctly', () => {
    expect(listFormatter.updated(record)).toBe('2018-12-04');
  });

  it('should add custom orders to formatter - userName', () => {
    expect(listFormatter.userName(record)).toBe(userName);
  });
});
