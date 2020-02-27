import React from 'react';

import { Button } from '@folio/stripes/components';

import { listTemplate } from './listTemplate';

import sharedCss from '../shared.css';

const getItemFormatter = (linkToRecord, externalFormatter = {}) => ({
  ...listTemplate,
  fileName: record => (
    <Button
      data-test-file-name-button
      buttonStyle="link"
      marginBottom0
      to={linkToRecord + record.id}
      buttonClass={sharedCss.cellLink}
      target="_blank"
    >
      {record.fileName}
    </Button>
  ),
  ...externalFormatter,
});

export default getItemFormatter;
