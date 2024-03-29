import React from 'react';
import { render } from '@testing-library/react';

import { renderWithIntl } from '../../test/jest/helpers/renderWithIntl';
import '../../test/jest/__mock__';

import { listTemplate } from './listTemplate';

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  FormattedTime: () => <span>test time</span>,
}));

jest.mock('./ColumnTemplates', () => ({
  CheckboxColumn: () => <span>checkbox column</span>,
  DefaultColumn: () => <span>default column</span>,
  MappedColumn: () => <span>mapped column</span>,
  ActionColumn: () => <span>action column</span>,
  MatchColumn: () => <span>match column</span>,
  TagsColumn: () => <span>tags column</span>,
  DateColumn: () => <span>date column</span>,
}));

const testRecord = {
  fileName: 'test name',
  name: 'test name',
  id: 'testId1',
  hrId: 'testHRID',
  description: 'test description',
  extension: 'test extension',
  dataTypes: '',
  importBlocked: false,
  metadata: { updatedDate: '2021-03-31' },
  status: 'COMMITTED',
  progress: {
    current: 0,
    total: 0,
  },
  userInfo: {
    firstName: 'firstName',
    lastName: 'lastName',
    userName: 'userName',
  },
  runBy: {
    firstName: 'firstName',
    lastName: 'lastName',
  },
  completedDate: '2021-04-31',
  startedDate: '2021-04-31',
  jobProfileInfo: { name: 'test name' },
};

