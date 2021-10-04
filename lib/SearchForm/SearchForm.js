import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { noop } from 'lodash';

import {
  Button,
  SearchField,
} from '@folio/stripes/components';

import { formatTranslationChunks } from '../utils';

import css from './SearchForm.css';

export function SearchForm({
  searchableIndexes,
  selectedIndex,
  searchLabelKey,
  searchTerm,
  isLoading,
  fieldName,
  idKey,
  searchInputRef,
  handleChangeIndex,
  handleChange,
  handleClear,
  handleSubmit,
}) {
  const intl = useIntl();

  return (
    <form
      data-testid="search-form"
      data-test-search-form
      onSubmit={handleSubmit}
    >
      <div className={css.searchWrap}>
        <div className={css.searchFieldWrap}>
          <FormattedMessage id={searchLabelKey}>
            {searchDetailsLabel => (
              <SearchField
                id={idKey ? `input-search-${idKey}-field` : 'input-search-field'}
                clearSearchId={idKey ? `input-${idKey}-search-field-clear-button` : 'input-search-field-clear-button'}
                data-test-search-form-field
                ariaLabel={formatTranslationChunks(
                  intl.formatMessage(
                    { id: 'stripes-smart-components.searchFieldLabel' },
                    { moduleName: searchDetailsLabel }
                  )
                )}
                marginBottom0
                value={searchTerm}
                searchableIndexes={searchableIndexes}
                selectedIndex={selectedIndex}
                loading={isLoading}
                name={fieldName}
                inputRef={searchInputRef}
                onChangeIndex={handleChangeIndex}
                onChange={handleChange}
                onClear={handleClear}
              />
            )}
          </FormattedMessage>
        </div>
        <div className={css.searchButtonWrap}>
          <Button
            data-test-search-form-submit
            type="submit"
            buttonStyle="primary"
            fullWidth
            marginBottom0
            disabled={!searchTerm || isLoading}
          >
            <FormattedMessage id="stripes-smart-components.search" />
          </Button>
        </div>
      </div>
    </form>
  );
}

SearchForm.propTypes = {
  searchLabelKey: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  isLoading: PropTypes.bool,
  selectedIndex: PropTypes.string,
  searchableIndexes: PropTypes.arrayOf(PropTypes.object),
  fieldName: PropTypes.string,
  idKey: PropTypes.string,
  searchInputRef: PropTypes.object,
  handleChangeIndex: PropTypes.func,
  handleChange: PropTypes.func,
  handleClear: PropTypes.func,
  handleSubmit: PropTypes.func,
};

SearchForm.defaultProps = {
  isLoading: false,
  searchableIndexes: null,
  selectedIndex: '',
  fieldName: '',
  idKey: '',
  handleChangeIndex: noop,
  handleChange: noop,
  handleSubmit: noop,
  handleClear: null,
};
