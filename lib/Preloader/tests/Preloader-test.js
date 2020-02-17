import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { mount } from '../../../test/bigtest/helpers';
import Preloader from '../Preloader';
import PreloaderInteractor from './interactor';

describe('Preloader', () => {
  const preloader = new PreloaderInteractor();

  describe('rendering Preloader', () => {
    beforeEach(async () => {
      await mount(
        <Preloader />
      );
    });

    it('should display preloader', () => {
      expect(preloader.isPresent).to.be.true;
    });

    it('should display spinner', () => {
      expect(preloader.isSpinnerPresent).to.be.true;
    });
  });

  describe('rendering Preloader with message', () => {
    const preloaderMessage = 'Preloader message';

    beforeEach(async () => {
      await mount(
        <Preloader message={preloaderMessage} />
      );
    });

    it('should contain provided message', () => {
      expect(preloader.text).to.equal(preloaderMessage);
    });
  });
});
