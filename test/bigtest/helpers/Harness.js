import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import prefixKeys from './prefixKeys';
import translations from '../../../translations/stripes-data-transfer-components/en';

class Harness extends React.Component {
  render() {
    return (
      <IntlProvider
        locale="en"
        key="en"
        timeZone="UTC"
        messages={prefixKeys(translations)}
      >
        {this.props.children}
      </IntlProvider>
    );
  }
}

Harness.propTypes = { children: PropTypes.node };

export default Harness;
