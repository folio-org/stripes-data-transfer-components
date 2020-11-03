import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { mount } from '../../../test/bigtest/helpers';
import { Preloader } from '../Preloader';
import { PreloaderInteractor } from './interactor';

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
      expect(preloader.spinner.isPresent).to.be.true;
    });

    it('should display spinner of "large" size by default', () => {
      const style = 'width: 60px; height: 30px;';

      expect(preloader.spinner.style).to.equal(style);
    });

    it('should include "flex centerContent" class by default', () => {
      expect(preloader.className).to.include('flex').and.to.include('centerContent');
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

  describe('rendering Preloader with size', () => {
    beforeEach(async () => {
      await mount(
        <Preloader size="medium" />
      );
    });

    it('should render a spinner of provided size', () => {
      const style = 'width: 30px; height: 15px;';

      expect(preloader.spinner.style).to.equal(style);
    });
  });

  describe('rendering Preloader with custom class name', () => {
    beforeEach(async () => {
      await mount(
        <Preloader preloaderClassName="customClassname" />
      );
    });

    it('should include custom class name', () => {
      expect(preloader.className)
        .to.include('flex')
        .and.to.include('centerContent')
        .and.to.include('customClassname');
    });
  });
});
