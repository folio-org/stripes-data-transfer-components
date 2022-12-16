import React from 'react';

import '../../../../test/jest/__mock__';
import { renderWithIntl } from '../../../../jestUtils';

import { DateColumn } from './DateColumn';

const renderDateColumn = value => {
  const component = (
    <DateColumn value={value} />
  );

  return renderWithIntl(component);
};

describe('DateColumn', () => {
  it('should be rendered', () => {
    const { getByText } = renderDateColumn('2021-08-24T13:36:06.537+00:00');

    expect(getByText('8/24/2021')).toBeDefined();
  });
});
