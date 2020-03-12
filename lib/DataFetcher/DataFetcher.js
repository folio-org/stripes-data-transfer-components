import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { DEFAULT_FETCHER_UPDATE_INTERVAL } from '../utils/constants';

export class DataFetcher extends Component {
  state = {
    contextData: this.mapResourcesToState({
      hasLoaded: false,
      isEmpty: true,
    }),
  };

  componentDidMount() {
    this.updateResources(true);
  }

  componentWillUnmount() {
    this.resetFetcher();
  }

  mapResourcesToState({
    hasLoaded,
    isEmpty,
  }) {
    const {
      resources,
      resourcesMappingPath,
    } = this.props;

    const newContextData = { hasLoaded };

    Object.keys(resources).forEach(key => {
      newContextData[key] = isEmpty ? [] : get(resources[key], resourcesMappingPath, []);
    });

    return newContextData;
  }

  resetFetcher() {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }

  fetchResources = async (isInitialFetch = false) => {
    const { mutator } = this.props;

    const resourcesPromises = Object
      .values(mutator)
      .reduce((result, resourceMutator) => result.concat(this.fetchResource(resourceMutator)), []);

    try {
      await Promise.all(resourcesPromises);
      this.setState({
        contextData: this.mapResourcesToState({
          isEmpty: false,
          hasLoaded: true,
        }),
      });
    } catch (error) {
      if (isInitialFetch) {
        // fill contextData with empty data on unsuccessful initial data retrieval
        this.setState({
          contextData: this.mapResourcesToState({
            isEmpty: true,
            hasLoaded: true,
          }),
        });
      }
    }
  };

  updateResources(isInitialUpdate = false) {
    if (!isInitialUpdate && this.timeoutId === null) return;

    this.resetFetcher();

    const { updateInterval } = this.props;

    this.timeoutId = setTimeout(async () => {
      await this.fetchResources(isInitialUpdate);

      this.updateResources();
    }, isInitialUpdate ? 0 : updateInterval);
  }

  async fetchResource({
    GET,
    reset,
  }) {
    reset();
    await GET();
  }

  render() {
    const {
      FetcherContext, // NOSONAR: sonar treat this block as unused despite it is used
      children,
    } = this.props;
    const { contextData } = this.state;

    return (
      <FetcherContext.Provider value={contextData}>
        {children}
      </FetcherContext.Provider>
    );
  }
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
