import {
  FILTERS,
  LOGS_FILTER,
} from './constants';

export const OCLC_CREATE_INSTANCE_JOB_ID = 'd0ebb7b0-2f0f-11eb-adc1-0242ac120002';
export const OCLC_UPDATE_INSTANCE_JOB_ID = '91f9b8d6-d80e-4727-9783-73fb53e3c786';

export const filterConfig = [
  {
    name: FILTERS.ERRORS,
    cql: FILTERS.ERRORS,
    values: [],
  },
  {
    name: FILTERS.ENDED_DATE,
    cql: `${LOGS_FILTER} AND ${FILTERS.ENDED_DATE}`,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.STARTED_DATE,
    cql: `${LOGS_FILTER} AND ${FILTERS.STARTED_DATE}`,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.JOB_PROFILE,
    cql: `${LOGS_FILTER} AND ${FILTERS.JOB_PROFILE}.id`,
    values: [],
  },
  {
    name: FILTERS.USER,
    cql: `${LOGS_FILTER} AND ${FILTERS.USER}`,
    values: [],
  },
  {
    name: FILTERS.SINGLE_RECORD_IMPORTS,
    cql: FILTERS.JOB_PROFILE,
    operator: '=',
    values: [
      {
        name: 'no',
        cql: `\\“id\\“==" NOT jobProfileInfo="\\“id\\“=="${OCLC_CREATE_INSTANCE_JOB_ID}") 
        AND (jobProfileInfo="\\“id\\“==" NOT jobProfileInfo="\\“id\\“=="${OCLC_UPDATE_INSTANCE_JOB_ID}"`,
      },
      {
        name: 'yes',
        cql: `\\“id\\“==${OCLC_CREATE_INSTANCE_JOB_ID}") OR (jobProfileInfo="\\“id\\“==${OCLC_UPDATE_INSTANCE_JOB_ID}`,
      },
    ],
  },
];
