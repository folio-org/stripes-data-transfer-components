import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  screen, render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';
import '../../../test/jest/__new_mock__';

import { JobProfiles } from './JobProfiles';
import {
  useJobProfilesProperties,
  DEFAULT_JOB_PROFILES_COLUMNS,
} from './columnProperties';
import { useListFormatter } from '../../ListFormatter';
import { jobProfilesData } from './tests/jobProfilesData';
import {
  buildMutator,
  buildResources,
} from '../../../test/helpers';

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({
  width: 1920,
  height: 1080,
}));

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
  describe('rendering JobProfiles with empty profiles list', () => {
    const parentResources = buildResources({
      resourceName: 'profiles',
      records: [],
      hasLoaded: false,
    });

    it('should display header with correct title', () => {
      render(<JobProfilesContainer parentResources={parentResources} />);

      expect(screen.getByRole('heading')).toBeVisible();
      expect(screen.getByText('stripes-data-transfer-components.jobProfilesTitle')).toBeVisible();
    });

    it('should display correct subtitle', () => {
      render(<JobProfilesContainer parentResources={parentResources} />);

      expect(screen.getByText('stripes-data-transfer-components.jobProfilesCount')).toBeVisible();
    });

    it('should contain search form', () => {
      render(<JobProfilesContainer parentResources={parentResources} />);

      expect(screen.getByRole('searchbox')).toBeVisible();
    });
  });

  describe('rendering JobProfiles with filled profiles list and default columns', () => {
    const parentResources = buildResources({
      resourceName: 'jobProfiles',
      records: jobProfilesData,
      hasLoaded: true,
    });

    it('should display only default headers', () => {
      render(<JobProfilesContainer parentResources={parentResources} />);

      const headers = [
        'stripes-data-transfer-components.name',
        'stripes-data-transfer-components.updated',
        'stripes-data-transfer-components.updatedBy',
      ];

      headers.forEach(el => expect(screen.getByText(el)).toBeVisible());
    });
  });

  describe('rendering JobProfiles with filled profiles list and custom field', () => {
    const customColumnName = 'description';
    const customTitleIdKey = 'Custom-name';

    const parentResources = buildResources({
      resourceName: 'jobProfiles',
      records: jobProfilesData,
      hasLoaded: true,
    });

    const customListProperties = {
      columnMapping: { [customColumnName]: customColumnName },
      columnWidths: { [customColumnName]: '100px' },
      visibleColumns: [
        ...Object.values(DEFAULT_JOB_PROFILES_COLUMNS),
        customColumnName,
      ],
    };

    it('should display custom title', () => {
      render(
        <JobProfilesContainer
          customFormatters={{ format: record => record.description }}
          parentResources={parentResources}
          customListProperties={customListProperties}
          customProperties={{ titleId: `stripes-data-transfer-components.${customTitleIdKey}` }}
        />
      );

      expect(screen.getByText(`stripes-data-transfer-components.${customTitleIdKey}`)).toBeVisible();
    });

    it('should display custom field in correct order', () => {
      render(
        <JobProfilesContainer
          customFormatters={{ format: record => record.description }}
          parentResources={parentResources}
          customProperties={{ titleId: `stripes-data-transfer-components.${customTitleIdKey}` }}
          customListProperties={customListProperties}
        />
      );

      const headers = [
        'stripes-data-transfer-components.name',
        'stripes-data-transfer-components.updated',
        'stripes-data-transfer-components.updatedBy',
        customColumnName,
      ];

      headers.forEach(el => expect(screen.getByText(el)).toBeVisible());
    });

    it('should display correct names', () => {
      render(
        <JobProfilesContainer
          customFormatters={{ format: record => record.description }}
          parentResources={parentResources}
          customProperties={{ titleId: `stripes-data-transfer-components.${customTitleIdKey}` }}
          customListProperties={customListProperties}
        />
      );

      const names = [
        'A Lorem ipsum 1',
        'A Lorem ipsum 2',
        'B Lorem ipsum 1',
        'B Lorem ipsum 2',
      ];

      names.forEach(el => expect(screen.getByText(el)).toBeVisible());
    });

    it('should display correct descriptions', () => {
      render(
        <JobProfilesContainer
          customFormatters={{ format: record => record.description }}
          parentResources={parentResources}
          customProperties={{ titleId: `stripes-data-transfer-components.${customTitleIdKey}` }}
          customListProperties={customListProperties}
        />
      );

      const descriptions = [
        'Description 1',
        'Description 2',
        'Description 3',
        'Description 4',
      ];

      descriptions.forEach(el => expect(screen.getByText(el)).toBeVisible());
    });
  });
});
