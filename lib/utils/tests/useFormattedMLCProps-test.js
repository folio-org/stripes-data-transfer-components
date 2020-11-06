import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import { getHookExecutionResult } from '../../../test/bigtest/helpers';
import { useFormattedMCLProps } from '../useFormattedMCLProps';
import translations from '../../../translations/stripes-data-transfer-components/en';

describe('useFormattedMLCProps', () => {
  const defaultProps = {
    columnWidths: { id: '80px' },
    columnMapping: { id: 'stripes-data-transfer-components.name' },
    visibleColumns: ['id'],
  };

  describe('calling without custom props', () => {
    const hookResult = getHookExecutionResult(useFormattedMCLProps, [defaultProps]);

    it('should return formatted default props', () => {
      expect(hookResult.visibleColumns.length).to.equal(1);
      expect(hookResult.visibleColumns[0]).to.equal(defaultProps.visibleColumns[0]);
      expect(Object.keys(hookResult.columnWidths).length).to.equal(1);
      expect(hookResult.columnWidths.id).to.equal(defaultProps.columnWidths.id);
      expect(Object.keys(hookResult.columnMapping).length).to.equal(1);
      expect(hookResult.columnMapping.id).to.equal(translations.name);
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
      expect(hookResult.visibleColumns.length).to.equal(2);
      expect(hookResult.visibleColumns[0]).to.equal(customProperties.visibleColumns[0]);
      expect(hookResult.visibleColumns[1]).to.equal(customProperties.visibleColumns[1]);
      expect(Object.keys(hookResult.columnWidths).length).to.equal(2);
      expect(hookResult.columnWidths.id).to.equal(defaultProps.columnWidths.id);
      expect(hookResult.columnWidths.title).to.equal(customProperties.columnWidths.title);
      expect(Object.keys(hookResult.columnMapping).length).to.equal(2);
      expect(hookResult.columnMapping.id).to.equal(translations.name);
      expect(hookResult.columnMapping.title).to.equal(translations.jobProfilesTitle);
    });
  });
});
