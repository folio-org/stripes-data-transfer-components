import '../../../test/jest/__mock__';

import {
  getFieldMatchedWithCategory,
  getFieldMatchedLabel,
} from '../matchingFieldsManager';

const fieldCategoriesConfig = [{
  id: 'identifier',
  label: 'ui-data-import.settings.matchProfiles.identifier',
  moduleId: 'instance',
}];

const fieldsConfig = [{
  id: 'id',
  label: 'ui-data-import.settings.mappingProfiles.map.instance.administrationData.field.id',
  categoryId: 'admin-data',
  value: 'instance.id',
  recordType: 'INSTANCE',
},{
  id: 'identifiers.items.properties.value',
  label: 'ui-data-import.settings.mappingProfiles.map.identifiers.section',
  categoryId: 'identifier',
  value: 'instance.identifiers[].value',
  recordType: 'INSTANCE',
  fromResources: {
    recordsName: 'identifierTypes',
    fieldToDisplay: 'name',
    labelToSend: 'identifierTypeId',
    fieldToSend: 'id',
  },
}];

const fields = [{
  label: 'field',
  value: 'instance.identifiers[].value',
}, {
  label: 'identifierTypeId',
  value: '5130aed5-1095-4fb6-8f6f-caa3d6cc7aae',
}];

const resources = {
  identifierTypes: [{
    id: '5130aed5-1095-4fb6-8f6f-caa3d6cc7aae',
    name: 'Local identifier',
    source: 'folio',
  }]
};

describe('matchingFieldsManager', () => {
  describe('getFieldMatchedWithCategory function', () => {
    it('should return value', () => {
      const formatMessage = jest.fn().mockImplementation(() => 'formattedLabel');
      const expectedLabel = getFieldMatchedWithCategory({
        fields,
        recordType: 'INSTANCE',
        formatMessage,
        resources,
        fieldCategoriesConfig,
        fieldsConfig,
      });

      expect(expectedLabel).toBe('formattedLabel: Local identifier');
    });
  });

  describe('getFieldMatchedLabel function', () => {
    describe('when existing record is not MARC', () => {
      it('should return correct label', () => {
        const formatMessage = jest.fn().mockImplementation(() => 'formattedLabel');
        const expectedLabel = getFieldMatchedLabel({
          fields,
          recordType: 'INSTANCE',
          formatMessage,
          resources,
          fieldsConfig,
        });

        expect(expectedLabel).toBe('Local identifier');
      });
    });

    describe('when existing record is MARC', () => {
      it('should return correct label', () => {
        const formatMessage = jest.fn().mockImplementation(() => 'formattedLabel');
        const expectedLabel = getFieldMatchedLabel({
          fields,
          recordType: 'MARC Bibliographic',
          formatMessage,
          resources,
          fieldsConfig,
        });

        expect(expectedLabel).toBe('instance.identifiers[].value.5130aed5-1095-4fb6-8f6f-caa3d6cc7aae');
      });
    });
  });
});
