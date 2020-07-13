import React from 'react';

import { Job } from '../Job';

export const ItemFormatter = job => (
  <Job
    key={job.hrId}
    job={job}
  >
    Job details
  </Job>
);
