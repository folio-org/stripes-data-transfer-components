import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Pane,
  PaneMenu,
  IconButton,
  PaneHeader,
  Layer,
} from '@folio/stripes/components';

import css from './FullScreenView.css';

export const FullScreenView = ({
  id = 'full-screen-view',
  paneTitle,
  actionMenu,
  contentLabel,
  centerContent = true,
  children,
  onCancel,
  renderHeader,
  ...props
}) => {
  const firstMenu = (
    <PaneMenu>
      <FormattedMessage id="stripes-components.cancel">
        {ariaLabel => (
          <IconButton
            data-test-header-close-button
            ariaLabel={ariaLabel}
            icon="times"
            onClick={onCancel}
          />
        )}
      </FormattedMessage>
    </PaneMenu>
  );

  const renderDefaultHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      paneTitle={paneTitle}
      actionMenu={actionMenu}
      firstMenu={firstMenu}
    />
  );

  return (
    <Layer
      isOpen
      contentLabel={contentLabel}
    >
      <Pane
        data-test-full-screen-view
        id={id}
        defaultWidth="100%"
        renderHeader={renderHeader || renderDefaultHeader}
        {...props}
      >
        <div
          data-test-full-screen-view-content
          className={centerContent && css.viewContent}
        >
          {children}
        </div>
      </Pane>
    </Layer>
  );
};

FullScreenView.propTypes = {
  id: PropTypes.string,
  onCancel: PropTypes.func,
  paneTitle: PropTypes.node,
  children: PropTypes.node,
  actionMenu: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderHeader: PropTypes.func,
  centerContent: PropTypes.bool,
  contentLabel: PropTypes.string.isRequired,
};
