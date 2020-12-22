import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { Progress } from '../Progress';
import { ProgressInteractor } from './interactor';
import { PreloaderInteractor } from '../../Preloader/tests/interactor';
import { mountWithContext } from '../../../test/bigtest/helpers';

describe('Progress', () => {
  const progress = new ProgressInteractor();
  const preloader = new PreloaderInteractor();
  const currentValue = 10;
  const totalValue = 100;

  describe('rendering Progress with default properties', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Progress
          current={currentValue}
          total={totalValue}
        />
      );
    });

    it('should display progress component', () => {
      expect(progress.isPresent).to.be.true;
    });

    it('should display correct current progress position', () => {
      expect(progress.currentProgressStyles.width).to.equal(`${totalValue / currentValue}%`);
    });

    it('should display correct progress info', () => {
      expect(progress.progressInfoText).to.equal(`${totalValue / currentValue}%`);
    });
  });

  describe('rendering Progress with "messagedPercentage" progress info type', () => {
    const testMessage = 'TestMessage';

    beforeEach(async () => {
      await mountWithContext(
        <Progress
          current={currentValue}
          total={totalValue}
          progressInfoType="messagedPercentage"
          payload={{ message: testMessage }}
        />
      );
    });

    it('should display progress component', () => {
      expect(progress.isPresent).to.be.true;
    });

    it('should display correct progress info', () => {
      expect(progress.progressInfoText).to.equal(`${testMessage} ${totalValue / currentValue}%`);
    });

    it('should not display preloader', () => {
      expect(preloader.isPresent).to.be.false;
    });
  });

  describe('rendering Progress with "messagedPercentage" progress and full progress', () => {
    const testMessage = 'TestMessage';

    beforeEach(async () => {
      await mountWithContext(
        <Progress
          current={totalValue}
          total={totalValue}
          progressInfoType="messagedPercentage"
          payload={{ message: testMessage }}
        />
      );
    });

    it('should display progress component', () => {
      expect(progress.isPresent).to.be.true;
    });

    it('should not display progress message and percentages', () => {
      expect(progress.progressInfoText).to.not.equal(`${testMessage} ${totalValue / currentValue}%`);
    });

    it('should display preloader', () => {
      expect(preloader.isPresent).to.be.true;
    });
  });

  describe('rendering Progress with "none" progress', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Progress
          current={currentValue}
          total={totalValue}
          progressInfoType="none"
        />
      );
    });

    it('should display progress component', () => {
      expect(progress.isPresent).to.be.true;
    });

    it('should not display progress message and percentages', () => {
      expect(progress.progressInfoText).to.be.empty;
    });

    it('should not display preloader', () => {
      expect(preloader.isPresent).to.be.false;
    });
  });
});
