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
    const expected = `${userInfo.firstName} ${userInfo.lastName} (@${userInfo.userName})`;

    expect(formatUserName(emptyUserInfo).trim()).toBe('');
    expect(formatUserName(systemUserInfo)).toBe(SYSTEM_USER_NAME);
    expect(formatUserName(userInfo)).toBe(expected);
  });
});
