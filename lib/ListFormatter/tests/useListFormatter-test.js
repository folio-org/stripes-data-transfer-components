import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import { useListFormatter } from '../useListFormatter';
import { getHookExecutionResult } from '../../../test/bigtest/helpers';

const record = {
  id: '1737d899-6fb9-44f4-ba16-9a8b111cd61d',
  name: 'AP holdings-MARC Bib',
  description: 'Use for PurpleVendor approval plan MARC files',
  userInfo: {
    firstName: 'John',
    lastName: 'M',
    userName: 'john_m',
  },
  metadata: { updatedDate: '2018-12-04T09:05:30.000+0000' },
};

describe('useListFormatter', () => {
  const {
    name,
    userInfo: {
      firstName,
      lastName,
      userName,
    },
  } = record;

  const customFormatters = { userName: item => item.userInfo.userName };
  const listFormatter = getHookExecutionResult(useListFormatter, [customFormatters]);

  it('should format name field value correctly', () => {
    expect(listFormatter.name(record)).to.be.equal(name);
  });

  it('should format updatedBy field correctly', () => {
    expect(listFormatter.updatedBy(record)).to.equal(`${firstName} ${lastName}`);
  });

  it('should format updatedBy field correctly', () => {
    expect(listFormatter.updatedBy({})).to.equal('');
  });

  it('should format completed date field value correctly', () => {
    expect(listFormatter.updated(record)).to.equal('12/4/2018');
  });

  it('should add custom orders to formatter - userName', () => {
    expect(listFormatter.userName(record)).to.equal(userName);
  });
});
