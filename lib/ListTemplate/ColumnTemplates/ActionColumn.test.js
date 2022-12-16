import React from 'react';
import { render } from '@testing-library/react';

import '../../../test/jest/__mock__';

import { ActionColumn } from './ActionColumn';

const recordWithActionAndRecordType = {
  action: 'CREATE',
  folioRecord: 'INSTANCE',
};
const recordWithRecordType = { folioRecord: 'INSTANCE' };
const recordWithAction = { action: 'CREATE' };

const renderActionColumn = record => {
  const component = (
    <ActionColumn record={record} />
  );

  return render(component);
};

describe('ActionColumn', () => {
  describe('when record has action and record type', () => {
    it('should be rendered', () => {
      const { getByText } = renderActionColumn(recordWithActionAndRecordType);

      expect(getByText(/stripes-data-transfer-components.create stripes-data-transfer-components.recordTypes.instance/i)).toBeDefined();
    });
  });

  describe('when record doesn`t exist', () => {
    it('no value should be rendered', () => {
      const { getByText } = renderActionColumn(null);

      expect(getByText('-')).toBeDefined();
    });
  });

  describe('when record has no action', () => {
    it('no value should be rendered', () => {
      const { getByText } = renderActionColumn(recordWithRecordType);

      expect(getByText('-')).toBeDefined();
    });
  });

  describe('when record has no type', () => {
    it('no value should be rendered', () => {
      const { getByText } = renderActionColumn(recordWithAction);

      expect(getByText('-')).toBeDefined();
    });
  });
});
