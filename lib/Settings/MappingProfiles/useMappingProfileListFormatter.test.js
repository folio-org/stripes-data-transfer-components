import { renderHook } from '@testing-library/react-hooks';
import { IntlProvider } from 'react-intl';
import { mappingProfilesData } from './tests/mappingProfilesData';
import { useMappingProfileListFormatter } from './useMappingProfileListFormatter';

describe('MappingProfiles > useMappingProfileListFormatter', () => {
  const mappingProfile = mappingProfilesData[0];
  const {
    name,
    userInfo: {
      firstName,
      lastName,
    },
  } = mappingProfile;

  const wrapper = ({ children }) => (
    <IntlProvider locale="en">
      {children}
    </IntlProvider>
  );

  describe('executing without custom props', () => {
    const { result } = renderHook(() => useMappingProfileListFormatter(), { wrapper });

    it('should format name field value correctly', () => {
      expect(result.current.name(mappingProfile)).toEqual(name);
    });

    it('should format updatedBy field correctly', () => {
      expect(result.current.updatedBy(mappingProfile)).toBe(`${firstName} ${lastName}`);
    });

    it('should format completed date field value correctly', () => {
      expect(result.current.updated(mappingProfile)).toBe('12/4/2018');
    });
  });

  describe('executing with custom props', () => {
    const customFormatter = { deleted: record => record.deleted };
    const { result } = renderHook(() => useMappingProfileListFormatter(customFormatter), { wrapper });

    it('should support custom formatters - deleted', () => {
      expect(result.current.deleted(mappingProfile)).toBeFalsy();
    });
  });
});
