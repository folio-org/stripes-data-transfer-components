import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { CheckboxColumn } from './CheckboxColumn';

const onChangeMock = jest.fn();

const renderCheckboxColumn = (value, checked, onChange) => {
  const component = (
    <CheckboxColumn
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );

  return render(component);
};

describe('CheckboxColumn', () => {
  afterEach(() => {
    onChangeMock.mockClear();
  });

  it('should be rendered', () => {
    const { container } = renderCheckboxColumn('test value');
    const checkbox = container.querySelector('.input');

    expect(checkbox).toBeDefined();
  });

  describe('when clicking on checkbox', () => {
    it('onChange event should be called with value', () => {
      const { container } = renderCheckboxColumn('test value', false, onChangeMock);
      const checkbox = container.querySelector('.input');

      fireEvent.click(checkbox);

      expect(onChangeMock.mock.calls[0][0]).toEqual('test value');
    });
  });
});
