import React from 'react';

import Job from '../../Job';

const ItemFormatter = job => (
  <Job
    key={job.hrId}
    job={job}
  >
    Job details
  </Job>
);

export default ItemFormatter;
