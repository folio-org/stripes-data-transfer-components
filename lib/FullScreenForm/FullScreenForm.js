import React, {
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  Pane,
  PaneMenu,
  IconButton,
  Button,
  PaneFooter,
} from '@folio/stripes/components';

import css from './FullScreenForm.css';

export const FullScreenForm = ({
  id = 'full-screen-form',
  children,
  paneTitle,
  isSubmitButtonDisabled = false,
  noValidate = false,
  submitButtonText = <FormattedMessage id="stripes-components.saveAndClose" />,
  cancelButtonText = <FormattedMessage id="stripes-components.cancel" />,
  contentClassName = '',
  onSubmit,
  onCancel,
}) => {
  const headerCloseButtonRef = useRef();

  useEffect(() => headerCloseButtonRef.current?.focus(), []);
  const intl = useIntl();

  const firstMenu = (
    <PaneMenu>
      <IconButton
        data-test-header-close-button
        ariaLabel={intl.formatMessage({ id: 'stripes-components.cancel' })}
        icon="times"
        ref={headerCloseButtonRef}
        onClick={onCancel}
      />
    </PaneMenu>
  );

  const cancelButton = (
    <Button
      data-test-cancel-button
      marginBottom0
      buttonStyle="default mega"
      onClick={onCancel}
    >
      {cancelButtonText}
    </Button>
  );

  const submitButton = (
    <Button
      data-test-submit-button
      type="submit"
      disabled={isSubmitButtonDisabled}
      buttonStyle="primary mega"
      marginBottom0
    >
      {submitButtonText}
    </Button>
  );

  const footer = (
    <PaneFooter
      renderStart={cancelButton}
      renderEnd={submitButton}
    />
  );

  return (
    <form
      id={id}
      noValidate={noValidate}
      data-test-full-screen-form
      data-testid="full-screen-form"
      className={css.form}
      onSubmit={onSubmit}
    >
      <Pane
        defaultWidth="100%"
        paneTitle={paneTitle}
        firstMenu={firstMenu}
        footer={footer}
      >
        <div
          data-test-full-screen-form-content
          className={classNames(css.formContent, contentClassName)}
        >
          {children}
        </div>
      </Pane>
    </form>
  );
};

FullScreenForm.propTypes = {
  paneTitle: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitButtonText: PropTypes.node,
  cancelButtonText: PropTypes.node,
  id: PropTypes.string,
  children: PropTypes.node,
  isSubmitButtonDisabled: PropTypes.bool,
  contentClassName: PropTypes.string,
  noValidate: PropTypes.bool,
};
