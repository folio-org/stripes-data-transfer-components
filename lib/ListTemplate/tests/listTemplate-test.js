import React from 'react';
import { FormattedDate } from 'react-intl';
import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import { listTemplate } from '../listTemplate';

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

describe('listTemplate', () => {
  const {
    name,
    metadata: { updatedDate },
    userInfo: {
      firstName,
      lastName,
    },
  } = record;

  it('should format name field value correctly', () => {
    expect(listTemplate.name(record)).to.be.equal(name);
  });

  it('should format updatedBy field correctly', () => {
    expect(listTemplate.updatedBy(record)).to.equal(`${firstName} ${lastName}`);
  });

  it('should format updatedBy field correctly', () => {
    expect(listTemplate.updatedBy({})).to.equal('');
  });

  it('should format completed date field value correctly', () => {
    const formattedDate = <FormattedDate value={updatedDate} />;
    const templateDate = listTemplate.updated(record);

    expect(templateDate.props.value).to.equal(formattedDate.props.value);
    expect(templateDate.props.day).to.equal(formattedDate.props.day);
    expect(templateDate.props.month).to.equal(formattedDate.props.month);
    expect(templateDate.props.year).to.equal(formattedDate.props.year);
  });
});
