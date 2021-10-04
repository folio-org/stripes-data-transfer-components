/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  screen, render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { MappingProfiles } from './MappingProfiles';
import {
  useMappingProfilesProperties,
  DEFAULT_MAPPING_PROFILES_COLUMNS,
} from './columnProperties';
import { useMappingProfileListFormatter } from './useMappingProfileListFormatter';
import { mappingProfilesData } from './tests/mappingProfilesData';
import {
  buildMutator,
  buildResources,
} from '../../../test/helpers';

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({
  width: 1920,
  height: 1080,
}));

const parentMutator = buildMutator();

const renderMappingProfileContainer = ({
  parentResources,
  customListProperties,
  formatter = {},
}) => render(
  <Router>
    <MappingProfiles
      parentMutator={parentMutator}
      parentResources={parentResources}
      formatter={useMappingProfileListFormatter(formatter)}
      {...useMappingProfilesProperties(customListProperties)}
    />
  </Router>
);

describe('MappingProfiles', () => {
  describe('rendering MappingProfiles with filled profiles list and default list properties', () => {
    const parentResources = buildResources({
      resourceName: 'mappingProfiles',
      records: mappingProfilesData,
      hasLoaded: true,
    });

    it('should display only default headers', () => {
      renderMappingProfileContainer({ parentResources });

      const headers = [
        'stripes-data-transfer-components.name',
        'stripes-data-transfer-components.folioRecordType',
        'stripes-data-transfer-components.updated',
        'stripes-data-transfer-components.updatedBy',
      ];

      headers.forEach(el => expect(screen.getByText(el)).toBeVisible());
    });
  });

  describe('rendering MappingProfiles with filled profiles list and custom field', () => {
    const customColumnName = 'description';

    const customListProperties = {
      columnMapping: { [customColumnName]: customColumnName },
      columnWidths: { [customColumnName]: '100px' },
      visibleColumns: [
        ...Object.values(DEFAULT_MAPPING_PROFILES_COLUMNS),
        customColumnName,
      ],
    };

    const parentResources = buildResources({
      resourceName: 'mappingProfiles',
      records: mappingProfilesData,
      hasLoaded: true,
    });

    it('should display correct names', () => {
      renderMappingProfileContainer({
        parentResources,
        customListProperties,
        formatter: { format: record => record.outputFormat },
      });

      const names = [
        'AP holdings-MARC Bib',
        'AP Instance',
        'AP item from MARC',
        'Brief MARC Bib from MARC',
      ];

      names.forEach(el => expect(screen.getByText(el)).toBeVisible());
    });

    it('should display folio records types', () => {
      renderMappingProfileContainer({
        parentResources,
        customListProperties,
        formatter: { format: record => record.outputFormat },
      });

      const folioRecordTypes = [
        'stripes-data-transfer-components.recordTypes.holdings',
        'stripes-data-transfer-components.recordTypes.item',
        'stripes-data-transfer-components.recordTypes.instance',
        'stripes-data-transfer-components.recordTypes.item, stripes-data-transfer-components.recordTypes.holdings',
      ];

      folioRecordTypes.forEach(el => expect(screen.getByText(el)).toBeVisible());
    });

    it('should display correct descriptions', () => {
      renderMappingProfileContainer({
        parentResources,
        customListProperties,
        formatter: { format: record => record.outputFormat },
      });

      const descriptionMarcFiles = screen.getAllByText('Use for PurpleVendor approval plan MARC files');

      descriptionMarcFiles.forEach(el => expect(el).toBeVisible());
      expect(screen.getByText('Create new MARC bib - brief')).toBeVisible();
    });
  });
});
