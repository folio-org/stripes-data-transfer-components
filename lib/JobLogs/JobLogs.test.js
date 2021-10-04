import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  render, screen, within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../test/jest/__mock__';

import { useJobLogsListFormatter } from './useJobLogsListFormatter';
import { JobLogs } from './JobLogs';
import { jobsLogs } from '../tests/jobsLogs';
import { useJobLogsProperties } from './columnProperties';

const containerSize = {
  height: '1000px',
  width: '1000px',
};

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({
  width: 1920,
  height: 1080,
}));

const JobLogsContainer = ({
  hasLoaded,
  contentData,
  customFormatters = {},
  customListProperties,
}) => (
  <BrowserRouter>
    <div style={containerSize}>
      <JobLogs
        formatter={useJobLogsListFormatter(customFormatters)}
        hasLoaded={hasLoaded}
        contentData={contentData}
        {...useJobLogsProperties(customListProperties)}
      />
    </div>
  </BrowserRouter>
);

describe('Job logs list', () => {
  describe('rendering not loaded job logs with default props', () => {
    const renderNotLoadedJobLogs = () => {
      render(
        <JobLogsContainer
          hasLoaded={false}
          contentData={[]}
        />
      );
    };

    it('should display preloader', () => {
      renderNotLoadedJobLogs();

      expect(document.querySelector('[data-test-preloader]')).toBeVisible();
    });
  });

  describe('rendering loaded job logs with default props and empty logs list', () => {
    const renderLoadedJobWithoutLogs = () => {
      render(
        <JobLogsContainer
          hasLoaded
          contentData={jobsLogs}
        />
      );
    };

    it('should display logs lists', () => {
      renderLoadedJobWithoutLogs();

      expect(screen.getByRole('grid')).toBeVisible();
    });

    it('should display only default headers', () => {
      renderLoadedJobWithoutLogs();

      const logList = screen.getByRole('grid');
      const rowList = screen.getAllByRole('row');

      const columHeaders = [
        'stripes-data-transfer-components.fileName',
        'stripes-data-transfer-components.jobExecutionHrId',
        'stripes-data-transfer-components.jobProfileName',
        'stripes-data-transfer-components.records',
        'stripes-data-transfer-components.jobCompletedDate',
        'stripes-data-transfer-components.runBy',
      ];

      columHeaders.forEach(el => expect(within(logList).getByText(el)).toBeVisible());
      expect(rowList.length).toBe(5);
    });

    it('should be sorted by "completedDate" descending by default', () => {
      renderLoadedJobWithoutLogs();

      const completedDate = screen.getAllByText('2018-11-05');

      completedDate.some(el => expect(el).toBeVisible());
    });

    describe('clicking on id field', () => {
      it('should have correct query in url for ascending order', () => {
        renderLoadedJobWithoutLogs();

        const hrIdBtn = screen.getByRole('button', { name: 'stripes-data-transfer-components.jobExecutionHrId' });

        userEvent.click(hrIdBtn);

        expect(window.location.href.includes('direction=ascending&sort=hrId')).toBeTruthy();
      });

      it('should have correct query in url for descending order', () => {
        renderLoadedJobWithoutLogs();

        const hrIdBtn = screen.getByRole('button', { name: 'stripes-data-transfer-components.jobExecutionHrId' });

        userEvent.click(hrIdBtn);

        expect(window.location.href.includes('direction=descending&sort=hrId')).toBeTruthy();
      });
    });

    describe('clicking on runBy field', () => {
      it('should have correct query in url for ascending order', () => {
        renderLoadedJobWithoutLogs();

        const runByBtn = screen.getByRole('button', { name: 'stripes-data-transfer-components.runBy' });

        userEvent.click(runByBtn);

        expect(window.location.href.includes('direction=ascending&sort=runBy')).toBeTruthy();
      });

      it('should have correct query in url for ascending order', () => {
        renderLoadedJobWithoutLogs();

        const runByBtn = screen.getByRole('button', { name: 'stripes-data-transfer-components.runBy' });

        userEvent.click(runByBtn);

        expect(window.location.href.includes('direction=descending&sort=runBy')).toBeTruthy();
      });
    });

    describe('clicking on totalRecords field', () => {
      it('should have correct query in url for ascending order', () => {
        renderLoadedJobWithoutLogs();

        const recordsBtn = screen.getByRole('button', { name: 'stripes-data-transfer-components.records' });

        userEvent.click(recordsBtn);

        expect(window.location.href.includes('direction=ascending&sort=totalRecords')).toBeTruthy();
      });

      it('should have correct query in url for descending order', () => {
        renderLoadedJobWithoutLogs();

        const recordsBtn = screen.getByRole('button', { name: 'stripes-data-transfer-components.records' });

        userEvent.click(recordsBtn);

        expect(window.location.href.includes('direction=descending&sort=totalRecords')).toBeTruthy();
      });
    });

    describe('clicking on job profile name field', () => {
      it('should have correct query in url for ascending order', () => {
        renderLoadedJobWithoutLogs();

        const nameFieldBtn = screen.getByRole('button', { name: 'stripes-data-transfer-components.jobProfileName' });

        userEvent.click(nameFieldBtn);

        expect(window.location.href.includes('direction=ascending&sort=jobProfileName')).toBeTruthy();
      });

      it('should have correct query in url for ascending order', () => {
        renderLoadedJobWithoutLogs();

        const nameFieldBtn = screen.getByRole('button', { name: 'stripes-data-transfer-components.jobProfileName' });

        userEvent.click(nameFieldBtn);

        expect(window.location.href.includes('direction=descending&sort=jobProfileName')).toBeTruthy();
      });
    });
  });
});
