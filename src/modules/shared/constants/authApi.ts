import config from '../config/config';
import { SessionStore } from '../utils/session';

const endpoints = () => {
  const workspace = SessionStore.getActiveWorkspace();
  const userID = SessionStore.getUserID();
  const baseUrl = `${config.API_URL}/api/auth/v1`;
  return {
    base: baseUrl,
    token: `${baseUrl}/users/token/54bb2165-71e1-41a6-af3e-7da4a0e1e2c1`,
    refresh_token: (ws?: string) =>
      `${baseUrl}/${
        ws || workspace
      }/users/token/refresh/54bb2165-71e1-41a6-af3e-7da4a0e1e2c1`,
    register: `${baseUrl}/users/confirm`,
    users: `${baseUrl}/users`,
    usersSearch: `${baseUrl}/users/search`,
    userInfo: `${baseUrl}/users/info`,
    otp: `${baseUrl}/users/otp`,

    workspaces: `${baseUrl}/workspaces`,
    workspacesInfo: `${baseUrl}/workspaces/info`,
    searchWorkspaces: `${baseUrl}/workspaces/search`,
    workspaceUsers: `${baseUrl}/${workspace}/users`,
    workspaceUsersInfo: `${baseUrl}/${workspace}/users/info`,

    currentWorksapce: `${baseUrl}/workspaces/${workspace}/users`,
    workspacesOfUser: `${baseUrl}/users/${userID}/workspaces`,

    usersInWorkspace: `${baseUrl}/${workspace}/users`,
    searchUsersInWorkspace: `${baseUrl}/${workspace}/users/search`,

    userSettings: `${baseUrl}/users/settings`,
  };
};

const AuthAPI = {
  endpoints,
};

export default AuthAPI;
