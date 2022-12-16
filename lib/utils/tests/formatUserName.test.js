import { formatUserName } from '../formatUserName';

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
    expect(formatUserName(systemUserInfo)).toBe('  (@System)');
    expect(formatUserName(userInfo)).toBe(expected);
  });
});
