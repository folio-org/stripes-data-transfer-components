import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { CheckboxHeader } from './CheckboxHeader';

const onChangeMock = jest.fn();

const renderCheckboxHeader = (checked, onChange) => {
  const component = (
    <CheckboxHeader
      checked={checked}
      onChange={onChange}
    />
  );

  return render(component);
};

describe('CheckboxHeader', () => {
  afterEach(() => {
    onChangeMock.mockClear();
  });

  it('should be rendered', () => {
    const { container } = renderCheckboxHeader();
    const checkbox = container.querySelector('.input');

    expect(checkbox).toBeDefined();
  });

  describe('when clicking on checkbox', () => {
    it('onChange event should be called', () => {
      const { container } = renderCheckboxHeader(false, onChangeMock);
      const checkbox = container.querySelector('.input');

      fireEvent.click(checkbox);

      expect(onChangeMock.mock.calls).toHaveLength(1);
    });
  });
});
