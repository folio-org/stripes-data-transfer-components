import { getHookExecutionResult } from '../../../test/jest/helpers';
import { useFormattedMCLProps } from '../useFormattedMCLProps';
import translations from '../../../translations/stripes-data-transfer-components/en';

describe('useFormattedMLCProps-test', () => {
  const defaultProps = {
    columnWidths: { id: '80px' },
    columnMapping: { id: 'stripes-data-transfer-components.name' },
    visibleColumns: ['id'],
  };

  describe('calling without custom props', () => {
    const hookResult = getHookExecutionResult(useFormattedMCLProps, [defaultProps]);

    it('should return formatted default props', () => {
      expect(hookResult.visibleColumns.length).toEqual(1);
      expect(hookResult.visibleColumns[0]).toEqual(defaultProps.visibleColumns[0]);
      expect(Object.keys(hookResult.columnWidths).length).toEqual(1);
      expect(hookResult.columnWidths.id).toEqual(defaultProps.columnWidths.id);
      expect(Object.keys(hookResult.columnMapping).length).toEqual(1);
      expect(hookResult.columnMapping.id).toEqual(translations.name);
    });
  });

  describe('calling with custom props', () => {
    const customProperties = {
      columnWidths: { title: '80px' },
      columnMapping: { title: 'stripes-data-transfer-components.jobProfilesTitle' },
      visibleColumns: ['id', 'title'],
    };
    const hookResult = getHookExecutionResult(useFormattedMCLProps, [defaultProps, customProperties]);

    it('should return formatted and combined props', () => {
      expect(hookResult.visibleColumns.length).toEqual(2);
      expect(hookResult.visibleColumns[0]).toEqual(customProperties.visibleColumns[0]);
      expect(hookResult.visibleColumns[1]).toEqual(customProperties.visibleColumns[1]);
      expect(Object.keys(hookResult.columnWidths).length).toEqual(2);
      expect(hookResult.columnWidths.id).toEqual(defaultProps.columnWidths.id);
      expect(hookResult.columnWidths.title).toEqual(customProperties.columnWidths.title);
      expect(Object.keys(hookResult.columnMapping).length).toEqual(2);
      expect(hookResult.columnMapping.id).toEqual(translations.name);
      expect(hookResult.columnMapping.title).toEqual(translations.jobProfilesTitle);
    });
  });
});
