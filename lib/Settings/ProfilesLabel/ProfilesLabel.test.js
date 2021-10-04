import React from 'react';
import {
  screen, render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';
import '../../../test/jest/__new_mock__';

import { ProfilesLabel } from './ProfilesLabel';

const link = 'http://localhost/';
const content = <div data-profiles-label-content>Content</div>;

const renderProfileLabel = () => {
  render(
    <ProfilesLabel
      link={link}
      content={content}
    />
  );
};

describe('ProfilesLabel', () => {
  describe('rendering ProfileLabel', () => {
    beforeEach(() => {
      const overlayContainer = document.createElement('div');

      overlayContainer.id = 'OverlayContainer';
      document.body.append(overlayContainer);
    });

    afterEach(() => {
      document.getElementById('OverlayContainer').remove();
    });

    it('should display the correct label text', () => {
      renderProfileLabel();

      expect(screen.getByText('stripes-data-transfer-components.profiles')).toBeVisible();
    });

    it('should display info icon button', () => {
      renderProfileLabel();

      expect(screen.getByRole('button', { name: 'info' })).toBeVisible();
    });
  });
});
