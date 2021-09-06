import React from 'react';
import noop from 'lodash';

import {
  render,
  screen,
} from '@testing-library/react';
import user from '@testing-library/user-event';

import '../../test/jest/__mock__';

import { FullScreenForm } from '.';

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
  return render(
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
  describe('rendering FullScreenForm', () => {
    const paneTitle = 'Pane title';
    const submitButtonText = 'Submit';
    const cancelButtonText = 'Cancel';
    const handleSubmit = jest.fn();
    const handleCancel = jest.fn();

    let form;
    let paneTitleElement;
    let submitBtn;
    let cancelBtn;

    beforeEach(async () => {
      await setupFullScreenForm({
        paneTitle,
        submitButtonText,
        cancelButtonText,
        handleSubmit,
        handleCancel,
        children: <span data-testid="test-children">Children</span>,
      });

      form = screen.queryByTestId('full-screen-form');
      paneTitleElement = screen.queryByText(paneTitle);
      submitBtn = screen.queryByText(submitButtonText);
      cancelBtn = screen.queryByText(cancelButtonText);
    });

    it('should be rendered correctly', () => {
      expect(form).toBeVisible();
      expect(paneTitleElement).toBeVisible();
      expect(submitBtn).toBeVisible();
      expect(submitBtn).toBeEnabled();
      expect(cancelBtn).toBeVisible();
    });

    describe('clicking on submit button', () => {
      it('should call the subscribed callback', () => {
        user.click(submitBtn);

        expect(handleSubmit).toHaveBeenCalled();
      });
    });

    describe('clicking on cancel button', () => {
      it('should call the subscribed callback', () => {
        user.click(cancelBtn);

        expect(handleCancel).toHaveBeenCalled();
      });
    });
  });
});
