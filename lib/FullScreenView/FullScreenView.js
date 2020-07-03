import React, {
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Pane,
  PaneMenu,
  IconButton,
} from '@folio/stripes/components';

import css from './FullScreenView.css';

export const FullScreenView = ({
  id = 'full-screen-view',
  children,
  paneTitle,
  actionMenu,
  onCancel,
}) => {
  const headerCloseButtonRef = useRef();

  useEffect(() => headerCloseButtonRef.current.focus(), []);

  const firstMenu = (
    <PaneMenu>
      <FormattedMessage id="stripes-components.cancel">
        {ariaLabel => (
          <IconButton
            data-test-header-close-button
            ariaLabel={ariaLabel}
            icon="times"
            ref={headerCloseButtonRef}
            onClick={onCancel}
          />
        )}
      </FormattedMessage>
    </PaneMenu>
  );

  return (
    <div
      id={id}
      data-test-full-screen-view
    >
      <Pane
        defaultWidth="100%"
        paneTitle={paneTitle}
        firstMenu={firstMenu}
        actionMenu={actionMenu}
      >
        <div
          data-test-full-screen-view-content
          className={css.viewContent}
        >
          {children}
        </div>
      </Pane>
    </div>
  );
};

FullScreenView.propTypes = {
  id: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  paneTitle: PropTypes.node.isRequired,
  children: PropTypes.node,
  actionMenu: PropTypes.node,
};
