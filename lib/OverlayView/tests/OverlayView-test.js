import React from 'react';
import { expect } from 'chai';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { Interactor } from '@bigtest/interactor';

import { OverlayViewInteractor } from './interactor';
import { OverlayView } from '../OverlayView';
import { mountWithContext } from '../../../test/bigtest/helpers';

describe('OverlayView', () => {
  const headerInteractor = new Interactor('#header_id');
  const contentInteractor = new Interactor('#content_id');
  const overlayViewInteractor = new OverlayViewInteractor();

  describe('rendering OverlayView with existing header tag', () => {
    beforeEach(async () => {
      await mountWithContext(
        <>
          <header id="header_id" />
          <OverlayView>
            <span id="content_id" />
          </OverlayView>
        </>
      );
    });

    it('should hide header', () => {
      expect(headerInteractor.isVisible).to.be.false;
    });

    it('should display overlay view', () => {
      expect(overlayViewInteractor.isPresent).to.be.true;
    });

    it('should display overlay view content', () => {
      expect(contentInteractor.isPresent).to.be.true;
    });
  });

  describe('rendering OverlayView without existing header tag', () => {
    beforeEach(async () => {
      await mountWithContext(<OverlayView>Text</OverlayView>);
    });

    it('should display overlay view', () => {
      expect(overlayViewInteractor.isPresent).to.be.true;
    });
  });
});
