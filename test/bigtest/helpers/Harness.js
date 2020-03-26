import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import prefixKeys from './prefixKeys';
import translations from '../../../translations/stripes-data-transfer-components/en';

class Harness extends React.Component {
  render() {
    const allTranslations = prefixKeys(translations);

    this.props.translations.forEach(tx => {
      Object.assign(allTranslations, prefixKeys(tx.translations, tx.prefix));
    });

    return (
      <IntlProvider
        locale="en"
        key="en"
        timeZone="UTC"
        messages={allTranslations}
      >
        {this.props.children}
      </IntlProvider>
    );
  }
}

Harness.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.arrayOf(
    PropTypes.shape({
      prefix: PropTypes.string,
      translations: PropTypes.object,
    })
  ),
};

export default Harness;
