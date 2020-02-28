import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const DEFAULT_FETCHER_UPDATE_INTERVAL = 5000;

export function DataFetcher({
  FetcherContext,
  updateInterval,
  mutator,
  resources,
  resourcesMappingPath,
  children,
}) {
  const [contextData, setContextData] = useState({ hasLoaded: false });
  const timeoutId = useRef(null);

  const resetFetcher = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = null;
  };

  const mapResourcesToState = ({
    hasLoaded,
    isEmpty,
  }) => {
    const newContextData = { hasLoaded };

    Object.keys(resources).forEach(key => {
      newContextData[key] = isEmpty ? [] : get(resources[key], resourcesMappingPath, []);
    });

    setContextData(newContextData);
  };

  const fetchResources = async initial => {
    const resourcesPromises = Object
      .values(mutator)
      .reduce((res, resourceMutator) => res.concat(fetchResource(resourceMutator)), []);

    try {
      await Promise.all(resourcesPromises);

      mapResourcesToState({
        isEmpty: false,
        hasLoaded: true,
      });
    } catch (error) {
      if (initial) {
        // fill contextData with empty data on unsuccessful initial data retrieval
        mapResourcesToState({
          isEmpty: true,
          hasLoaded: true,
        });
      }
    }
  };

  useEffect(() => {
    mapResourcesToState({
      isEmpty: true,
      hasLoaded: false,
    });

    return resetFetcher;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function updateResourcesData(initial) {
      if (!initial && timeoutId.current === null) return;

      resetFetcher();

      timeoutId.current = setTimeout(async () => {
        await fetchResources(initial);

        updateResourcesData();
      }, initial ? 0 : updateInterval);
    }

    updateResourcesData(true);
  }, [updateInterval]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchResource(resourceMutator) {
    const {
      GET,
      reset,
    } = resourceMutator;

    // accumulate: true in manifest saves the results of all requests
    // because of that it is required to clear old data by invoking reset method before each request
    reset();
    await GET();
  }

  return (
    <FetcherContext.Provider value={contextData}>
      {children}
    </FetcherContext.Provider>
  );
}

DataFetcher.propTypes = {
  FetcherContext: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  updateInterval: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  resourcesMappingPath: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

DataFetcher.defaultProps = {
  updateInterval: DEFAULT_FETCHER_UPDATE_INTERVAL,
  resourcesMappingPath: 'records.0',
};
