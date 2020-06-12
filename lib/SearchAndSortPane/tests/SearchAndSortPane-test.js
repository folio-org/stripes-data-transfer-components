import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  describe,
  beforeEach,
  afterEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';
import { noop } from 'lodash';
import sinon from 'sinon';

import {
  mountWithContext,
  wait,
} from '../../../test/bigtest/helpers';
import { SearchAndSortPane } from '../SearchAndSortPane';
import { SettingsLabel } from '../../Settings';
import { SearchAndSortInteractor } from './SearchAndSortInteractor';
import {
  buildMutator,
  buildResources,
} from '../../../test/bigtest/helpers/stripesResourcesMocks';

import translations from '../../../translations/stripes-data-transfer-components/en';

const parentMutator = buildMutator();

describe('SearchAndSortPane', () => {
  const pane = new SearchAndSortInteractor();
  const parentResources = buildResources({
    resourceName: 'profiles',
    records: [
      {
        id: 1,
        name: 'Test name',
      },
      {
        id: 2,
        name: 'Test name 2',
      },
    ],
  });

  const visibleColumns = [
    'id',
    'name',
  ];
  const columnWidths = {
    id: '70px',
    name: '70px',
  };
  const columnMapping = {
    id: 'id',
    name: 'Name',
  };
  const formatter = {
    id: record => record.id,
    name: record => record.name,
  };
  const resultCountMessage = 'profiles pane';
  const titleMessageId = 'title message';

  describe('rendering jobs with loaded status and 2 items', () => {
    beforeEach(async () => {
      window.history.pushState({}, document.title, '/');
    });

    afterEach(async () => {
      window.history.pushState({}, document.title, '/');
    });

    beforeEach(async () => {
      await mountWithContext(
        <Router>
          <SearchAndSortPane
            label={(
              <SettingsLabel
                messageId={titleMessageId}
                iconKey="customIcon"
              />
            )}
            parentResources={parentResources}
            parentMutator={parentMutator}
            resultCountMessageId={resultCountMessage}
            resultsFormatter={formatter}
            defaultSort="name"
            columnWidths={columnWidths}
            visibleColumns={visibleColumns}
            columnMapping={columnMapping}
            stripes={{ logger: { log: noop } }}
            resourceName="profiles"
          />
        </Router>
      );
    });

    it('should display SearchAndSortPane', () => {
      expect(pane.isPresent).to.be.true;
    });

    it('should display header', () => {
      expect(pane.header.isPresent).to.be.true;
    });

    it('should display correct title', () => {
      expect(pane.header.title.labelText).to.equal(titleMessageId);
    });

    it('should display correct subtitle', () => {
      expect(pane.header.subTitleText).to.equal(resultCountMessage);
    });

    it('should display new record button', () => {
      expect(pane.header.newButton.isPresent).to.be.true;
    });

    it('should display correct text in new button', () => {
      expect(pane.header.newButton.label).to.equal(translations.new);
    });

    it('should have correct path correct text in new button', () => {
      expect(pane.header.newButton.href.endsWith('/create?sort=name')).to.be.true;
    });

    it('should display search form', () => {
      expect(pane.searchForm.isPresent).to.be.true;
    });

    it('should display search results', () => {
      expect(pane.searchResults.isPresent).to.be.true;
    });

    it('should sort by default', () => {
      expect(window.location.search).to.equal('?sort=name');
    });

    it('should pass columns properties and values', () => {
      expect(pane.searchResults.list.headers(0).text).to.equal('id');
      expect(pane.searchResults.list.headers(1).text).to.equal('Name');
      expect(pane.searchResults.getCellContent(0, 0)).to.equal('1');
      expect(pane.searchResults.getCellContent(1, 0)).to.equal('2');
      expect(pane.searchResults.getCellContent(0, 1)).to.equal('Test name');
      expect(pane.searchResults.getCellContent(1, 1)).to.equal('Test name 2');
    });

    describe('searching by the value', () => {
      const searchValue = 'searchValue';

      beforeEach(async () => {
        await pane.searchForm.searchField.fillValue(searchValue);
        await pane.searchForm.searchSubmitButton.click();
      });

      it('should change search query in url', () => {
        expect(window.location.search).to.equal(`?query=${searchValue}&sort=name`);
      });

      describe('clicking on clear search field button', () => {
        beforeEach(async () => {
          await pane.searchForm.searchField.fillValue('text');
          await wait();
          await pane.searchForm.clearSearchFieldButton.click();
        });

        it('should remove search query from url', () => {
          expect(window.location.search).to.equal('?sort=name');
        });
      });
    });

    describe('clicking on default sort field', () => {
      beforeEach(async () => {
        await pane.searchResults.list.headers(1).click();
      });

      it('should change sort query in url to sort in opposite order', () => {
        expect(window.location.search).to.equal('?sort=-name');
      });
    });

    describe('clicking on non default sort field', () => {
      beforeEach(async () => {
        await pane.searchResults.list.headers(0).click();
      });

      it('should change sort query in url to sort by 2 fields by default', () => {
        expect(window.location.search).to.equal('?sort=id%2Cname');
      });
    });
  });

  describe('rendering component on page with query, custom renderHeader method and maxSortKeys = 1', () => {
    const searchQueryValue = 'search';
    const renderHeaderSpy = sinon.spy();

    beforeEach(async () => {
      renderHeaderSpy.resetHistory();
      window.history.pushState({}, document.title, `/?query=${searchQueryValue}`);
      await mountWithContext(
        <Router>
          <SearchAndSortPane
            label={(
              <SettingsLabel
                messageId={titleMessageId}
                iconKey="customIcon"
              />
            )}
            parentResources={parentResources}
            parentMutator={parentMutator}
            resultCountMessageId={resultCountMessage}
            resultsFormatter={formatter}
            defaultSort="name"
            columnWidths={columnWidths}
            visibleColumns={visibleColumns}
            columnMapping={columnMapping}
            stripes={{ logger: { log: noop } }}
            resourceName="profiles"
            renderHeader={renderHeaderSpy}
            maxSortKeys={1}
          />
        </Router>
      );
    });

    it('should fill search field by query value from url ', () => {
      expect(pane.searchForm.searchField.val).to.equal(searchQueryValue);
    });

    it('should use custom rendering header handler', () => {
      expect(renderHeaderSpy.called).to.be.true;
    });

    describe('clicking on non default sort field', () => {
      beforeEach(async () => {
        await pane.searchResults.list.headers(0).click();
      });

      it('should change sort query in url to sort by one field', () => {
        expect(window.location.search).to.equal('?query=search&sort=id');
      });
    });
  });

  describe('rendering component without search form and header last menu and with custom search results props', () => {
    const onRowClickSpy = sinon.spy();

    beforeEach(async () => {
      onRowClickSpy.resetHistory();
      await mountWithContext(
        <Router>
          <SearchAndSortPane
            label={(
              <SettingsLabel
                messageId={titleMessageId}
                iconKey="customIcon"
              />
            )}
            parentResources={parentResources}
            parentMutator={parentMutator}
            resultCountMessageId={resultCountMessage}
            resultsFormatter={formatter}
            defaultSort="name"
            columnWidths={columnWidths}
            visibleColumns={visibleColumns}
            columnMapping={columnMapping}
            stripes={{ logger: { log: noop } }}
            resourceName="profiles"
            hasSearchForm={false}
            lastMenu={<span data-test-custom-last-menu />}
            searchResultsProps={{
              rowProps: null,
              onRowClick: onRowClickSpy,
            }}
          />
        </Router>
      );
    });

    it('should display custom last menu', () => {
      expect(pane.header.$('[data-test-custom-last-menu]')).to.not.be.undefined;
    });

    it('should not display search form', () => {
      expect(pane.searchForm.isPresent).to.be.false;
    });

    describe('clicking on row', () => {
      beforeEach(async () => {
        await pane.searchResults.list.rows(0).click();
      });

      it('should call the subscribed callback provided via props for search results', () => {
        expect(onRowClickSpy.called).to.be.true;
      });
    });
  });
});
