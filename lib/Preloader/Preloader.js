import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  Loading,
  Layout,
} from '@folio/stripes/components';

export const Preloader = memo(({
  message,
  size,
  preloaderClassName,
}) => (
  <Layout
    className={preloaderClassName ? `flex centerContent ${preloaderClassName}` : 'flex centerContent'}
    data-test-preloader
  >
    {message}
    <Loading size={size} />
  </Layout>
));

Preloader.propTypes = {
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
};

Preloader.defaultTypes = { size: 'large' };
