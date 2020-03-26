import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { AppIcon } from '@folio/stripes/core';

const SettingsLabel = ({
  messageId,
  iconKey,
  app,
}) => {
  return (
    <div data-test-settings-label>
      <AppIcon
        size="small"
        app={app}
        iconKey={iconKey}
      >
        <FormattedMessage id={messageId} />
      </AppIcon>
    </div>
  );
};

SettingsLabel.propTypes = {
  messageId: PropTypes.string.isRequired,
  iconKey: PropTypes.string.isRequired,
  app: PropTypes.string.isRequired,
};

export default SettingsLabel;
