import React from 'react';
import {
  screen, render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';
import '../../../test/jest/__new_mock__';

import { SettingsLabel } from './SettingsLabel';

describe('SettingsLabel', () => {
  describe('rendering SettingsLabel with translation id', () => {
    const messageId = 'test_message_id';

    it('should display settings label', () => {
      render(
        <SettingsLabel
          messageId={messageId}
          iconKey="mappingProfiles"
        />
      );

      expect(screen.getByText(messageId)).toBeVisible();
    });
  });

  describe('rendering SettingsLabel with arbitrary label content', () => {
    const content = 'label text';

    it('should display correct label text', () => {
      render(
        <SettingsLabel
          iconKey="mappingProfiles"
        >
          {content}
        </SettingsLabel>
      );

      expect(screen.getByText(content)).toBeVisible();
    });
  });
});
