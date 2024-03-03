import { SessionStore } from '../session';

describe('SessionStore', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get the user ID', () => {
    SessionStore.getUserID();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('user_id');
  });

  it('should get the user role', () => {
    SessionStore.getUserRole();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('user_role');
  });

  it('should get the system role', () => {
    SessionStore.getSystemRole();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('system_role');
  });

  it('should get the active workspace', () => {
    SessionStore.getActiveWorkspace();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('active_workspace');
  });

  it('should get the access token', () => {
    SessionStore.getAccessToken();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('access_token');
  });
});
