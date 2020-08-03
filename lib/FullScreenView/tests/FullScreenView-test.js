import React from 'react';
import noop from 'lodash';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';

import { Paneset } from '@folio/stripes/components';

import { mountWithContext } from '../../../test/bigtest/helpers';
import { FullScreenViewInteractor } from './interactor';
import { FullScreenView } from '../FullScreenView';

async function setupFullScreenView({
  paneTitle = 'Pane title',
  handleCancel = noop,
  renderHeader,
  children,
}, translations) {
  await mountWithContext(
    <Paneset>
      <FullScreenView
        paneTitle={paneTitle}
        actionMenu={() => <button type="button">Some action</button>}
        renderHeader={renderHeader}
        onCancel={handleCancel}
      >
        {children}
      </FullScreenView>
    </Paneset>,
    translations
  );
}

describe('FullScreenView', () => {
  const fullScreenView = new FullScreenViewInteractor();
  const paneTitle = 'Pane title';
  const handleCancel = sinon.spy();
  const renderHeader = sinon.spy();

  describe('rendering FullScreenView without renderHeader prop', () => {
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

    it('renderHeader should not be called', () => {
      expect(renderHeader.called).to.be.false;
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

  describe('rendering FullScreenView with renderHeader prop', () => {
    beforeEach(async () => {
      renderHeader.resetHistory();

      await setupFullScreenView({
        renderHeader,
        children: <span data-test-children>Children</span>,
      });
    });

    it('renderHeader should be called', () => {
      expect(renderHeader.called).to.be.true;
    });
  });
});
