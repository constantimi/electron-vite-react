export class SessionStore {
  static getUserID() {
    return sessionStorage.getItem('user_id');
  }

  static getUserRole() {
    return sessionStorage.getItem('user_role');
  }

  static getActiveWorkspace() {
    return sessionStorage.getItem('active_workspace');
  }

  static getAccessToken() {
    return sessionStorage.getItem('access_token');
  }

  static setAccessToken(accessToken: string) {
    return sessionStorage.setItem('access_token', accessToken);
  }
}
