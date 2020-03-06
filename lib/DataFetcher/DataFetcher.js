import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { DEFAULT_FETCHER_UPDATE_INTERVAL } from '../utils/constants';

export function DataFetcher({
  FetcherContext,
  updateInterval,
  mutator,
  resources,
  resourcesMappingPath,
  children,
}) {
  const resourcesRef = useRef({});

  const mapResourcesToState = ({
    hasLoaded,
    isEmpty,
  }) => {
    const newContextData = { hasLoaded };

    Object.keys(resources).forEach(key => {
      newContextData[key] = isEmpty ? [] : get(resourcesRef.current[key], resourcesMappingPath, []);
    });

    return newContextData;
  };

  const [contextData, setContextData] = useState(() => mapResourcesToState({
    hasLoaded: false,
    isEmpty: true,
  }));

  const timeoutId = useRef(null);

  const resetFetcher = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = null;
  };

  const fetchResources = async isInitialFetch => {
    const resourcesPromises = Object
      .values(mutator)
      .reduce((result, resourceMutator) => result.concat(fetchResource(resourceMutator)), []);

    try {
      await Promise.all(resourcesPromises);

      setContextData(mapResourcesToState({
        isEmpty: false,
        hasLoaded: true,
      }));
    } catch (error) {
      if (isInitialFetch) {
        // fill contextData with empty data on unsuccessful initial data retrieval
        setContextData(mapResourcesToState({
          isEmpty: true,
          hasLoaded: true,
        }));
      }
    }
  };

  useEffect(() => {
    resourcesRef.current = resources;
  }, [resources]);

  useEffect(() => resetFetcher, []);

  useEffect(() => {
    function updateResourcesData(isInitialUpdate = false) {
      if (!isInitialUpdate && timeoutId.current === null) return;

      resetFetcher();

      timeoutId.current = setTimeout(async () => {
        await fetchResources(isInitialUpdate);

        updateResourcesData();
      }, isInitialUpdate ? 0 : updateInterval);
    }

    updateResourcesData(true);
  }, [updateInterval]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchResource({
    GET,
    reset,
  }) {
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
