import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect } from 'chai';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';

import { mountWithContext } from '../../../../test/bigtest/helpers';
import MappingProfiles from '../MappingProfiles';
import {
  getMappingProfilesColumnProperties,
  DEFAULT_MAPPING_PROFILES_COLUMNS,
} from '../columnProperties';
import getItemFormatter from '../getItemFormatter';

import { SearchAndSortInteractor } from '../../../SearchAndSortPane/tests/SearchAndSortInteractor';
import mappingProfilesData from './mappingProfilesData';
import translations from '../../../../translations/stripes-data-transfer-components/en';
import {
  parentMutator,
  buildParentResources,
} from '../../../../test/bigtest/helpers/stripesResourcesMocks';

describe('MappingProfiles', () => {
  const mappingProfiles = new SearchAndSortInteractor();

  describe('rendering MappingProfiles with empty profiles list', () => {
    const parentResources = buildParentResources({
      resourceName: 'profiles',
      records: [],
      hasLoaded: false,
    });

    beforeEach(async () => {
      await mountWithContext(
        <Router>
          <MappingProfiles
            parentMutator={parentMutator}
            parentResources={parentResources}
          />
        </Router>
      );
    });

    it('should be visible', () => {
      expect(mappingProfiles.isPresent).to.be.true;
    });

    it('should display header', () => {
      expect(mappingProfiles.header.isPresent).to.be.true;
    });

    it('should display field correct title', () => {
      expect(mappingProfiles.header.title.labelText).to.equal(translations.mappingProfilesTitle);
    });

    it('should display field correct subtitle', () => {
      expect(mappingProfiles.header.subTitleText).to.equal('0 field mapping profiles');
    });

    it('should contain search form', () => {
      expect(mappingProfiles.searchForm.isPresent).to.be.true;
    });

    it('should hide mapping profiles list', () => {
      expect(mappingProfiles.searchResults.list.isPresent).to.be.false;
    });
  });

  describe('rendering MappingProfiles with filled profiles list and custom field', () => {
    const customColumnName = 'description';
    const customProperties = getMappingProfilesColumnProperties({
      columnMapping: { [customColumnName]: customColumnName },
      columnWidths: { [customColumnName]: '100px' },
      visibleColumns: [
        ...Object.values(DEFAULT_MAPPING_PROFILES_COLUMNS),
        customColumnName,
      ],
    });

    const parentResources = buildParentResources({
      resourceName: 'mappingProfiles',
      records: mappingProfilesData,
      hasLoaded: true,
    });

    beforeEach(async () => {
      await mountWithContext(
        <Router>
          <MappingProfiles
            formatter={getItemFormatter({ format: record => record.outputFormat })}
            parentMutator={parentMutator}
            parentResources={parentResources}
            {...customProperties}
          />
        </Router>
      );
    });

    it('should display mapping profiles list', () => {
      expect(mappingProfiles.searchResults.list.isPresent).to.be.true;
    });

    it('should place headers in correct order', () => {
      expect(mappingProfiles.searchResults.list.headers(0).text).to.equal(translations.name);
      expect(mappingProfiles.searchResults.list.headers(1).text).to.equal(translations.folioRecordType);
      expect(mappingProfiles.searchResults.list.headers(2).text).to.equal(translations.updated);
      expect(mappingProfiles.searchResults.list.headers(3).text).to.equal(translations.updatedBy);
      expect(mappingProfiles.searchResults.list.headers(4).text).to.equal(customColumnName);
    });

    it('should display correct names', () => {
      expect(mappingProfiles.searchResults.getCellContent(0, 0)).to.equal('AP holdings-MARC Bib');
      expect(mappingProfiles.searchResults.getCellContent(1, 0)).to.equal('AP Instance');
      expect(mappingProfiles.searchResults.getCellContent(2, 0)).to.equal('AP item from MARC');
      expect(mappingProfiles.searchResults.getCellContent(3, 0)).to.equal('Brief MARC Bib from MARC');
    });

    it('should display folio records types', () => {
      expect(mappingProfiles.searchResults.getCellContent(0, 1)).to.equal(translations['recordTypes.holdings']);
      expect(mappingProfiles.searchResults.getCellContent(1, 1)).to.equal(translations['recordTypes.instance']);
      expect(mappingProfiles.searchResults.getCellContent(2, 1)).to.equal(translations['recordTypes.item']);
      expect(mappingProfiles.searchResults.getCellContent(3, 1)).to.equal(`${translations['recordTypes.item']}, ${translations['recordTypes.holdings']}`);
    });

    it('should display update dates', () => {
      expect(mappingProfiles.searchResults.getCellContent(0, 2)).to.equal('12/4/2018');
      expect(mappingProfiles.searchResults.getCellContent(1, 2)).to.equal('11/4/2018');
      expect(mappingProfiles.searchResults.getCellContent(2, 2)).to.equal('12/7/2018');
      expect(mappingProfiles.searchResults.getCellContent(3, 2)).to.equal('12/7/2018');
    });

    it('should display correct updated by values', () => {
      expect(mappingProfiles.searchResults.getCellContent(0, 3)).to.equal('John M');
      expect(mappingProfiles.searchResults.getCellContent(1, 3)).to.equal('Mark D');
      expect(mappingProfiles.searchResults.getCellContent(2, 3)).to.equal('Block Madyson');
      expect(mappingProfiles.searchResults.getCellContent(3, 3)).to.equal('Denis Lewis');
    });

    it('should display correct descriptions', () => {
      expect(mappingProfiles.searchResults.getCellContent(0, 4)).to.equal('Use for PurpleVendor approval plan MARC files');
      expect(mappingProfiles.searchResults.getCellContent(1, 4)).to.equal('Use for PurpleVendor approval plan MARC files');
      expect(mappingProfiles.searchResults.getCellContent(2, 4)).to.equal('Use for PurpleVendor approval plan MARC files');
      expect(mappingProfiles.searchResults.getCellContent(3, 4)).to.equal('Create new MARC bib - brief');
    });
  });
});
