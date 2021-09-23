import React from 'react';

import css from './Job.css';

export const Job = props => {
  const { children } = props;

  return (
    <li
      data-test-job-item
      data-testid="job-item"
      className={css.job}
    >
      {children}
    </li>
  );
};
