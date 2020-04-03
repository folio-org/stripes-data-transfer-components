import React from 'react';
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

import { MappingProfilesInteractor } from './interactor';
import mappingProfilesData from './mappingProfilesData';
import translations from '../../../../translations/stripes-data-transfer-components/en';

describe('MappingProfiles', () => {
  const mappingProfiles = new MappingProfilesInteractor();

  describe('rendering MappingProfiles with empty profiles list', () => {
    beforeEach(async () => {
      await mountWithContext(<MappingProfiles />);
    });

    it('should be visible', () => {
      expect(mappingProfiles.isPresent).to.be.true;
    });

    it('should display field mapping profiles section', () => {
      expect(mappingProfiles.paneTitle.text).to.equal(translations.mappingProfilesTitle);
    });

    it('should contain search form', () => {
      expect(mappingProfiles.searchForm.isPresent).to.be.true;
    });

    it('should hide mapping profiles list', () => {
      expect(mappingProfiles.profilesList.isPresent).to.be.false;
    });
  });

  describe('rendering MappingProfiles with filled profiles list and custom field', () => {
    const customColumnName = 'description';

    beforeEach(async () => {
      const visibleColumns = [
        ...Object.values(DEFAULT_MAPPING_PROFILES_COLUMNS),
        customColumnName,
      ];
      const customProperties = {
        columnMapping: {},
        columnWidths: {},
      };

      customProperties.columnMapping[customColumnName] = customColumnName;
      customProperties.columnWidths[customColumnName] = '100px';

      await mountWithContext(
        <MappingProfiles
          contentData={mappingProfilesData}
          formatter={getItemFormatter({ format: record => record.description })}
          {...getMappingProfilesColumnProperties({
            visibleColumns,
            customProperties,
          })}
        />
      );
    });

    it('should display mapping profiles list', () => {
      expect(mappingProfiles.profilesList.isPresent).to.be.true;
    });

    it('should place headers in correct order', () => {
      expect(mappingProfiles.profilesList.headers(0).text).to.equal(translations.name);
      expect(mappingProfiles.profilesList.headers(1).text).to.equal(translations.folioRecordType);
      expect(mappingProfiles.profilesList.headers(2).text).to.equal(translations.updated);
      expect(mappingProfiles.profilesList.headers(3).text).to.equal(translations.updatedBy);
      expect(mappingProfiles.profilesList.headers(4).text).to.equal(customColumnName);
    });

    it('should display correct names', () => {
      expect(mappingProfiles.getCellContent(0, 0)).to.equal('AP holdings-MARC Bib');
      expect(mappingProfiles.getCellContent(1, 0)).to.equal('AP Instance');
      expect(mappingProfiles.getCellContent(2, 0)).to.equal('AP item from MARC');
      expect(mappingProfiles.getCellContent(3, 0)).to.equal('Brief MARC Bib from MARC');
    });

    it('should display folio records types', () => {
      expect(mappingProfiles.getCellContent(0, 1)).to.equal(translations['recordTypes.holdings']);
      expect(mappingProfiles.getCellContent(1, 1)).to.equal(translations['recordTypes.instance']);
      expect(mappingProfiles.getCellContent(2, 1)).to.equal(translations['recordTypes.item']);
      expect(mappingProfiles.getCellContent(3, 1)).to.equal(translations['recordTypes.marc-bib']);
    });

    it('should display update dates', () => {
      expect(mappingProfiles.getCellContent(0, 2)).to.equal('12/4/2018');
      expect(mappingProfiles.getCellContent(1, 2)).to.equal('11/4/2018');
      expect(mappingProfiles.getCellContent(2, 2)).to.equal('12/7/2018');
      expect(mappingProfiles.getCellContent(3, 2)).to.equal('12/7/2018');
    });

    it('should display correct updated by values', () => {
      expect(mappingProfiles.getCellContent(0, 3)).to.equal('John M');
      expect(mappingProfiles.getCellContent(1, 3)).to.equal('Mark D');
      expect(mappingProfiles.getCellContent(2, 3)).to.equal('Block Madyson');
      expect(mappingProfiles.getCellContent(3, 3)).to.equal('Denis Lewis');
    });

    it('should display correct descriptions', () => {
      expect(mappingProfiles.getCellContent(0, 4)).to.equal('Use for PurpleVendor approval plan MARC files');
      expect(mappingProfiles.getCellContent(1, 4)).to.equal('Use for PurpleVendor approval plan MARC files');
      expect(mappingProfiles.getCellContent(2, 4)).to.equal('Use for PurpleVendor approval plan MARC files');
      expect(mappingProfiles.getCellContent(3, 4)).to.equal('Create new MARC bib - brief');
    });
  });
});
