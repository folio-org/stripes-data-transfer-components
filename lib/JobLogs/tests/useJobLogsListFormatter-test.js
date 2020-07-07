import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import jobExecution from '../../tests/jobExecution';
import { useJobLogsListFormatter } from '../useJobLogsListFormatter';
import { getHookExecutionResult } from '../../../test/bigtest/helpers';

describe('JobLogs > useJobLogsListFormatter', () => {
  describe('executing without custom props', () => {
    const jobLogsListFormatter = getHookExecutionResult(useJobLogsListFormatter);

    it('should format runBy field value correctly', () => {
      const {
        runBy: {
          firstName,
          lastName,
        },
      } = jobExecution;

      expect(jobLogsListFormatter.runBy(jobExecution)).to.equal(`${firstName} ${lastName}`);
      expect(jobLogsListFormatter.runBy({})).to.equal('');
    });

    it('should format completed date field value correctly', () => {
      expect(jobLogsListFormatter.completedDate(jobExecution)).to.equal('11/21/2018, 12:38 AM');
    });

    it('should format job profile name field value correctly', () => {
      const { jobProfileName } = jobExecution;

      expect(jobLogsListFormatter.jobProfileName(jobExecution)).to.equal(jobProfileName);
    });

    it('should format total records field value correctly if records are exported', () => {
      const { progress: { total } } = jobExecution;

      expect(jobLogsListFormatter.totalRecords(jobExecution)).to.equal(total);
    });

    it('should format total records field value correctly if no records are exported', () => {
      const failedJobExecution = {
        progress: {
          exported: 0,
          total: 1,
        },
      };

      expect(jobLogsListFormatter.totalRecords(failedJobExecution)).to.equal('');
    });

    it('should format file name field value correctly', () => {
      expect(jobLogsListFormatter.fileName(jobExecution)).to.equal(jobExecution.fileName);
    });

    it('should format hrId  field value correctly', () => {
      expect(jobLogsListFormatter.hrId(jobExecution)).to.equal(jobExecution.hrId);
    });
  });

  describe('executing with custom props', () => {
    const customFormatters = { sourcePath: record => record.sourcePath };
    const jobLogsListFormatter = getHookExecutionResult(useJobLogsListFormatter, [customFormatters]);

    it('should support custom formatters - sourcePath', () => {
      expect(jobLogsListFormatter.sourcePath(jobExecution)).to.equal(jobExecution.sourcePath);
    });
  });
});
