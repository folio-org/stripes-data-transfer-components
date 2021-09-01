import React, { createContext } from 'react';
import { noop } from 'lodash';
import {
  waitFor, screen,
} from '@testing-library/dom';
import { act } from '@testing-library/react';
import { DataFetcher } from './DataFetcher';
import { renderWithContext } from '../../test/jest/helpers';

const ViewComponent = ({
  hasLoaded, logs, jobs,
}) => (
  <>
    {hasLoaded && <div data-testid="hasLoaded" />}
    {logs?.length && <div data-testid="logs" />}
    {jobs?.length && <div data-testid="jobs" />}
  </>
);

const setupDataFetcher = async ({ fetcherData } = {}) => {
  const FetcherContext = createContext({});

  Object.assign(fetcherData, {
    resourcesMappingPath: 'records.0',
    updateInterval: 300,
    FetcherContext,
    mutator: {
      jobs: {
        reset: noop,
        GET: () => Promise.resolve(),
      },
      logs: {
        reset: noop,
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

  return renderWithContext(
    <DataFetcher {...fetcherData}>
      <FetcherContext.Consumer>
        {value => {
          fetcherData.fetcherContextValue = value;

          return <ViewComponent {...value} />;
        }}
      </FetcherContext.Consumer>
    </DataFetcher>
  );
};

describe('rendering DataFetcher', () => {
  let hasLoaded;
  let logs;
  let jobs;

  it('should initialise context data', async () => {
    const fetcherData = {};

    await setupDataFetcher({ fetcherData });

    await act(async () => {
      hasLoaded = await screen.findByTestId('hasLoaded');
    });

    await waitFor(async () => {
      expect(hasLoaded).toBeVisible();
    });

    expect(fetcherData.fetcherContextValue).toStrictEqual({
      hasLoaded: true,
      jobs: [],
      logs: [],
    });
  });

  it('should set logs in the context', async () => {
    const fetcherData = { resources: { logs: { records: [[{ id: 'log1Id' }]] } } };

    await setupDataFetcher({ fetcherData });

    await act(async () => {
      hasLoaded = await screen.findByTestId('hasLoaded');
      logs = await screen.findByTestId('logs');
    });

    await waitFor(async () => {
      expect(hasLoaded).toBeVisible();
      expect(logs).toBeVisible();
    });

    expect(fetcherData.fetcherContextValue).toStrictEqual({
      hasLoaded: true,
      jobs: [],
      logs: [{ id: 'log1Id' }],
    });
  });

  it('should set jobs in the context', async () => {
    const fetcherData = { resources: { jobs: { records: [[{ id: 'jobId1' }]] } } };

    await setupDataFetcher({ fetcherData });

    await act(async () => {
      hasLoaded = await screen.findByTestId('hasLoaded');
      jobs = await screen.findByTestId('jobs');
    });

    await waitFor(async () => {
      expect(hasLoaded).toBeVisible();
      expect(jobs).toBeVisible();
    });

    expect(fetcherData.fetcherContextValue).toStrictEqual({
      hasLoaded: true,
      jobs: [{ id: 'jobId1' }],
      logs: [],
    });
  });

  it('should set jobs in the context', async () => {
    const fetcherData = {
      mutator: {
        jobs: {
          reset: noop,
          GET: () => Promise.reject(),
        },
        logs: {
          reset: noop,
          GET: () => Promise.reject(),
        },
      },
    };

    await setupDataFetcher({ fetcherData });

    await act(async () => {
      hasLoaded = await screen.findByTestId('hasLoaded');
    });

    await waitFor(async () => {
      expect(hasLoaded).toBeVisible();

      logs = screen.queryByTestId('logs');
      jobs = screen.queryByTestId('jobs');

      expect(logs).not.toBeInTheDocument();
      expect(jobs).not.toBeInTheDocument();
    });

    expect(fetcherData.fetcherContextValue).toStrictEqual({
      hasLoaded: true,
      jobs: [],
      logs: [],
    });
  });
});
