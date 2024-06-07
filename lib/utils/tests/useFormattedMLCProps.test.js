import { renderHook } from '@testing-library/react-hooks';

import { IntlProvider } from 'react-intl';
import React from 'react';
import { useFormattedMCLProps } from '../useFormattedMCLProps';

describe('useFormattedMLCProps', () => {
  const defaultProps = {
    columnWidths: { id: '80px' },
    columnMapping: { id: 'stripes-data-transfer-components.name' },
    visibleColumns: ['id'],
  };

  const wrapper = ({ children }) => (
    <IntlProvider locale="en">
      {children}
    </IntlProvider>
  );

  describe('calling without custom props', () => {
    const { result } = renderHook(() => useFormattedMCLProps(defaultProps), { wrapper });

    it('should return formatted default props', () => {
      expect(result.current.visibleColumns.length).toEqual(1);
      expect(result.current.visibleColumns[0]).toEqual(defaultProps.visibleColumns[0]);
      expect(Object.keys(result.current.columnWidths).length).toEqual(1);
      expect(result.current.columnWidths.id).toEqual(defaultProps.columnWidths.id);
      expect(Object.keys(result.current.columnMapping).length).toEqual(1);
      expect(result.current.columnMapping.id).toEqual('stripes-data-transfer-components.name');
    });
  });

  describe('calling with custom props', () => {
    const customProperties = {
      columnWidths: { title: '80px' },
      columnMapping: { title: 'stripes-data-transfer-components.jobProfilesTitle' },
      visibleColumns: ['id', 'title'],
    };
    const { result } = renderHook(() => useFormattedMCLProps(defaultProps, customProperties), { wrapper });

    it('should return formatted and combined props', () => {
      expect(result.current.visibleColumns.length).toEqual(2);
      expect(result.current.visibleColumns[0]).toEqual(customProperties.visibleColumns[0]);
      expect(result.current.visibleColumns[1]).toEqual(customProperties.visibleColumns[1]);
      expect(Object.keys(result.current.columnWidths).length).toEqual(2);
      expect(result.current.columnWidths.id).toEqual(defaultProps.columnWidths.id);
      expect(result.current.columnWidths.title).toEqual(customProperties.columnWidths.title);
      expect(Object.keys(result.current.columnMapping).length).toEqual(2);
      expect(result.current.columnMapping.id).toEqual('stripes-data-transfer-components.name');
      expect(result.current.columnMapping.title).toEqual('stripes-data-transfer-components.jobProfilesTitle');
    });
  });
});
