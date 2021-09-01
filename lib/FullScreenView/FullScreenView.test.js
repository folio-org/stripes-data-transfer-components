import React from 'react';
import noop from 'lodash';

import {
  render,
  screen,
} from '@testing-library/react';
import user from '@testing-library/user-event';

import '../../test/jest/__mock__';

import { Paneset } from '@folio/stripes/components';
import { FullScreenView } from './FullScreenView';

async function setupFullScreenView({
  paneTitle = 'Pane title',
  handleCancel = noop,
  renderHeader,
  children,
}, translations) {
  return render(
    <Paneset>
      <FullScreenView
        contentLabel="Some label"
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
  describe('rendering FullScreenView', () => {
    const paneTitle = 'Pane title';
    const handleCancel = jest.fn();
    const renderHeader = jest.fn();

    let form;
    let paneTitleElement;
    let cancelBtn;

    beforeEach(async () => {
      await setupFullScreenView({
        paneTitle,
        handleCancel,
        children: <form data-testid="full-screen-form" />,
      });

      form = screen.queryByTestId('full-screen-form');
      paneTitleElement = screen.queryByText(paneTitle);
      cancelBtn = screen.getByLabelText('stripes-components.cancel');
    });

    it('should be rendered correctly', () => {
      expect(form).toBeVisible();
      expect(paneTitleElement).toBeVisible();
    });

    it('renderHeader should not be called', () => {
      expect(renderHeader).not.toHaveBeenCalled();
    });

    describe('rendering FullScreenView with renderHeader prop', () => {
      beforeEach(async () => {
        await setupFullScreenView({
          renderHeader,
          children: <span>Children</span>,
        });
      });

      it('renderHeader should be called', () => {
        expect(renderHeader).toHaveBeenCalled();
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
