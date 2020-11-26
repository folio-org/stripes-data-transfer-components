import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { DEFAULT_FETCHER_UPDATE_INTERVAL } from '../utils';

export const DataFetcher = ({
  FetcherContext,
  updateInterval,
  mutator,
  resources,
  resourcesMappingPath,
  children,
}) => {
  const timeoutId = useRef(null);
  const resourcesRef = useRef(resources);
  const mutatorsRef = useRef(Object.values(mutator));

  useLayoutEffect(() => {
    resourcesRef.current = resources;
  }, [resources]);

  const mapResourcesToState = useCallback(({
    hasLoaded,
    isEmpty,
  }) => {
    const newContextData = { hasLoaded };

    Object.keys(resourcesRef.current).forEach(key => {
      newContextData[key] = isEmpty ? [] : get(resourcesRef.current[key], resourcesMappingPath, []);
    });

    return newContextData;
  }, [resourcesMappingPath]);

  const [contextData, setContextData] = useState(() => mapResourcesToState({
    hasLoaded: false,
    isEmpty: true,
  }));

  const resetFetcher = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = null;
  };

  const fetchResources = useCallback(async isInitialFetch => {
    const resourcesPromises = mutatorsRef.current
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
  }, [mapResourcesToState]);

  const fetchResource = async ({
    GET,
    reset,
  }) => {
    reset();
    await GET();
  };

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
  }, [updateInterval, fetchResources]);

  useEffect(() => resetFetcher, []);

  return (
    <FetcherContext.Provider value={contextData}>
      {children}
    </FetcherContext.Provider>
  );
};

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
  ]).isRequired,
};

DataFetcher.defaultProps = { updateInterval: DEFAULT_FETCHER_UPDATE_INTERVAL };
