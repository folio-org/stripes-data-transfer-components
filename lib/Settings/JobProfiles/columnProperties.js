import { useFormattedMCLProps } from '../../utils/useFormattedMCLProps';

export const DEFAULT_JOB_PROFILES_COLUMNS = {
  NAME: 'name',
  UPDATED: 'updated',
  UPDATED_BY: 'updatedBy',
};

const DEFAULT_JOB_PROFILES_COLUMN_MAPPING = {
  name: 'stripes-data-transfer-components.name',
  updated: 'stripes-data-transfer-components.updated',
  updatedBy: 'stripes-data-transfer-components.updatedBy',
};

const DEFAULT_JOB_PROFILES_COLUMN_WIDTHS = {
  name: '300px',
  updated: '100px',
  updatedBy: '250px',
};

export const useJobProfilesProperties = (customProps = {}) => {
  return useFormattedMCLProps(
    {
      columnWidths: { ...DEFAULT_JOB_PROFILES_COLUMN_WIDTHS },
      columnMapping: { ...DEFAULT_JOB_PROFILES_COLUMN_MAPPING },
      visibleColumns: [...Object.values(DEFAULT_JOB_PROFILES_COLUMNS)],
    },
    customProps
  );
};
