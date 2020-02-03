import React, { memo } from 'react';

import {
  Loading,
  Layout,
} from '@folio/stripes/components';

const Preloader = memo(() => (
  <Layout
    className="flex centerContent"
    data-test-preloader
  >
    <Loading size="large" />
  </Layout>
));

export default Preloader;
