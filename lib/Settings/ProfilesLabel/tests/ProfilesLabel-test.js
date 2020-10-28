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

    // TODO handle in scope of the UIDEXP-190
    describe.skip('clicking on info icon button', () => {
      beforeEach(async () => {
        await profilesLabel.infoButton.click();
        await new Promise(resolve => { setTimeout(() => resolve(), 1000); });
      });

      it('should display passed in content', () => {
        expect(popover.content.isPresent).to.be.true;
      });

      it('should apply correct href property', () => {
        expect(popover.linkHref).to.equal(link);
      });

      it('should display passed in content', () => {
        expect(popover.linkText).to.equal(translations.learnMore);
      });
    });
  });
});
