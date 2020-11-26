import React, { createContext } from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';
import { noop } from 'lodash';
import sinon from 'sinon';

import { mountWithContext } from '../../../test/bigtest/helpers';
import { DataFetcher } from '../DataFetcher';

const updateInterval = 300;

const setupDataFetcher = async ({
  fetcherData,
  withResourceUpdate = false,
  withMutatorUpdate = false,
} = {}) => {
  const FetcherContext = createContext({});
  const handleSubmitSpy = sinon.stub().callsFake(Promise.reject.bind(Promise));

  Object.assign(fetcherData, {
    resourcesMappingPath: 'records.0',
    updateInterval,
    FetcherContext,
    mutator: {
      jobs: {
        reset: noop,
        GET: () => Promise.resolve(),
      },
      logs: {
        reset: noop,
        GET: withMutatorUpdate ? handleSubmitSpy : () => Promise.resolve(),
      },
      ...fetcherData.mutator,
    },
    resources: {
      jobs: null,
      logs: null,
      ...fetcherData.resources,
    },
  });

  if (withResourceUpdate) {
    setTimeout(() => {
      if (withMutatorUpdate) {
        handleSubmitSpy.callsFake(Promise.resolve.bind(Promise));
      }

      Object.assign(fetcherData.resources, { logs: { records: [[{ id: 'log1Id' }]] } });
    }, updateInterval);
  }

  await mountWithContext(
    <DataFetcher {...fetcherData}>
      <FetcherContext.Consumer>
        {value => { fetcherData.fetcherContextValue = value; }}
      </FetcherContext.Consumer>
    </DataFetcher>
  );
};

describe('rendering DataFetcher', () => {
  describe('dealing with successful API response', () => {
    const fetcherData = {};

    beforeEach(async () => {
      await setupDataFetcher({
        fetcherData,
        withResourceUpdate: true,
      });
    });

    it('should initialise context data', () => {
      expect(fetcherData.fetcherContextValue).to.deep.equal({
        hasLoaded: true,
        jobs: [],
        logs: [],
      });
    });

    it('should fill context data with proper values upon the next tick of interval', () => {
      expect(fetcherData.fetcherContextValue).to.deep.equal({
        hasLoaded: true,
        jobs: [],
        logs: [{ id: 'log1Id' }],
      });
    });
  });

  describe('dealing with errored API response', () => {
    const fetcherData = { resources: { jobs: { records: [[{ id: 'job1Id' }]] } } };

    beforeEach(async () => {
      await setupDataFetcher({
        fetcherData,
        withMutatorUpdate: true,
        withResourceUpdate: true,
      });
    });

    it('should initialise context data', () => {
      expect(fetcherData.fetcherContextValue).to.deep.equal({
        hasLoaded: true,
        jobs: [],
        logs: [],
      });
    });

    it('should fill context data with empty values since one of the resources are errored on the first tick of the timer', () => {
      expect(fetcherData.fetcherContextValue).to.deep.equal({
        hasLoaded: true,
        jobs: [],
        logs: [],
      });
    });

    it('should fill context data with resources values since both resources are successful on the next tick of the timer', () => {
      expect(fetcherData.fetcherContextValue).to.deep.equal({
        hasLoaded: true,
        jobs: [{ id: 'job1Id' }],
        logs: [{ id: 'log1Id' }],
      });
    });
  });
});
