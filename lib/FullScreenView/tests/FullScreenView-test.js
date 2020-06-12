import React from 'react';
import noop from 'lodash';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';

import { mountWithContext } from '../../../test/bigtest/helpers';
import { FullScreenViewInteractor } from './interactor';
import { FullScreenView } from '../FullScreenView';

async function setupFullScreenView({
  paneTitle = 'Pane title',
  handleCancel = noop,
  children,
}, translations) {
  await mountWithContext(
    <FullScreenView
      data-test-full-screen-view
      paneTitle={paneTitle}
      onCancel={handleCancel}
    >
      {children}
    </FullScreenView>,
    translations
  );
}

describe('FullScreenView', () => {
  const fullScreenView = new FullScreenViewInteractor();

  describe('rendering FullScreenView', () => {
    const paneTitle = 'Pane title';
    const handleCancel = sinon.spy();

    beforeEach(async () => {
      handleCancel.resetHistory();

      await setupFullScreenView({
        paneTitle,
        handleCancel,
        children: <span data-test-children>Children</span>,
      });
    });

    it('should be present', () => {
      expect(fullScreenView.isPresent).to.be.true;
      expect(fullScreenView.headerTitle).to.equal(paneTitle);
      expect(fullScreenView.closeButton.isPresent).to.be.true;
      expect(fullScreenView.actionMenu.isPresent).to.be.true;
    });

    it('should contain children', () => {
      expect(fullScreenView.$('[data-test-children]')).to.not.be.undefined;
    });

    describe('clicking on close button', () => {
      beforeEach(async () => {
        await fullScreenView.closeButton.click();
      });

      it('should call the subscribed callback', () => {
        expect(handleCancel.called).to.be.true;
      });
    });
  });
});
