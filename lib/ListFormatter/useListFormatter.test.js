import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { IntlProvider } from 'react-intl';

import '../../test/jest/__mock__';

import { useListFormatter } from './useListFormatter';
import { useMappingProfileListFormatter } from '../Settings';

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

describe('useListFormatter', () => {
  const {
    name,
    userInfo: {
      firstName,
      lastName,
      userName,
    },
  } = record;


  const wrapper = ({ children }) => (
    <IntlProvider locale="en">
      {children}
    </IntlProvider>
  );

  const customFormatters = { userName: item => item.userInfo.userName };
  const { result } = renderHook(() => useMappingProfileListFormatter(customFormatters), { wrapper });

  it('should format name field value correctly', () => {
    expect(result.current.name(record)).toBe(name);
  });

  it('should format updatedBy field correctly', () => {
    expect(result.current.updatedBy(record)).toBe(`${firstName} ${lastName}`);
  });

  it('should format empty updatedBy field correctly', () => {
    expect(result.current.updatedBy({})).toBe('');
  });

  it('should format completed date field value correctly', () => {
    expect(result.current.updated(record)).toBe('2018-12-04');
  });

  it('should add custom orders to formatter - userName', () => {
    expect(result.current.userName(record)).toBe(userName);
  });
});
