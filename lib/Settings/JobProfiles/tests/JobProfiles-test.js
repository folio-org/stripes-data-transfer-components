import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect } from 'chai';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';

import { mountWithContext } from '../../../../test/bigtest/helpers';
import JobProfiles from '../JobProfiles';
import {
  useJobProfilesProperties,
  DEFAULT_JOB_PROFILES_COLUMNS,
} from '../columnProperties';

import { useListFormatter } from '../../../ListFormatter';

import { SearchAndSortInteractor } from '../../../SearchAndSortPane/tests/SearchAndSortInteractor';
import jobProfilesData from './jobProfilesData';
import translations from '../../../../translations/stripes-data-transfer-components/en';
import {
  buildMutator,
  buildResources,
} from '../../../../test/bigtest/helpers/stripesResourcesMocks';

const parentMutator = buildMutator();

const JobProfilesContainer = ({
  parentResources = {},
  customProperties = {},
  customListProperties,
  customListFormatters,
}) => (
  <Router>
    <JobProfiles
      parentMutator={parentMutator}
      parentResources={parentResources}
      formatter={useListFormatter(customListFormatters)}
      {...useJobProfilesProperties(customListProperties)}
      {...customProperties}
    />
  </Router>
);

describe('JobProfiles', () => {
  const jobProfiles = new SearchAndSortInteractor();

  describe('rendering JobProfiles with empty profiles list', () => {
    const parentResources = buildResources({
      resourceName: 'profiles',
      records: [],
      hasLoaded: false,
    });

    beforeEach(async () => {
      await mountWithContext(<JobProfilesContainer parentResources={parentResources} />);
    });

    it('should be visible', () => {
      expect(jobProfiles.isPresent).to.be.true;
    });

    it('should display header', () => {
      expect(jobProfiles.header.isPresent).to.be.true;
    });

    it('should display correct title', () => {
      expect(jobProfiles.header.title.labelText).to.equal(translations.jobProfilesTitle);
    });

    it('should display correct subtitle', () => {
      expect(jobProfiles.header.subTitleText).to.equal('0 job profiles');
    });

    it('should contain search form', () => {
      expect(jobProfiles.searchForm.isPresent).to.be.true;
    });

    it('should hide job profiles list', () => {
      expect(jobProfiles.searchResults.list.isPresent).to.be.false;
    });
  });

  describe('rendering JobProfiles with filled profiles list and default columns', () => {
    const parentResources = buildResources({
      resourceName: 'jobProfiles',
      records: jobProfilesData,
      hasLoaded: true,
    });

    beforeEach(async () => {
      await mountWithContext(<JobProfilesContainer parentResources={parentResources} />);
    });

    it('should display job profiles list', () => {
      expect(jobProfiles.searchResults.list.isPresent).to.be.true;
    });

    it('should display only default headers in correct order', () => {
      expect(jobProfiles.searchResults.list.headers(0).text).to.equal(translations.name);
      expect(jobProfiles.searchResults.list.headers(1).text).to.equal(translations.updated);
      expect(jobProfiles.searchResults.list.headers(2).text).to.equal(translations.updatedBy);
      expect(jobProfiles.searchResults.list.columnCount).to.equal(3);
    });
  });

  describe('rendering JobProfiles with filled profiles list and custom field', () => {
    const customColumnName = 'description';
    const customTitleIdKey = 'name';
    const customListProperties = {
      columnMapping: { [customColumnName]: customColumnName },
      columnWidths: { [customColumnName]: '100px' },
      visibleColumns: [
        ...Object.values(DEFAULT_JOB_PROFILES_COLUMNS),
        customColumnName,
      ],
    };

    const parentResources = buildResources({
      resourceName: 'jobProfiles',
      records: jobProfilesData,
      hasLoaded: true,
    });

    beforeEach(async () => {
      await mountWithContext(
        <JobProfilesContainer
          customFormatters={{ format: record => record.description }}
          parentResources={parentResources}
          customProperties={{ titleId: `stripes-data-transfer-components.${customTitleIdKey}` }}
          customListProperties={customListProperties}
        />
      );
    });

    it('should display job profiles list', () => {
      expect(jobProfiles.searchResults.list.isPresent).to.be.true;
    });

    it('should display custom title', () => {
      expect(jobProfiles.header.title.labelText).to.equal(translations[customTitleIdKey]);
    });

    it('should display custom field in correct order', () => {
      expect(jobProfiles.searchResults.list.headers(0).text).to.equal(translations.name);
      expect(jobProfiles.searchResults.list.headers(1).text).to.equal(translations.updated);
      expect(jobProfiles.searchResults.list.headers(2).text).to.equal(translations.updatedBy);
      expect(jobProfiles.searchResults.list.headers(3).text).to.equal(customColumnName);
      expect(jobProfiles.searchResults.list.columnCount).to.equal(4);
    });

    it('should display correct names', () => {
      expect(jobProfiles.searchResults.getCellContent(0, 0)).to.equal('A Lorem ipsum 1');
      expect(jobProfiles.searchResults.getCellContent(1, 0)).to.equal('A Lorem ipsum 2');
      expect(jobProfiles.searchResults.getCellContent(2, 0)).to.equal('B Lorem ipsum 1');
      expect(jobProfiles.searchResults.getCellContent(3, 0)).to.equal('B Lorem ipsum 2');
    });

    it('should display update dates', () => {
      expect(jobProfiles.searchResults.getCellContent(0, 1)).to.equal('12/4/2018');
      expect(jobProfiles.searchResults.getCellContent(1, 1)).to.equal('11/4/2018');
      expect(jobProfiles.searchResults.getCellContent(2, 1)).to.equal('12/7/2018');
      expect(jobProfiles.searchResults.getCellContent(3, 1)).to.equal('12/7/2018');
    });

    it('should display correct updated by values', () => {
      expect(jobProfiles.searchResults.getCellContent(0, 2)).to.equal('Donald S');
      expect(jobProfiles.searchResults.getCellContent(1, 2)).to.equal('Mark K');
      expect(jobProfiles.searchResults.getCellContent(2, 2)).to.equal('Kevin Madison');
      expect(jobProfiles.searchResults.getCellContent(3, 2)).to.equal('Denis Lion');
    });

    it('should display correct descriptions', () => {
      expect(jobProfiles.searchResults.getCellContent(0, 3)).to.equal('Description 1');
      expect(jobProfiles.searchResults.getCellContent(1, 3)).to.equal('Description 2');
      expect(jobProfiles.searchResults.getCellContent(2, 3)).to.equal('Description 3');
      expect(jobProfiles.searchResults.getCellContent(3, 3)).to.equal('Description 4');
    });
  });
});
