import { useFormattedMCLProps } from '../../utils/useFormattedMCLProps';

export const DEFAULT_MAPPING_PROFILES_COLUMNS = {
  NAME: 'name',
  FOLIO_RECORD: 'folioRecord',
  UPDATED: 'updated',
  UPDATED_BY: 'updatedBy',
};

const DEFAULT_MAPPING_PROFILES_COLUMN_MAPPING = {
  name: 'stripes-data-transfer-components.name',
  folioRecord: 'stripes-data-transfer-components.folioRecordType',
  updated: 'stripes-data-transfer-components.updated',
  updatedBy: 'stripes-data-transfer-components.updatedBy',
};

const DEFAULT_MAPPING_PROFILES_COLUMN_WIDTHS = {
  name: '300px',
  updated: '100px',
  updatedBy: '250px',
};

export const useMappingProfilesProperties = (customProps = {}) => {
  return useFormattedMCLProps(
    {
      columnWidths: { ...DEFAULT_MAPPING_PROFILES_COLUMN_WIDTHS },
      columnMapping: { ...DEFAULT_MAPPING_PROFILES_COLUMN_MAPPING },
      visibleColumns: [...Object.values(DEFAULT_MAPPING_PROFILES_COLUMNS)],
    },
    customProps
  );
};
