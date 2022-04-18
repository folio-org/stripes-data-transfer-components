import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { noop } from 'lodash';
import {
  QueryClientProvider,
  QueryClient,
} from 'react-query';

import { StripesContext } from '@folio/stripes-core/src/StripesContext';
import createReactQueryClient from '@folio/stripes-core/src/createReactQueryClient';

import translations from '../../translations/stripes-data-transfer-components/en';
import { prefixKeys } from './prefixKeys';
import { mockOffsetSize } from './mockOffsetSize';

const stripesDefaultProps = {
  okapi: { url: '' },
  logger: { log: noop },
  connect: Component => props => (
    <Component
      {... props}
      mutator={{}}
      resources={{}}
    />
  ),
};
const reactQueryClient = new QueryClient(createReactQueryClient());

export function Harness({
  translations: translationsConfig,
  shouldMockOffsetSize = true,
  width = 500,
  height = 500,
  stripesCustomProps = {},
  children,
}) {
  const allTranslations = prefixKeys(translations);
  const stripes = Object.assign({}, stripesDefaultProps, stripesCustomProps);

  translationsConfig.forEach(tx => {
    Object.assign(allTranslations, prefixKeys(tx.translations, tx.prefix));
  });

  if (shouldMockOffsetSize) {
    mockOffsetSize(width, height);
  }

  return (
    <StripesContext.Provider value={stripes}>
      <QueryClientProvider client={reactQueryClient}>
        <IntlProvider
          locale="en"
          key="en"
          timeZone="UTC"
          messages={allTranslations}
          defaultRichTextElements={{
            b: (chunks) => <b>{chunks}</b>,
            i: (chunks) => <i>{chunks}</i>,
            em: (chunks) => <em>{chunks}</em>,
            strong: (chunks) => <strong>{chunks}</strong>,
            span: (chunks) => <span>{chunks}</span>,
            div: (chunks) => <div>{chunks}</div>,
            p: (chunks) => <p>{chunks}</p>,
            ul: (chunks) => <ul>{chunks}</ul>,
            ol: (chunks) => <ol>{chunks}</ol>,
            li: (chunks) => <li>{chunks}</li>,
            code: (chunks) => <code>{chunks}</code>,
          }}
        >
          {children}
        </IntlProvider>
      </QueryClientProvider>
    </StripesContext.Provider>
  );
}

Harness.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.arrayOf(
    PropTypes.shape({
      prefix: PropTypes.string,
      translations: PropTypes.object,
    })
  ),
  stripesCustomProps: PropTypes.object,
  shouldMockOffsetSize: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};
