import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../../test/bigtest/helpers';
import JobsListAccordion from '../JobsListAccordion';
import JobsListAccordionInteractor from './interactor';
import jobExecution from '../../tests/jobExecution';
import ItemFormatter from '../../tests/item-formatter';
import JobsListInteractor from '../../JobsList/tests/interactor';

describe('JobsListAccordion', () => {
  const accordion = new JobsListAccordionInteractor();
  const jobsList = new JobsListInteractor();

  const titleId = 'accordion title';
  const emptyMessageId = 'noRunningJobsMessage';

  describe('rendering jobs with loaded status and 1 item', () => {
    beforeEach(async () => {
      await mountWithContext(
        <JobsListAccordion
          jobs={[jobExecution]}
          hasLoaded
          itemFormatter={ItemFormatter}
          titleId={titleId}
          emptyMessageId={emptyMessageId}
        />
      );
    });

    it('should display accordion', () => {
      expect(accordion.isPresent).to.be.true;
    });

    it('should display the correct accordion title', () => {
      expect(accordion.title).to.equal(titleId);
    });

    it('should display collapse accordion button', () => {
      expect(accordion.collapseButton.isPresent).to.be.true;
    });

    it('should expand accordion with items by default', () => {
      expect(accordion.isExpanded).to.be.true;
    });

    it('should hide badge with number of running jobs', () => {
      expect(accordion.badge.isPresent).to.be.false;
    });

    it('should display jobs list', () => {
      expect(jobsList.isPresent).to.be.true;
    });

    describe('clicking on collapse button', () => {
      beforeEach(async () => {
        await accordion.collapseButton.click();
      });

      it('should shrink accordion', () => {
        expect(accordion.isExpanded).to.be.false;
      });

      it('should display badge with number of running jobs', () => {
        expect(accordion.badge.isPresent).to.be.true;
      });

      it('should display correct amount of jobs', () => {
        expect(accordion.badgeLabelText).to.equal('1');
      });
    });
  });

  describe('rendering jobs with loaded status and 0 items', () => {
    beforeEach(async () => {
      await mountWithContext(
        <JobsListAccordion
          jobs={[]}
          hasLoaded
          itemFormatter={ItemFormatter}
          titleId={titleId}
          emptyMessageId={emptyMessageId}
        />
      );
    });

    it('should display accordion', () => {
      expect(accordion.isPresent).to.be.true;
    });

    it('should display the correct accordion title', () => {
      expect(accordion.title).to.equal(titleId);
    });

    it('should display collapse accordion button', () => {
      expect(accordion.collapseButton.isPresent).to.be.true;
    });

    it('should expand accordion with 0 items by default', () => {
      expect(accordion.isExpanded).to.be.true;
    });

    it('should display correct empty message in the list', () => {
      expect(jobsList.emptyMessage.text).to.equal(emptyMessageId);
    });

    describe('rendering jobs with not loaded status and 0 items', () => {
      beforeEach(async () => {
        await mountWithContext(
          <JobsListAccordion
            jobs={[]}
            hasLoaded={false}
            itemFormatter={ItemFormatter}
            titleId={titleId}
            emptyMessageId={emptyMessageId}
          />
        );
      });

      it('should display accordion', () => {
        expect(accordion.isPresent).to.be.true;
      });

      it('should display collapse accordion button', () => {
        expect(accordion.collapseButton.isPresent).to.be.true;
      });

      describe('clicking on collapse button', () => {
        beforeEach(async () => {
          await accordion.collapseButton.click();
        });

        it('should shrink accordion', () => {
          expect(accordion.isExpanded).to.be.false;
        });

        it('should not display badge with amount of jobs', () => {
          expect(accordion.badge.isPresent).to.be.false;
        });

        it('should display loading spinner', () => {
          expect(accordion.spinner.isPresent).to.be.true;
        });
      });
    });
  });
});
