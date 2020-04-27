import React from 'react';
import PropTypes from 'prop-types';

import {
  List,
  Layout,
} from '@folio/stripes/components';

import EndOfItem from '../../EndOfItem';
import Preloader from '../../Preloader';
import jobExecutionPropTypes from '../jobExecutionPropTypes';

import css from './JobsList.css';

const JobsList = ({
  jobs,
  hasLoaded,
  itemFormatter,
  isEmptyMessage = '',
}) => {
  const EmptyMessage = (
    <Layout
      className="flex centerContent"
      element="span"
      data-test-empty-message
    >
      {isEmptyMessage}
    </Layout>
  );

  const LoadedJobsList = (
    <div data-test-jobs-list>
      <List
        items={jobs}
        itemFormatter={itemFormatter}
        isEmptyMessage={EmptyMessage}
        listClass={css.list}
        marginBottom0
      />
    </div>
  );

  return (
    <div
      data-test-jobs-list-container
      className={css.listContainer}
    >
      {hasLoaded ? LoadedJobsList : <Preloader />}
      <EndOfItem />
    </div>
  );
};

JobsList.propTypes = {
  jobs: PropTypes.arrayOf(jobExecutionPropTypes).isRequired,
  itemFormatter: PropTypes.func.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  isEmptyMessage: PropTypes.node,
};

export default JobsList;
