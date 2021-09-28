import React from 'react';
import { noop } from 'lodash';
import {
  screen, render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../test/jest/__mock__';
import '../../../test/jest/__new_mock__';

import { JobsListAccordion } from '.';
import { ItemFormatter } from '../tests/item-formatter';
import { jobExecution } from '../../tests/jobExecution';

const renderJobListAccordion = (
  hasLoaded,
  itemFormatter = noop,
  titleId = null,
  emptyMessageId = null,
  jobs = []
) => {
  render(
    <JobsListAccordion
      jobs={jobs}
      hasLoaded={hasLoaded}
      itemFormatter={itemFormatter}
      titleId={titleId}
      emptyMessageId={emptyMessageId}
    />
  );
};

describe('JobsListAccordion', () => {
  const titleId = 'accordion title';
  const emptyMessageId = 'noRunningJobsMessage';

  describe('rendering jobs with loaded status and 1 item', () => {
    it('should display accordion', () => {
      renderJobListAccordion(true, ItemFormatter, titleId, emptyMessageId, [jobExecution]);

      expect(document.querySelector('[data-test-accordion-section]')).toBeVisible();
    });

    it('should display the correct accordion title', () => {
      renderJobListAccordion(true, ItemFormatter, titleId, emptyMessageId, [jobExecution]);

      expect(screen.getByText(titleId)).toBeVisible();
    });

    it('should display collapse accordion button', () => {
      renderJobListAccordion(true, ItemFormatter, titleId, emptyMessageId, [jobExecution]);

      expect(screen.getByRole('button')).toBeEnabled();
    });

    it('should expand accordion with items by default', () => {
      renderJobListAccordion(true, ItemFormatter, titleId, emptyMessageId, [jobExecution]);

      expect(screen.getByRole('region')).toBeVisible();
      expect(screen.getByRole('region')).toHaveAttribute('class', 'content expanded');
    });

    it('should display jobs list', () => {
      renderJobListAccordion(true, ItemFormatter, titleId, emptyMessageId, [jobExecution]);

      expect(screen.getByTestId('jobs-list-container')).toBeVisible();
    });

    it('clicking on collapse button', () => {
      renderJobListAccordion(true, ItemFormatter, titleId, emptyMessageId, [jobExecution]);

      userEvent.click(screen.getByRole('button'));

      expect(screen.getByText('1')).toBeVisible();
      expect(screen.getByRole('region')).toHaveAttribute('class', 'content');
    });
  });

  describe('rendering jobs with loaded status and 0 items', () => {
    it('should display accordion', () => {
      renderJobListAccordion(true, ItemFormatter, titleId, emptyMessageId);

      expect(screen.getByRole('region')).toBeVisible();
      expect(screen.getByRole('region')).toHaveAttribute('class', 'content expanded');
    });

    it('should display the correct accordion title', () => {
      renderJobListAccordion(true, ItemFormatter, titleId, emptyMessageId);

      expect(screen.getByText(titleId)).toBeVisible();
    });

    it('should display correct empty message in the list', () => {
      renderJobListAccordion(true, ItemFormatter, titleId, emptyMessageId);

      expect(screen.getByText(emptyMessageId)).toBeVisible();
    });

    it('should shrink accordion', () => {
      renderJobListAccordion(false, ItemFormatter, titleId, emptyMessageId);

      userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('region')).toHaveAttribute('class', 'content');
      expect(document.querySelector('.spinner')).toBeVisible();
    });
  });
});
