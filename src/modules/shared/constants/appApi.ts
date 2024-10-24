import config from '../config/config';
import { SessionStore } from '../utils/session';

const endpoints = () => {
  const workspace = SessionStore.getActiveWorkspace();
  const baseUrl = `${config.API_URL}/api`;

  return {
    base: baseUrl,

    users: `${baseUrl}/users`,

    insurances: `${baseUrl}/insurances`,
    addInsurance: `${baseUrl}/insurance/add`,

    workspaces: `${baseUrl}/workspaces`,
    workspaceUsers: `${baseUrl}/${workspace}/users`,
  };
};

const AppAPI = {
  endpoints,
};

export default AppAPI;
