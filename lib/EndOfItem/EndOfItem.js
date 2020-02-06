import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

import {
  Layout,
  Icon,
} from '@folio/stripes/components';

const EndOfItem = memo(({
  title = <FormattedMessage id="stripes-components.endOfList" />,
  className,
}) => (
  <Layout className={classnames('textCentered', 'padding-top-gutter', className)}>
    <Icon icon="end-mark">{title}</Icon>
  </Layout>
));

EndOfItem.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
};

export default EndOfItem;
