import React from 'react';

import css from './Job.css';

const Job = props => {
  const { children } = props;

  return (
    <li
      data-test-job-item
      className={css.job}
    >
      {children}
    </li>
  );
};

export default Job;
