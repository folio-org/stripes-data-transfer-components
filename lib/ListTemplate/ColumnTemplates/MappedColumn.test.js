import React from 'react';
import { render } from '@testing-library/react';

import '../../../test/jest/__mock__';

import { MappedColumn } from './MappedColumn';

const renderMappedColumn = record => {
  const component = (
    <MappedColumn
      record={record}
    />
  );

  return render(component);
};

describe('MappedColumn', () => {
  describe('when record exists', () => {
    it('should be rendered', () => {
      const { getByText } = renderMappedColumn({ existingRecordType: 'INSTANCE' });

      expect(getByText('stripes-data-transfer-components.recordTypes.instance')).toBeDefined();
    });
  });

  describe('when record does not exist', () => {
    it('no value should be rendered', () => {
      const { getByText } = renderMappedColumn(null);

      expect(getByText('-')).toBeDefined();
    });
  });

  describe('when record has no record type', () => {
    it('no value should be rendered', () => {
      const { getByText } = renderMappedColumn({ existingRecordType: null });

      expect(getByText('-')).toBeDefined();
    });
  });
});
