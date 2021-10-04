import { mappingProfilesData } from './tests/mappingProfilesData';
import { useMappingProfileListFormatter } from './useMappingProfileListFormatter';
import { getHookExecutionResult } from '../../../test/bigtest/helpers';

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
      expect(listFormatter.name(mappingProfile)).toEqual(name);
    });

    it('should format folio record field correctly', () => {
      expect(listFormatter.folioRecord(mappingProfile)).toBe('Holdings');
    });

    it('should format updatedBy field correctly', () => {
      expect(listFormatter.updatedBy(mappingProfile)).toBe(`${firstName} ${lastName}`);
    });

    it('should format completed date field value correctly', () => {
      expect(listFormatter.updated(mappingProfile)).toBe('12/4/2018');
    });
  });

  describe('executing with custom props', () => {
    const customFormatter = { deleted: record => record.deleted };
    const listFormatter = getHookExecutionResult(useMappingProfileListFormatter, [customFormatter]);

    it('should support custom formatters - deleted', () => {
      expect(listFormatter.deleted(mappingProfile)).toBeFalsy();
    });
  });
});
