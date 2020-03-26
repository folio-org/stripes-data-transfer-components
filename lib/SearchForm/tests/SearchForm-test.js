import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import stripeSmartComponentsTranslations from '@folio/stripes-smart-components/translations/stripes-smart-components/en';
import { SearchForm } from '../SearchForm';
import SearchFormInteractor from './interactor';
import { mountWithContext } from '../../../test/bigtest/helpers';

async function setupSearchForm({
  searchTerm = 'Search term',
  contextName = 'test',
  searchLabelKey = 'test',
  isLoading = false,
  handleClear,
  handleChange,
  handleSubmit,
}) {
  const translations = [
    {
      prefix: 'stripes-smart-components',
      translations: stripeSmartComponentsTranslations,
    }];

  await mountWithContext(
    <SearchForm
      searchTerm={searchTerm}
      contextName={contextName}
      searchLabelKey={searchLabelKey}
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
      handleClear={handleClear}
    />,
    translations
  );
}

describe('rendering SearchForm', () => {
  const searchForm = new SearchFormInteractor();

  describe('rendering search form with non empty search term', () => {
    const searchTerm = 'Search term';
    const handleChangeSpy = sinon.spy();
    const handleSubmitSpy = sinon.spy();

    beforeEach(async () => {
      handleChangeSpy.resetHistory();
      handleSubmitSpy.resetHistory();
      await setupSearchForm({
        searchTerm,
        handleChange: handleChangeSpy,
        handleSubmit: handleSubmitSpy,
      });
    });

    it('should display search form', () => {
      expect(searchForm.isPresent).to.be.true;
    });

    it('should display search form field with correct value', () => {
      expect(searchForm.searchField.isPresent).to.be.true;
      expect(searchForm.searchField.val).to.equal(searchTerm);
    });

    it('should display search form submit button', () => {
      expect(searchForm.searchSubmitButton.isPresent).to.be.true;
      expect(searchForm.searchSubmitButton.text).to.equal(stripeSmartComponentsTranslations.search);
    });

    it('should display search form submit button enabled when search filed is not empty', () => {
      expect(searchForm.searchSubmitButtonDisabled).to.be.false;
    });

    describe('changing search term', () => {
      beforeEach(async () => {
        await searchForm.searchField.fillValue('Changed search term');
      });

      it('should call the callback which is subscribed for search field changes', () => {
        expect(handleChangeSpy.called).to.be.true;
      });
    });

    describe('submitting search term', () => {
      beforeEach(async () => {
        await searchForm.searchSubmitButton.click();
      });

      it('should call the callback which is subscribed for search form submit', () => {
        expect(handleSubmitSpy.called).to.be.true;
      });
    });
  });

  describe('rendering search form with an empty search term', () => {
    const searchTerm = '';

    beforeEach(async () => {
      await setupSearchForm({ searchTerm });
    });

    it('should display search form submit button disabled when search filed is empty', () => {
      expect(searchForm.searchSubmitButtonDisabled).to.be.true;
    });
  });

  describe('rendering search form with loading state', () => {
    beforeEach(async () => {
      await setupSearchForm({ isLoading: true });
    });

    it('should display search form submit button disabled when search form is in the loading state', () => {
      expect(searchForm.searchSubmitButtonDisabled).to.be.true;
    });
  });
});
