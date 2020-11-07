import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../test/bigtest/helpers';
import { Preloader } from '../Preloader';
import { PreloaderInteractor } from './interactor';

describe('Preloader', () => {
  const preloader = new PreloaderInteractor();

  describe('rendering Preloader', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Preloader />
      );
    });

    it('should display preloader', () => {
      expect(preloader.isPresent).to.be.true;
    });

    it('should display spinner', () => {
      expect(preloader.spinner.isPresent).to.be.true;
    });
  });

  describe('rendering Preloader with message', () => {
    const preloaderMessage = 'Preloader message';

    beforeEach(async () => {
      await mountWithContext(
        <Preloader message={preloaderMessage} />
      );
    });

    it('should contain provided message', () => {
      expect(preloader.text).to.equal(preloaderMessage);
    });
  });

  describe('rendering Preloader with custom CSS class', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Preloader preloaderClassName="customClassname" />
      );
    });

    it('should include custom CSS class', () => {
      expect(preloader.$root.className).and.to.include('customClassname');
    });
  });
});
