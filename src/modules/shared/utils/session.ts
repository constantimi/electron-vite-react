export class SessionStore {
  static getUserID() {
    return sessionStorage.getItem('user_id');
  }

  static getUserRole() {
    return sessionStorage.getItem('user_role');
  }

  static getSystemRole() {
    return sessionStorage.getItem('system_role');
  }

  static getActiveUserAvatarURL() {
    return sessionStorage.getItem('user_avatar_url');
  }

  static setActiveUserAvatarURL(avatar: string) {
    return sessionStorage.setItem('user_avatar_url', avatar);
  }

  static setActiveTeamSlug(slug: string) {
    return sessionStorage.setItem('active_team_slug', slug);
  }

  static getActiveTeamSlug() {
    return sessionStorage.getItem('active_team_slug');
  }

  static getActiveWorkspace() {
    return sessionStorage.getItem('active_workspace');
  }

  static getActiveWorkspaceName() {
    return sessionStorage.getItem('active_workspace_name');
  }

  static setActiveWorkspaceName(workspace: string) {
    return sessionStorage.setItem('active_workspace_name', workspace);
  }

  static getAccessToken() {
    return sessionStorage.getItem('access_token');
  }

  static setAccessToken(accessToken: string) {
    return sessionStorage.setItem('access_token', accessToken);
  }
}
