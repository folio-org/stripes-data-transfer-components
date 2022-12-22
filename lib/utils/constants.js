export const SORT_TYPES = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
};

export const DEFAULT_FETCHER_UPDATE_INTERVAL = 5000;

export const getCapitalized = rt => {
  const lowerCase = rt.toLowerCase();

  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};

export const ACTION_TYPES = {
  CREATE: {
    type: 'CREATE',
    iconKey: 'plus-sign',
    captionId: 'stripes-data-transfer-components.create',
  },
  MODIFY: {
    type: 'MODIFY',
    iconKey: 'edit',
    captionId: 'stripes-data-transfer-components.modify',
  },
  UPDATE: {
    type: 'UPDATE',
    iconKey: 'replace',
    captionId: 'stripes-data-transfer-components.update',
  },
};

export const PROFILE_TYPES_FOR_URL = {
  jobProfiles: 'job-profiles',
  matchProfiles: 'match-profiles',
  actionProfiles: 'action-profiles',
  mappingProfiles: 'mapping-profiles',
};

export const STRING_CAPITALIZATION_MODES = {
  ALL: 0,
  FIRST: 1,
  WORDS: 2,
};

export const STRING_CAPITALIZATION_EXCLUSIONS = [
  'ID', 'HRID', 'MARC', 'ISBN', 'PO', 'TBD',
];

export const HTML_LANG_DIRECTIONS = {
  LEFT_TO_RIGHT: 'ltr',
  RIGHT_TO_LEFT: 'rtl',
};

export const MARC_FIELD_CONSTITUENT = {
  FIELD: 'field',
  INDICATOR1: 'indicator1',
  INDICATOR2: 'indicator1',
  SUBFIELD: 'subfield',
};

export const SYSTEM_USER_NAME = 'System';
