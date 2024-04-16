import { formatUserName } from '../formatUserName';
import { SYSTEM_USER_NAME } from '../constants';

describe('formatUserName function', () => {
  it('returns formatted username', () => {
    const emptyUserInfo = {};
    const systemUserInfo = { userName: 'System' };
    const userInfo = {
      firstName: 'John',
      lastName: 'Doe',
      userName: 'admin',
    };
    const expected = `${userInfo.lastName}, ${userInfo.firstName} (@${userInfo.userName})`;

    expect(formatUserName(emptyUserInfo).trim()).toBe('');
    expect(formatUserName(systemUserInfo)).toBe(SYSTEM_USER_NAME);
    expect(formatUserName(userInfo)).toBe(expected);
  });

  describe('when first name doesn\'t exist', () => {
    it('should return formatted user name', () => {
      const userInfo = {
        firstName: '',
        lastName: 'Doe',
        userName: 'admin',
      };
      const expected = `${userInfo.lastName} (@${userInfo.userName})`;

      expect(formatUserName(userInfo)).toBe(expected);
    });
  });
});
