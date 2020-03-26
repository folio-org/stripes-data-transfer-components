import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { InfoPopover } from '@folio/stripes/components';

import css from './ProfilesLabel.css';

const ProfilesLabel = ({
  link,
  content,
}) => {
  return (
    <div
      data-test-profile-label
      className={css.profilesLabel}
    >
      <FormattedMessage id="stripes-data-transfer-components.profiles" />
      <InfoPopover
        allowAnchorClick
        hideOnButtonClick
        buttonHref={link}
        buttonLabel={<FormattedMessage id="stripes-data-transfer-components.learnMore" />}
        content={content}
        contentClass={css.profilesPopoverContent}
        iconSize="medium"
      />
    </div>
  );
};

ProfilesLabel.propTypes = {
  link: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default ProfilesLabel;
