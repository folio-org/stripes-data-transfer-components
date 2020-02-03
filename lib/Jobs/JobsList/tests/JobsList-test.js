import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../../test/bigtest/helpers';
import JobsList from '../JobsList';
import ItemFormatter from './item-formatter';
import JobsListContainerInteractor from './interactor';
import PreloaderInteractor from '../../../Preloader/tests/interactor';
import EndOfItemInteractor from '../../../EndOfItem/tests/interactor';
import JobInteractor from '../../Job/tests/interactor';
import jobExecution from './job-execution';

describe('JobList', () => {
  const jobListContainer = new JobsListContainerInteractor();
  const preloader = new PreloaderInteractor();
  const endOfItem = new EndOfItemInteractor();
  const job = new JobInteractor();
  const emptyMessage = 'List is empty';

  describe('rendering JobList with not loaded state', () => {
    beforeEach(async () => {
      await mountWithContext(
        <JobsList
          jobs={[]}
          hasLoaded={false}
          itemFormatter={ItemFormatter}
          isEmptyMessage={emptyMessage}
        />
      );
    });

    it('should display JobList component', () => {
      expect(jobListContainer.isPresent).to.be.true;
    });

    it('should display preloader', () => {
      expect(preloader.isPresent).to.be.true;
    });

    it('should hide jobs list', () => {
      expect(jobListContainer.list.isPresent).to.be.false;
    });

    it('should display end of item', () => {
      expect(endOfItem.isPresent).to.be.true;
    });
  });

  describe('rendering JobList with loaded state and empty list', () => {
    beforeEach(async () => {
      await mountWithContext(
        <JobsList
          jobs={[]}
          hasLoaded
          itemFormatter={ItemFormatter}
          isEmptyMessage={emptyMessage}
        />
      );
    });

    it('should display JobList component', () => {
      expect(jobListContainer.isPresent).to.be.true;
    });

    it('should hide preloader', () => {
      expect(preloader.isPresent).to.be.false;
    });

    it('should display end of item', () => {
      expect(endOfItem.isPresent).to.be.true;
    });

    it('should display jobs list', () => {
      expect(jobListContainer.list.isPresent).to.be.true;
    });

    it('should display correct empty message', () => {
      expect(jobListContainer.emptyMessage.isPresent).to.be.true;
      expect(jobListContainer.emptyMessage.text).to.be.equal(emptyMessage);
    });
  });

  describe('rendering JobList with loaded state, empty list and default empty message', () => {
    beforeEach(async () => {
      await mountWithContext(
        <JobsList
          jobs={[]}
          hasLoaded
          itemFormatter={ItemFormatter}
        />
      );
    });
    it('should display correct empty message', () => {
      expect(jobListContainer.emptyMessage.isPresent).to.be.true;
      expect(jobListContainer.emptyMessage.text).to.be.equal('');
    });
  });

  describe('rendering JobList with loaded state and filled list', () => {
    beforeEach(async () => {
      await mountWithContext(
        <JobsList
          jobs={[jobExecution]}
          hasLoaded
          itemFormatter={ItemFormatter}
          isEmptyMessage={emptyMessage}
        />
      );
    });

    it('should display JobList component', () => {
      expect(jobListContainer.isPresent).to.be.true;
    });

    it('should hide preloader', () => {
      expect(preloader.isPresent).to.be.false;
    });

    it('should display end of item', () => {
      expect(endOfItem.isPresent).to.be.true;
    });

    it('should display jobs list', () => {
      expect(jobListContainer.list.isPresent).to.be.true;
    });

    it('should display item formatter content - list of jobs', () => {
      expect(job.isPresent).to.be.true;
    });

    it('should hide empty message', () => {
      expect(jobListContainer.emptyMessage.isPresent).to.be.false;
    });
  });
});
