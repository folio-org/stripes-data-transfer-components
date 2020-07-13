import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect } from 'chai';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';

import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

import translation from '../../../translations/stripes-data-transfer-components/en';
import { mountWithContext } from '../../../test/bigtest/helpers';
import { PreloaderInteractor } from '../../Preloader/tests/interactor';
import { useJobLogsListFormatter } from '../useJobLogsListFormatter';
import {
  DEFAULT_JOB_LOGS_COLUMNS,
  useJobLogsProperties,
} from '../columnProperties';
import { jobsLogs } from '../../tests/jobsLogs';
import { JobLogs } from '../JobLogs';

const containerSize = {
  height: '1000px',
  width: '1000px',
};

const JobLogsContainer = ({
  hasLoaded,
  contentData,
  customFormatters = {},
  customListProperties,
}) => (
  <Router>
    <div style={containerSize}>
      <JobLogs
        formatter={useJobLogsListFormatter(customFormatters)}
        hasLoaded={hasLoaded}
        contentData={contentData}
        {...useJobLogsProperties(customListProperties)}
      />
    </div>
  </Router>
);

describe('Job logs list', () => {
  const logsList = new MultiColumnListInteractor('#job-logs-list');
  const preloaderInteractor = new PreloaderInteractor();
  const getCellContent = (row, cell) => logsList.rows(row).cells(cell).content;

  describe('rendering not loaded job logs with default props', () => {
    beforeEach(async () => {
      await mountWithContext(
        <JobLogsContainer
          hasLoaded={false}
          contentData={[]}
        />
      );
    });

    it('should not display logs lists', () => {
      expect(logsList.isPresent).to.be.false;
    });

    it('should display preloader', () => {
      expect(preloaderInteractor.isPresent).to.be.true;
    });
  });

  describe('rendering loaded job logs with default props and empty logs list', () => {
    beforeEach(async () => {
      await mountWithContext(<JobLogsContainer
        hasLoaded
        contentData={[]}
      />);
    });

    it('should not display logs lists', () => {
      expect(logsList.isPresent).to.be.false;
    });

    it('should not display preloader', () => {
      expect(preloaderInteractor.isPresent).to.be.false;
    });
  });

  describe('rendering loaded job logs with default props and empty logs list', () => {
    beforeEach(async () => {
      await mountWithContext(
        <JobLogsContainer
          hasLoaded
          contentData={jobsLogs}
        />
      );
    });

    it('should display logs lists', () => {
      expect(logsList.isPresent).to.be.true;
    });

    it('should not display preloader', () => {
      expect(preloaderInteractor.isPresent).to.be.false;
    });

    it('should display only default headers in correct order', () => {
      expect(logsList.headers(0).text).to.equal(translation.fileName);
      expect(logsList.headers(1).text).to.equal(translation.jobExecutionHrId);
      expect(logsList.headers(2).text).to.equal(translation.jobProfileName);
      expect(logsList.headers(3).text).to.equal(translation.records);
      expect(logsList.headers(4).text).to.equal(translation.jobCompletedDate);
      expect(logsList.headers(5).text).to.equal(translation.runBy);
      expect(logsList.columnCount).to.equal(6);
    });

    it('should render the correct number of rows', () => {
      expect(logsList.rowCount).to.equal(4);
    });

    it('should be sorted by "completedDate" descending by default', () => {
      expect(getCellContent(0, 4)).to.equal('11/11/2018, 2:10 PM');
      expect(getCellContent(1, 4)).to.equal('11/5/2018, 2:22 PM');
      expect(getCellContent(2, 4)).to.equal('11/5/2018, 2:21 PM');
      expect(getCellContent(3, 4)).to.equal('11/5/2018, 1:08 PM');
    });

    describe('clicking on file name field', () => {
      beforeEach(async () => {
        await logsList.headers(0).click();
      });

      it('should not change items order', () => {
        expect(getCellContent(0, 4)).to.equal('11/11/2018, 2:10 PM');
        expect(getCellContent(1, 4)).to.equal('11/5/2018, 2:22 PM');
        expect(getCellContent(2, 4)).to.equal('11/5/2018, 2:21 PM');
        expect(getCellContent(3, 4)).to.equal('11/5/2018, 1:08 PM');
      });
    });

    describe('clicking on id field', () => {
      beforeEach(async () => {
        await logsList.headers(1).click();
      });

      it('should render in ascending order', () => {
        expect(getCellContent(0, 1)).to.equal('1');
        expect(getCellContent(1, 1)).to.equal('2');
        expect(getCellContent(2, 1)).to.equal('3');
        expect(getCellContent(3, 1)).to.equal('4');
      });

      it('should render in descending order', () => {
        expect(getCellContent(0, 1)).to.equal('4');
        expect(getCellContent(1, 1)).to.equal('3');
        expect(getCellContent(2, 1)).to.equal('2');
        expect(getCellContent(3, 1)).to.equal('1');
      });

      it('should have correct query in url for ascending order', () => {
        expect(window.location.href.includes('direction=ascending&sort=hrId')).to.be.true;
      });

      it('should have correct query in url for descending order', () => {
        expect(window.location.href.includes('direction=descending&sort=hrId')).to.be.true;
      });
    });

    describe('clicking on ended running date field', () => {
      beforeEach(async () => {
        await logsList.headers(4).click();
      });

      it('should render in ascending order', () => {
        expect(getCellContent(0, 4)).to.equal('11/5/2018, 1:08 PM');
        expect(getCellContent(1, 4)).to.equal('11/5/2018, 2:21 PM');
        expect(getCellContent(2, 4)).to.equal('11/5/2018, 2:22 PM');
        expect(getCellContent(3, 4)).to.equal('11/11/2018, 2:10 PM');
      });

      it('should have correct query in url for descending order', () => {
        expect(window.location.href.includes('direction=descending&sort=completedDate')).to.be.true;
      });

      it('should have correct query in url for ascending order', () => {
        expect(window.location.href.includes('direction=ascending&sort=completedDate')).to.be.true;
      });
    });

    describe('clicking on runBy field', () => {
      beforeEach(async () => {
        await logsList.headers(5).click();
      });

      it('should render in ascending order', () => {
        expect(getCellContent(0, 5)).to.equal('Elliot Lane');
        expect(getCellContent(1, 5)).to.equal('Elliot Lane');
        expect(getCellContent(2, 5)).to.equal('Jay Morrowitz');
        expect(getCellContent(3, 5)).to.equal('Ozzy Campenshtorm');
      });

      it('should render in descending order', () => {
        expect(getCellContent(0, 5)).to.equal('Ozzy Campenshtorm');
        expect(getCellContent(1, 5)).to.equal('Jay Morrowitz');
        expect(getCellContent(2, 5)).to.equal('Elliot Lane');
        expect(getCellContent(3, 5)).to.equal('Elliot Lane');
      });

      it('should have correct query in url for ascending order', () => {
        expect(window.location.href.includes('direction=ascending&sort=runBy')).to.be.true;
      });

      it('should have correct query in url for descending order', () => {
        expect(window.location.href.includes('direction=descending&sort=runBy')).to.be.true;
      });
    });

    describe('clicking on totalRecords field', () => {
      beforeEach(async () => {
        await logsList.headers(3).click();
      });

      it('should render in ascending order', () => {
        expect(getCellContent(0, 3)).to.equal('7');
        expect(getCellContent(1, 3)).to.equal('9');
        expect(getCellContent(2, 3)).to.equal('10');
        expect(getCellContent(3, 3)).to.equal('46');
      });

      it('should render in descending order', () => {
        expect(getCellContent(0, 3)).to.equal('46');
        expect(getCellContent(1, 3)).to.equal('10');
        expect(getCellContent(2, 3)).to.equal('9');
        expect(getCellContent(3, 3)).to.equal('7');
      });

      it('should have correct query in url for ascending order', () => {
        expect(window.location.href.includes('direction=ascending&sort=totalRecords')).to.be.true;
      });

      it('should have correct query in url for descending order', () => {
        expect(window.location.href.includes('direction=descending&sort=totalRecords')).to.be.true;
      });
    });

    describe('clicking on job profile name field', () => {
      beforeEach(async () => {
        await logsList.headers(2).click();
      });

      it('should render in ascending order', () => {
        expect(getCellContent(0, 2)).to.equal('BIB profile with customized Holdings');
        expect(getCellContent(1, 2)).to.equal('Multilingual support check');
        expect(getCellContent(2, 2)).to.equal('Standard BIB profile');
        expect(getCellContent(3, 2)).to.equal('Standard BIB profile');
      });

      it('should render in descending order', () => {
        expect(getCellContent(0, 2)).to.equal('Standard BIB profile');
        expect(getCellContent(1, 2)).to.equal('Standard BIB profile');
        expect(getCellContent(2, 2)).to.equal('Multilingual support check');
        expect(getCellContent(3, 2)).to.equal('BIB profile with customized Holdings');
      });

      it('should have correct query in url for ascending order', () => {
        expect(window.location.href.includes('direction=ascending&sort=jobProfileName')).to.be.true;
      });

      it('should have correct query in url for descending order', () => {
        expect(window.location.href.includes('direction=descending&sort=jobProfileName')).to.be.true;
      });
    });
  });

  describe('rendering loaded job logs with custom  list properties', () => {
    const customColumnName = 'sourcePath';
    const customFormatters = { sourcePath: item => item.sourcePath };
    const customListProperties = {
      columnMapping: { [customColumnName]: customColumnName },
      visibleColumns: [
        ...Object.values(DEFAULT_JOB_LOGS_COLUMNS),
        customColumnName,
      ],
    };

    beforeEach(async () => {
      await mountWithContext(
        <JobLogsContainer
          hasLoaded
          contentData={jobsLogs}
          customFormatters={customFormatters}
          customListProperties={customListProperties}
        />
      );
    });

    it('should add custom header in correct order', () => {
      expect(logsList.headers(0).text).to.equal(translation.fileName);
      expect(logsList.headers(1).text).to.equal(translation.jobExecutionHrId);
      expect(logsList.headers(2).text).to.equal(translation.jobProfileName);
      expect(logsList.headers(3).text).to.equal(translation.records);
      expect(logsList.headers(4).text).to.equal(translation.jobCompletedDate);
      expect(logsList.headers(5).text).to.equal(translation.runBy);
      expect(logsList.headers(6).text).to.equal(customColumnName);
      expect(logsList.columnCount).to.equal(7);
    });

    it('should display correct custom field value', () => {
      expect(getCellContent(0, 6)).to.equal('path');
    });
  });
});
