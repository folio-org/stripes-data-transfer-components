import React from 'react';
import { getByText } from '@testing-library/react';

import '../../../test/jest/__mock__';

import { renderWithIntl } from '../../../test/jest/helpers';
import { Preloader } from '../Preloader';

describe('Preloader', () => {
  describe('rendering Preloader with default props', () => {
    beforeEach(() => renderWithIntl(<Preloader />));

    it('should display spinner', () => {
      const spinner = document.querySelector('.spinner');

      expect(spinner).toBeInTheDocument();
    });

    it('should include be centered by default', () => {
      const preloader = document.querySelector('[data-test-preloader]');

      expect(preloader).toHaveClass('centerContent');
    });
  });

  describe('rendering Preloader with custom props', () => {
    const preloaderMessage = 'Preloader message';
    const preloaderClassName = 'customClassname';

    beforeEach(() => renderWithIntl(
      <Preloader
        message={preloaderMessage}
        preloaderClassName={preloaderClassName}
      />
    ));

    it('should contain provided message when rendering Preloader with message', () => {
      const preloader = document.querySelector('[data-test-preloader]');

      expect(getByText(preloader, preloaderMessage)).toBeVisible();
    });

    it('should include custom class name when rendering Preloader with custom class name', () => {
      const preloader = document.querySelector('[data-test-preloader]');

      expect(preloader).toHaveClass(preloaderClassName);
    });
  });
});
