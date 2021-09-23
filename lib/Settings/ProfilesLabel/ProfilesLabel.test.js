import React from 'react';
import {
  screen, render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../test/jest/__mock__';
import '../../../test/jest/__new_mock__';

import { ProfilesLabel } from './ProfilesLabel';

describe('ProfilesLabel', () => {
  describe('rendering ProfileLabel', () => {
    const link = 'http://localhost/';
    const content = <div data-profiles-label-content>Content</div>;

    beforeEach(() => {
      const overlayContainer = document.createElement('div');

      overlayContainer.id = 'OverlayContainer';
      document.body.append(overlayContainer);
    });

    afterEach(() => {
      document.getElementById('OverlayContainer').remove();
    });

    it('should display the correct label text', () => {
      render(
        <ProfilesLabel
          link={link}
          content={content}
        />
      );

      expect(screen.getByText('stripes-data-transfer-components.profiles')).toBeVisible();
    });

    it('should display info icon button', () => {
      render(
        <ProfilesLabel
          link={link}
          content={content}
        />
      );

      expect(screen.getByRole('button', { name: 'info' })).toBeVisible();
    });

    describe('clicking on info icon button', () => {
      it('should display passed in content', async () => {
        render(
          <ProfilesLabel
            link={link}
            content={content}
          />
        );

        userEvent.click(screen.getByRole('button', { name: 'info' }));

        await new Promise(resolve => { setTimeout(() => resolve(), 1000); });

        expect(screen.getByText('Content')).toBeVisible();
        expect(screen.getByRole('button', { name: 'stripes-data-transfer-components.learnMore' })).toHaveAttribute('href', `${link}`);
      });
    });
  });
});
