import React from 'react';

import '../../../test/jest/__mock__';

import { renderWithIntl } from '../../../test/jest/helpers';
import { EndOfItem } from '../EndOfItem';

const setupEndOfItem = ({
  title,
  className,
} = {}) => renderWithIntl(
  <EndOfItem
    title={title}
    className={className}
  />,
  [{
    prefix: 'stripes-components',
    translations: { endOfList: 'endOfList' },
  }]
);

describe('EndOfItem', () => {
  const customClass = 'my-class';

  describe('rendering EndOfItem with custom props', () => {
    const title = 'Title';

    beforeEach(() => setupEndOfItem({
      title,
      className: customClass,
    }));

    it('should add custom class style to layout container', () => {
      const layout = document.querySelector('[data-test-layout]');

      expect(layout.classList.contains(customClass)).toBeTruthy();
    });

    it('should display "end mark" svg icon', () => {
      const icon = document.querySelector('[data-test-icon-element]');
      const hasIconEndMarkClass = icon.classList.contains('icon-end-mark');

      expect(icon).toBeInTheDocument();
      expect(hasIconEndMarkClass).toBeTruthy();
    });

    it('should display passed title', () => {
      const label = document.querySelector('span.label');

      expect(label.innerHTML).toEqual(title);
    });
  });

  describe('rendering EndOfItem without properties', () => {
    beforeEach(() => setupEndOfItem());

    it('should display default title', () => {
      const label = document.querySelector('span.label');

      expect(label.innerHTML).toEqual('endOfList');
    });
  });
});
