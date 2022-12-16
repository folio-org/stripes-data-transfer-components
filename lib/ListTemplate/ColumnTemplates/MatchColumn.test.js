import React from 'react';
import { render } from '@testing-library/react';

import '../../../test/jest/__mock__';

import { MatchColumn } from './MatchColumn';

const fieldsConfig = [{
  id: 'id',
  label: 'ui-data-import.settings.mappingProfiles.map.instance.administrationData.field.id',
  categoryId: 'admin-data',
  value: 'instance.id',
  recordType: 'INSTANCE',
}];

const matchColumnProps = ({
  existingRecordType,
  field,
}) => ({
  existingRecordType,
  field,
  matchDetails: [{ existingMatchExpression: { fields: ['field1, field2'] } }],
});

const renderMatchColumn = record => {
  const component = (
    <MatchColumn
      record={record}
      fieldsConfig={fieldsConfig}
    />
  );

  return render(component);
};

describe('MatchColumn', () => {
  describe('when record doesn`t exist', () => {
    it('no value should be rendered', () => {
      const { getByText } = renderMatchColumn(null);

      expect(getByText('-')).toBeDefined();
    });
  });

  describe('when record has no field and record type', () => {
    it('no value should be rendered', () => {
      const { getByText } = renderMatchColumn(matchColumnProps({
        existingRecordType: null,
        field: null,
      }));

      expect(getByText('-')).toBeDefined();
    });
  });

  describe('when text direction is rtl', () => {
    it('should be rendered correctly', () => {
      document.dir = 'rtl';
      const { getByText } = renderMatchColumn(matchColumnProps({
        existingRecordType: 'INSTANCE',
        field: 'field1',
      }));
      const firstContainer = getByText('Field1');
      const secondContainer = getByText('stripes-data-transfer-components.recordTypes.instance');

      expect(firstContainer.parentElement.nextElementSibling).toEqual(secondContainer.parentElement);
    });
  });

  describe('when text direction is ltr', () => {
    it('should be rendered correctly', () => {
      document.dir = 'ltr';
      const { getByText } = renderMatchColumn(matchColumnProps({
        existingRecordType: 'INSTANCE',
        field: 'field1',
      }));
      const firstContainer = getByText('stripes-data-transfer-components.recordTypes.instance');
      const secondContainer = getByText('Field1');

      expect(firstContainer.parentElement.nextElementSibling).toEqual(secondContainer.parentElement);
    });
  });

  describe('when record has no field', () => {
    it('should be rendered correctly', () => {
      const { getAllByText } = renderMatchColumn(matchColumnProps({
        existingRecordType: 'INSTANCE',
        field: null,
      }));

      expect(getAllByText('stripes-data-transfer-components.recordTypes.instance')).toBeDefined();
    });
  });
});
