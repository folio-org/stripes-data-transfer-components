import React from 'react';
import { noop } from 'lodash';

import {
  screen, render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../test/jest/__mock__';
import '../../test/jest/__new_mock__';

import { SearchForm } from './SearchForm';

const setupSearchForm = ({
  searchTerm = 'Search term',
  contextName = 'test',
  searchLabelKey = 'test',
  isLoading = false,
  idKey,
  handleChange,
  handleSubmit,
}) => {
  render(
    <SearchForm
      searchTerm={searchTerm}
      contextName={contextName}
      searchLabelKey={searchLabelKey}
      isLoading={isLoading}
      idKey={idKey}
      handleChange={handleChange}
      handleSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
      handleClear={noop}
    />
  );
};

describe('SearchForm', () => {
  describe('rendering search form with non empty search term', () => {
    let searchTerm = 'Search term';
    const handleChangeMock = jest.fn();
    const handleSubmitMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should display search form', () => {
      setupSearchForm({
        searchTerm,
        handleChange: handleChangeMock,
        handleSubmit: handleSubmitMock,
      });

      expect(document.querySelector('[data-test-search-form]')).toBeVisible();
    });
    it('should display search form field with correct value', () => {
      setupSearchForm({
        searchTerm,
        handleChange: handleChangeMock,
        handleSubmit: handleSubmitMock,
      });

      const searchBox = screen.getByRole('searchbox');

      expect(searchBox).toBeVisible();
      expect(searchBox).toHaveValue(searchTerm);
    });

    it('should display search form submit button', () => {
      setupSearchForm({
        searchTerm,
        handleChange: handleChangeMock,
        handleSubmit: handleSubmitMock,
      });

      expect(screen.getByRole('button', { name: 'stripes-smart-components.search' })).toBeVisible();
      expect(screen.getByRole('button', { name: 'stripes-smart-components.search' })).toBeEnabled();
    });

    it('should call the callback which is subscribed for search field changes', () => {
      setupSearchForm({
        searchTerm,
        handleChange: handleChangeMock,
        handleSubmit: handleSubmitMock,
      });

      const searchBox = screen.getByRole('searchbox');

      userEvent.type(searchBox, 'Changed search term');

      expect(handleChangeMock).toHaveBeenCalled();
    });

    it('should call the callback which is subscribed for search form submit', () => {
      setupSearchForm({
        searchTerm,
        handleChange: handleChangeMock,
        handleSubmit: handleSubmitMock,
      });

      const submitButton = screen.getByRole('button', { name: 'stripes-smart-components.search' });

      userEvent.click(submitButton);

      expect(handleSubmitMock).toHaveBeenCalled();
    });

    it('should display search form submit button disabled when search filed is empty', () => {
      searchTerm = '';

      setupSearchForm({ searchTerm });

      const submitButton = screen.getByRole('button', { name: 'stripes-smart-components.search' });

      expect(submitButton).toBeDisabled();
    });

    it('should display search form submit button disabled when search form is in the loading state', () => {
      setupSearchForm({ isLoading: true });

      const submitButton = screen.getByRole('button', { name: 'stripes-smart-components.search' });

      expect(submitButton).toBeDisabled();
    });

    it('should display the default search field id', () => {
      setupSearchForm({});

      const searchBox = screen.getByRole('searchbox');

      expect(searchBox).toHaveAttribute('id', 'input-search-field');
    });
    it('should display search field with a unique id', () => {
      setupSearchForm({ idKey: 'custom_id_key' });

      const searchBox = screen.getByRole('searchbox');

      expect(searchBox).toHaveAttribute('id', 'input-search-custom_id_key-field');
    });
  });
});
