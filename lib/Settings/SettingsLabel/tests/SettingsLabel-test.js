import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../../test/bigtest/helpers';
import SettingsLabelInteractor from './interactor';
import SettingsLabel from '../SettingsLabel';

describe('SettingsLabel', () => {
  const settingsLabel = new SettingsLabelInteractor();

  describe('rendering SettingsLabel', () => {
    const messageId = 'test_message_id';

    beforeEach(async () => {
      await mountWithContext(
        <SettingsLabel
          messageId={messageId}
          iconKey="mappingProfiles"
        />
      );
    });

    it('should display settings label', () => {
      expect(settingsLabel.isPresent).to.be.true;
    });

    it('should display app icon', () => {
      expect(settingsLabel.icon.isPresent).to.be.true;
    });

    it('should display correct label text', () => {
      expect(settingsLabel.labelText).to.equal(messageId);
    });
  });
});
