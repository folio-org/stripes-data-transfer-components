import React from 'react';
import {
  describe,
  beforeEach,
  afterEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../../test/bigtest/helpers';
import {
  ProfilesLabelInteractor,
  ProfilesPopoverInteractor,
} from './interactors';
import { ProfilesLabel } from '../ProfilesLabel';

import translations from '../../../../translations/stripes-data-transfer-components/en';

describe('ProfilesLabel', () => {
  const profilesLabel = new ProfilesLabelInteractor();
  const popover = new ProfilesPopoverInteractor();

  describe('rendering ProfileLabel', () => {
    const link = 'http://localhost/';
    const content = <div data-profiles-label-content>Content</div>;

    beforeEach(async () => {
      const overlayContainer = document.createElement('div');

      overlayContainer.id = 'OverlayContainer';
      document.body.append(overlayContainer);

      await mountWithContext(
        <ProfilesLabel
          link={link}
          content={content}
        />
      );
    });

    afterEach(() => {
      document.getElementById('OverlayContainer').remove();
    });

    it('should display profiles label', () => {
      expect(profilesLabel.isPresent).to.be.true;
    });

    it('should display the correct label text', () => {
      expect(profilesLabel.text).to.equal(translations.profiles);
    });

    it('should display info icon button', () => {
      expect(profilesLabel.infoButton.isPresent).to.be.true;
    });
  });
});
