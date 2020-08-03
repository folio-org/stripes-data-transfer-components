import React from 'react';
import noop from 'lodash';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  describe,
  beforeEach,
  before,
  it,
} from '@bigtest/mocha';

import { mountWithContext } from '../../../test/bigtest/helpers';
import { FullScreenFormInteractor } from './interactor';
import { FullScreenForm } from '../FullScreenForm';

async function setupFullScreenForm({
  id,
  paneTitle = 'Pane title',
  submitButtonText,
  cancelButtonText,
  handleCancel = noop,
  handleSubmit = noop,
  isSubmitButtonDisabled,
  contentClassName,
  children,
}, translations) {
  await mountWithContext(
    <FullScreenForm
      id={id}
      paneTitle={paneTitle}
      submitButtonText={submitButtonText}
      cancelButtonText={cancelButtonText}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      contentClassName={contentClassName}
      onCancel={handleCancel}
      onSubmit={e => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      {children}
    </FullScreenForm>,
    translations
  );
}

describe('FullScreenForm', () => {
  const fullScreenForm = new FullScreenFormInteractor();

  describe('rendering FullScreenForm', () => {
    const paneTitle = 'Pane title';
    const submitButtonText = 'Submit';
    const cancelButtonText = 'Cancel';
    const handleSubmit = sinon.spy();
    const handleCancel = sinon.spy();

    beforeEach(async () => {
      handleSubmit.resetHistory();
      handleCancel.resetHistory();

      await setupFullScreenForm({
        paneTitle,
        submitButtonText,
        cancelButtonText,
        handleSubmit,
        handleCancel,
        children: <span data-test-children>Children</span>,
      });
    });

    it('should be present', () => {
      expect(fullScreenForm.isPresent).to.be.true;
      expect(fullScreenForm.header.text).to.equal(paneTitle);
    });

    it('should contain children', () => {
      expect(fullScreenForm.$('[data-test-children]')).to.not.be.undefined;
    });

    it('should have default id', () => {
      expect(fullScreenForm.$('form').id).to.equal('full-screen-form');
    });

    it('should display submit button with proper text', () => {
      expect(fullScreenForm.submitButton.isPresent).to.be.true;
      expect(fullScreenForm.submitButton.text).to.equal(submitButtonText);
    });

    it('should display submit button enabled', () => {
      expect(fullScreenForm.submitButton.$root.disabled).to.be.false;
    });

    it('should display cancel button', () => {
      expect(fullScreenForm.cancelButton.isPresent).to.be.true;
      expect(fullScreenForm.cancelButton.text).to.equal(cancelButtonText);
    });

    describe('clicking on submit button', () => {
      beforeEach(async () => {
        await fullScreenForm.submitButton.click();
      });

      it('should call the subscribed callback', () => {
        expect(handleSubmit.called).to.be.true;
      });
    });

    describe('clicking on cancel button', () => {
      beforeEach(async () => {
        await fullScreenForm.cancelButton.click();
      });

      it('should call the subscribed callback', () => {
        expect(handleCancel.called).to.be.true;
      });
    });

    describe('clicking on close button', () => {
      beforeEach(async () => {
        await fullScreenForm.closeButton.click();
      });

      it('should call the subscribed callback', () => {
        expect(handleCancel.called).to.be.true;
      });
    });
  });

  describe('rendering FullScreenForm with default buttons wordings, custom id and content class and submit button disabled', () => {
    const submitButtonText = 'Submit';
    const cancelButtonText = 'Cancel';
    const contentClassName = 'contentClassName';
    const customId = 'formId';

    before(async () => {
      await setupFullScreenForm(
        {
          id: customId,
          isSubmitButtonDisabled: true,
          contentClassName: 'contentClassName',
        },
        [
          {
            prefix: 'stripes-components',
            translations: {
              saveAndClose: submitButtonText,
              cancel: cancelButtonText,
            },
          },
        ]
      );
    });

    it('should have the custom id', () => {
      expect(fullScreenForm.$('form').id).to.equal(customId);
    });

    it('should display submit button with proper text', () => {
      expect(fullScreenForm.submitButton.text).to.equal(submitButtonText);
    });

    it('should display cancel button', () => {
      expect(fullScreenForm.cancelButton.text).to.equal(cancelButtonText);
    });

    it('should attach custom class to form content', () => {
      expect(fullScreenForm.content.$root.classList.contains(contentClassName)).to.be.true;
    });

    it('should display submit button disabled', () => {
      expect(fullScreenForm.submitButton.$root.disabled).to.be.true;
    });
  });
});
