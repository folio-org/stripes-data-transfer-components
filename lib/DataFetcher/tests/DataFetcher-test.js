import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { mount } from '../../../test/bigtest/helpers';
import { DataFetcher } from '../DataFetcher';

const setupDataFetcher = async ({
  fetcherData,
  withResourceUpdate = false,
  withMutatorUpdate = false,
} = {}) => {
  const FetcherContext = React.createContext({});

  Object.assign(fetcherData, {
    FetcherContext,
    mutator: {
      jobs: {
        reset: () => {},
        GET: () => Promise.resolve(),
      },
      logs: {
        reset: () => {},
        GET: () => Promise.resolve(),
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
        Object.assign(fetcherData.mutator, {
          logs: {
            reset: () => {},
            GET: () => Promise.resolve(),
          },
        });
      }

      Object.assign(fetcherData.resources, { logs: { records: [[{ id: 'log1Id' }]] } });
    }, 300);
  }

  await mount(
    <DataFetcher {...fetcherData}>
      <FetcherContext.Consumer>
        {value => { fetcherData.fetcherContextValue = value; }}
      </FetcherContext.Consumer>
    </DataFetcher>
  );
};

describe('DataFetcher', () => {
  describe('dealing with successful API response', () => {
    const fetcherData = { updateInterval: 300 };

    beforeEach(async () => {
      await setupDataFetcher({
        fetcherData,
        withResourceUpdate: true,
      });
    });

    it('should initialise context data', () => {
      expect(fetcherData.fetcherContextValue).to.deep.equal({
        hasLoaded: false,
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
    const fetcherData = {
      updateInterval: 300,
      resources: { jobs: { records: [[{ id: 'job1Id' }]] } },
      mutator: {
        logs: {
          reset: () => {},
          GET: () => Promise.reject(),
        },
      },
    };

    beforeEach(async () => {
      await setupDataFetcher({
        fetcherData,
        withMutatorUpdate: true,
        withResourceUpdate: true,
      });
    });

    it('should initialise context data', () => {
      expect(fetcherData.fetcherContextValue).to.deep.equal({
        hasLoaded: false,
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
