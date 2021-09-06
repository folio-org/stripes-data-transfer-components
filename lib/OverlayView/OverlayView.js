import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const OverlayView = ({ children }) => {
  useEffect(() => {
    const header = document.querySelector('header');

    if (header) {
      header.setAttribute('style', 'display: none');
    }
  }, []);

  return (
    <div
      data-test-overlay-view
      data-testid="overlayView"
    >
      {children}
    </div>
  );
};

OverlayView.propTypes = { children: PropTypes.node.isRequired };
