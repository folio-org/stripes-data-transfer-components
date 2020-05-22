import React from 'react';
import { FormattedDate } from 'react-intl';
import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import mappingProfilesData from './mappingProfilesData';
import { listTemplate } from '../listTemplate';

describe('MappingProfiles > listTemplate', () => {
  const mappingProfile = mappingProfilesData[0];
  const {
    name,
    metadata: { updatedDate },
    userInfo: {
      firstName,
      lastName,
    },
  } = mappingProfile;

  it('should format name field value correctly', () => {
    expect(listTemplate.name(mappingProfile)).to.be.equal(name);
  });

  it('should format folio record field correctly', () => {
    const messageElement = listTemplate.folioRecord(mappingProfile);

    expect(messageElement[0].props.id.endsWith('recordTypes.holdings')).to.equal(true);
  });

  it('should format updatedBy field correctly', () => {
    expect(listTemplate.updatedBy(mappingProfile)).to.equal(`${firstName} ${lastName}`);
  });

  it('should format completed date field value correctly', () => {
    const formattedDate = <FormattedDate value={updatedDate} />;
    const templateDate = listTemplate.updated(mappingProfile);

    expect(templateDate.props.value).to.equal(formattedDate.props.value);
    expect(templateDate.props.day).to.equal(formattedDate.props.day);
    expect(templateDate.props.month).to.equal(formattedDate.props.month);
    expect(templateDate.props.year).to.equal(formattedDate.props.year);
  });
});
