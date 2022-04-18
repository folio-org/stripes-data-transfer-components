import React from 'react';
import {
  screen, render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { SettingsLabel } from './SettingsLabel';

const renderSettingsLabel = (messageId = null, contentText = null) => {
  render(
    <SettingsLabel
      messageId={messageId}
      iconKey="mappingProfiles"
    >
      <span>{contentText}</span>
    </SettingsLabel>
  );
};

describe('SettingsLabel', () => {
  describe('rendering SettingsLabel with translation id', () => {
    const messageId = 'test_message_id';

    it('should display settings label', () => {
      renderSettingsLabel(messageId);

      expect(screen.getByText(messageId)).toBeVisible();
    });
  });

  describe('rendering SettingsLabel with arbitrary label content', () => {
    const content = 'label text';

    it('should display correct label text', () => {
      renderSettingsLabel(null, content);

      expect(screen.getByText(content)).toBeVisible();
    });
  });
});
