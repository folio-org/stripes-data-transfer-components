import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  screen, render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';
import '../../../test/jest/__new_mock__';

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

const MappingProfileContainer = ({
  parentResources,
  customListProperties,
  formatter = {},
}) => (
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
  describe('rendering MappingProfiles with empty profiles list', () => {
    const parentResources = buildResources({
      resourceName: 'profiles',
      records: [],
      hasLoaded: false,
    });

    it('should display header with correct title', () => {
      render(<MappingProfileContainer parentResources={parentResources} />);

      expect(screen.getByRole('heading')).toBeVisible();
      expect(screen.getByText('stripes-data-transfer-components.mappingProfilesTitle')).toBeVisible();
    });

    it('should display correct subtitle', () => {
      render(<MappingProfileContainer parentResources={parentResources} />);

      expect(screen.getByText('stripes-data-transfer-components.mappingProfilesCount')).toBeVisible();
    });

    it('should contain search form', () => {
      render(<MappingProfileContainer parentResources={parentResources} />);

      expect(screen.getByRole('searchbox')).toBeVisible();
    });
  });

  describe('rendering MappingProfiles with filled profiles list and default list properties', () => {
    const parentResources = buildResources({
      resourceName: 'mappingProfiles',
      records: mappingProfilesData,
      hasLoaded: true,
    });

    it('should display only default headers', () => {
      render(<MappingProfileContainer parentResources={parentResources} />);

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
      render(
        <MappingProfileContainer
          parentResources={parentResources}
          customFormatter={{ format: record => record.outputFormat }}
          customListProperties={customListProperties}
        />
      );

      const names = [
        'AP holdings-MARC Bib',
        'AP Instance',
        'AP item from MARC',
        'Brief MARC Bib from MARC',
      ];

      names.forEach(el => expect(screen.getByText(el)).toBeVisible());
    });

    it('should display folio records types', () => {
      render(
        <MappingProfileContainer
          parentResources={parentResources}
          customFormatter={{ format: record => record.outputFormat }}
          customListProperties={customListProperties}
        />
      );

      const folioRecordTypes = [
        'stripes-data-transfer-components.recordTypes.holdings',
        'stripes-data-transfer-components.recordTypes.item',
        'stripes-data-transfer-components.recordTypes.instance',
        'stripes-data-transfer-components.recordTypes.item, stripes-data-transfer-components.recordTypes.holdings',
      ];

      folioRecordTypes.forEach(el => expect(screen.getByText(el)).toBeVisible());
    });

    it('should display correct descriptions', () => {
      render(
        <MappingProfileContainer
          parentResources={parentResources}
          customFormatter={{ format: record => record.outputFormat }}
          customListProperties={customListProperties}
        />
      );

      const descriptionMarcFiles = screen.getAllByText('Use for PurpleVendor approval plan MARC files');

      descriptionMarcFiles.forEach(el => expect(el).toBeVisible());
      expect(screen.getByText('Create new MARC bib - brief')).toBeVisible();
    });
  });
});
