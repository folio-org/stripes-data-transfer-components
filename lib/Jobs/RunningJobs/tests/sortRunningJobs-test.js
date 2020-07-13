import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import { sortRunningJobs } from '../sortRunningJobs';

const runningJobsUnsorted = [
  { startedDate: '2018-10-19T18:33:45.000' },
  { startedDate: '2018-11-22T17:16:13.000' },
  { startedDate: '2018-10-19T14:32:29.000' },
  { startedDate: '2018-11-22T15:54:44.000' },
  { startedDate: '2018-10-19T14:32:29.000' },
];

const runningJobsSorted = [
  { startedDate: '2018-11-22T17:16:13.000' },
  { startedDate: '2018-11-22T15:54:44.000' },
  { startedDate: '2018-10-19T18:33:45.000' },
  { startedDate: '2018-10-19T14:32:29.000' },
  { startedDate: '2018-10-19T14:32:29.000' },
];

describe('sortRunningJob', () => {
  it('should sort correctly by date', () => {
    expect(sortRunningJobs(runningJobsUnsorted)).to.deep.equal(runningJobsSorted);
  });
});
