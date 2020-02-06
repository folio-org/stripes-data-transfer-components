import React from 'react';

import css from './Job.css';

const Job = props => {
  const { children } = props;

  return (
    <div
      data-test-job-item
      className={css.job}
    >
      {children}
    </div>
  );
};

export default Job;
