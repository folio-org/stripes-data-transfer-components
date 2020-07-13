import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { AppIcon } from '@folio/stripes/core';

export const SettingsLabel = ({
  messageId,
  iconKey,
  app,
  children,
}) => {
  return (
    <div data-test-settings-label>
      <AppIcon
        size="small"
        app={app}
        iconKey={iconKey}
      >
        {messageId && <FormattedMessage id={messageId} />}
        {children}
      </AppIcon>
    </div>
  );
};

SettingsLabel.propTypes = {
  iconKey: PropTypes.string.isRequired,
  messageId: PropTypes.string,
  children: PropTypes.element,
  app: PropTypes.string,
};

SettingsLabel.defaultProps = { app: 'stripes-data-transfer-components' };
