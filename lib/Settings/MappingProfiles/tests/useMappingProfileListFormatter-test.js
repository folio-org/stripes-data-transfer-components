import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import { mappingProfilesData } from './mappingProfilesData';
import { useMappingProfileListFormatter } from '../useMappingProfileListFormatter';
import { getHookExecutionResult } from '../../../../test/bigtest/helpers';

describe('MappingProfiles > useMappingProfileListFormatter', () => {
  const mappingProfile = mappingProfilesData[0];
  const {
    name,
    userInfo: {
      firstName,
      lastName,
    },
  } = mappingProfile;

  describe('executing without custom props', () => {
    const listFormatter = getHookExecutionResult(useMappingProfileListFormatter);

    it('should format name field value correctly', () => {
      expect(listFormatter.name(mappingProfile)).to.be.equal(name);
    });

    it('should format folio record field correctly', () => {
      expect(listFormatter.folioRecord(mappingProfile)).to.equal('Holdings');
    });

    it('should format updatedBy field correctly', () => {
      expect(listFormatter.updatedBy(mappingProfile)).to.equal(`${firstName} ${lastName}`);
    });

    it('should format completed date field value correctly', () => {
      expect(listFormatter.updated(mappingProfile)).to.equal('12/4/2018');
    });
  });

  describe('executing with custom props', () => {
    const customFormatter = { deleted: record => record.deleted };
    const listFormatter = getHookExecutionResult(useMappingProfileListFormatter, [customFormatter]);

    it('should support custom formatters - deleted', () => {
      expect(listFormatter.deleted(mappingProfile)).to.be.false;
    });
  });
});
