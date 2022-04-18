import React from 'react';
import { noop } from 'lodash';
import {
  screen, render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { JobsList } from '.';
import { ItemFormatter } from '../tests/item-formatter';
import { jobExecution } from '../../tests/jobExecution';

const renderJobList = (
  hasLoaded = true,
  itemFormatter = noop,
  isEmptyMessage = null,
  jobs = []
) => {
  render(
    <JobsList
      jobs={jobs}
      hasLoaded={hasLoaded}
      itemFormatter={itemFormatter}
      isEmptyMessage={isEmptyMessage}
    />
  );
};

describe('JobList', () => {
  const emptyMessage = 'List is empty';

  describe('rendering JobList with loaded state and empty list', () => {
    it('should display JobList component', () => {
      renderJobList(false, ItemFormatter, emptyMessage);

      expect(screen.getByTestId('jobs-list-container')).toBeVisible();
    });

    it('should display preloader', () => {
      renderJobList(false, ItemFormatter, emptyMessage);

      expect(screen.getByTestId('preloader')).toBeVisible();
    });

    it('should display end of item', () => {
      renderJobList(false, ItemFormatter, emptyMessage);

      expect(screen.getByText(/stripes-components.endOfList/i)).toBeVisible();
    });
  });

  describe('rendering JobList with loaded state and empty list', () => {
    it('should display JobList component', () => {
      renderJobList(true, ItemFormatter, emptyMessage);

      expect(screen.getByTestId('jobs-list-container')).toBeVisible();
    });

    it('should display end of item', () => {
      renderJobList(false, ItemFormatter, emptyMessage);

      expect(screen.getByText(/stripes-components.endOfList/i)).toBeVisible();
    });

    it('should display jobs list', () => {
      renderJobList(true, ItemFormatter, emptyMessage);

      expect(screen.getByTestId('jobs-list')).toBeVisible();
    });
  });

  describe('rendering JobList with loaded state, empty list and default empty message', () => {
    it('should display correct empty message', () => {
      renderJobList(true, ItemFormatter);

      expect(document.querySelector('[data-test-empty-message]')).not.toHaveTextContent();
    });
  });

  describe('rendering JobList with loaded state and filled list', () => {
    it('should display JobList component', () => {
      renderJobList(true, ItemFormatter, emptyMessage, [jobExecution]);

      expect(screen.getByTestId('jobs-list')).toBeVisible();
    });

    it('should display item formatter content - list of jobs', () => {
      renderJobList(true, ItemFormatter, emptyMessage, [jobExecution]);

      expect(screen.getByTestId('job-item')).toBeVisible();
    });

    it('should display one job', () => {
      renderJobList(true, ItemFormatter, emptyMessage, [jobExecution]);

      const jobItemsList = screen.getAllByTestId('job-item');

      expect(jobItemsList.length).toBe(1);
    });
  });
});
