import React, { memo } from 'react';

import {
  Loading,
  Layout,
} from '@folio/stripes/components';

const Preloader = memo(({ message }) => (
  <Layout
    className="flex centerContent"
    data-test-preloader
  >
    {message}
    <Loading size="large" />
  </Layout>
));

export default Preloader;