const fieldsConfig = [{
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

const listTemplateTestData = {
  selectedRecords: new Set(['testId1', 'testId2']),
  selectRecord: jest.fn(),
  fieldsConfig,
  formatNumber: jest.fn(number => number),
};

const templates = listTemplate(listTemplateTestData);

describe('List template', () => {
  afterEach(() => {
    listTemplateTestData.selectRecord.mockClear();
  });

  describe('when column is `selected`', () => {
    it('then `CheckboxColumn` component should be rendered', () => {
      const { getByText } = render(templates.selected(testRecord));

      expect(getByText('checkbox column')).toBeDefined();
    });
  });

  describe('when column is `name`', () => {
    it('then `DefaultColumn` component should be rendered', () => {
      const { getByText } = render(templates.name(testRecord));

      expect(getByText('default column')).toBeDefined();
    });
  });

  describe('when column is `description`', () => {
    it('then `DefaultColumn` component should be rendered', () => {
      const { getByText } = render(templates.description(testRecord));

      expect(getByText('default column')).toBeDefined();
    });
  });

  describe('when column is `match`', () => {
    it('then `MatchColumn` component should be rendered', () => {
      const { getByText } = render(templates.match(testRecord));

      expect(getByText('match column')).toBeDefined();
    });
  });

  describe('when column is `extension`', () => {
    it('then `DefaultColumn` component should be rendered', () => {
      const { getByText } = render(templates.extension(testRecord));

      expect(getByText('default column')).toBeDefined();
    });
  });

  describe('when column is `action`', () => {
    it('then `ActionColumn` component should be rendered', () => {
      const { getByText } = render(templates.action(testRecord));

      expect(getByText('action column')).toBeDefined();
    });
  });

  describe('when column is `folioRecord`', () => {
    it('then `MappedColumn` component should be rendered', () => {
      const { getByText } = render(templates.folioRecord(testRecord));

      expect(getByText('mapped column')).toBeDefined();
    });
  });

  describe('when column is `dataTypes`', () => {
    describe('and `dataTypes` field in record  is empty', () => {
      it('then `DefaultColumn` component should be rendered', () => {
        const { getByText } = render(templates.dataTypes(testRecord));

        expect(getByText('default column')).toBeDefined();
      });
    });

    describe('and `dataTypes` field in record is array of types', () => {
      const testRecordWithDataTypes = {
        ...testRecord,
        dataTypes: ['test type'],
      };

      it('then `DefaultColumn` component should be rendered', () => {
        const { getByText } = render(templates.dataTypes(testRecordWithDataTypes));

        expect(getByText('default column')).toBeDefined();
      });
    });
  });

  describe('when column is `importBlocked`', () => {
    describe('and `importBlocked` field in record is `false`', () => {
      it('then appropriate text should be rendered', () => {
        const { getByText } = render(templates.importBlocked(testRecord));

        expect(getByText('stripes-data-transfer-components.settings.fileExtension.allowImport')).toBeDefined();
      });
    });

    describe('and `importBlocked` field in record is `true`', () => {
      const testRecordWithBlockedImport = {
        ...testRecord,
        importBlocked: true,
      };

      it('then appropriate text should be rendered', () => {
        const { getByText } = render(templates.importBlocked(testRecordWithBlockedImport));

        expect(getByText('stripes-data-transfer-components.settings.fileExtension.blockImport')).toBeDefined();
      });
    });
  });

  describe('when column is `tags`', () => {
    it('then `TagsColumn` component should be rendered', () => {
      const { getByText } = render(templates.tags(testRecord));

      expect(getByText('tags column')).toBeDefined();
    });
  });

  describe('when column is `updated`', () => {
    it('then `DateColumn` component should be rendered', () => {
      const { getByText } = render(templates.updated(testRecord));

      expect(getByText('date column')).toBeDefined();
    });
  });

  describe('when column is `updatedBy`', () => {
    it('then `DefaultColumn` component should be rendered', () => {
      const { getByText } = render(templates.updatedBy(testRecord));

      expect(getByText('default column')).toBeDefined();
    });
  });

  describe('when column is `runBy`', () => {
    describe('and info about first name is exist', () => {
      it('then apropriate text should be rendered', () => {
        const { getByText } = render(templates.runBy(testRecord));

        expect(getByText('firstName lastName')).toBeDefined();
      });
    });

    describe('and info about first name is absence', () => {
      const testRecordWithoutFirstNameInfo = {
        ...testRecord,
        runBy: {
          firstName: '',
          lastName: 'lastName',
        },
      };

      it('then apropriate text should be rendered', () => {
        const { getByText } = render(templates.runBy(testRecordWithoutFirstNameInfo));

        expect(getByText('lastName')).toBeDefined();
      });
    });
  });

  describe('when column is `startedDate`', () => {
    it('then appropriate date should be rendered', () => {
      const { getByText } = render(templates.startedDate(testRecord));

      expect(getByText('test time')).toBeDefined();
    });
  });

  describe('when column is `completedDate`', () => {
    it('then appropriate date should be rendered', () => {
      const { getByText } = render(templates.completedDate(testRecord));

      expect(getByText('test time')).toBeDefined();
    });
  });

  describe('when column is `jobProfileName`', () => {
    it('then appropriate text should be rendered', () => {
      const { getByText } = render(templates.jobProfileName(testRecord));

      expect(getByText('test name')).toBeDefined();
    });
  });

  describe('when column is `totalRecords`', () => {
    it('then appropriate text should be rendered', () => {
      const { getByText } = renderWithIntl(templates.totalRecords(testRecord));

      expect(getByText('0')).toBeDefined();
    });

    it('then appropriate text should be rendered when progress is not defined', () => {
      const { getByText } = renderWithIntl(templates.totalRecords({ ...testRecord, progress: undefined }));

      expect(getByText('0')).toBeDefined();
    });
  });

  describe('when column is `fileName`', () => {
    it('then appropriate text should be rendered', () => {
      const { getByText } = render(templates.fileName(testRecord));

      expect(getByText('test name')).toBeDefined();
    });
  });

  describe('when column is `hrid`', () => {
    it('then appropriate text should be rendered', () => {
      const { getByText } = render(templates.hrId(testRecord));

      expect(getByText('testHRID')).toBeDefined();
    });
  });
});
