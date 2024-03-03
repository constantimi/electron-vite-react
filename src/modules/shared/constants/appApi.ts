import config from '../config/config';
import { SessionStore } from '../utils/session';

const endpoints = () => {
  const workspace = SessionStore.getActiveWorkspace();
  const teamSlug = SessionStore.getActiveTeamSlug();
  const baseUrlSystem = `${config.API_URL}/api/app/v3`;
  const baseUrlWorkspace = `${config.API_URL}/api/app/v3/${workspace}`;

  return {
    containers: `${baseUrlWorkspace}/teams/${teamSlug}/containers`,
    rows: `${baseUrlWorkspace}/teams/${teamSlug}/rows`,
    dashboards: `${baseUrlWorkspace}/teams/${teamSlug}/dashboards`,
    folders: `${baseUrlWorkspace}/teams/${teamSlug}/folders`,
    chart: `${baseUrlWorkspace}/teams/${teamSlug}/charts`,
    chartSession: `${baseUrlWorkspace}/teams/${teamSlug}/charts/session`,
    workspaceCatalog: `${baseUrlWorkspace}/catalog`,
    catalog: `${baseUrlWorkspace}/teams/${teamSlug}/catalog`,
    filters: `${baseUrlWorkspace}/teams/${teamSlug}/filters`,
    filtersValues: `${baseUrlWorkspace}/teams/${teamSlug}/filters/values`,
    sources: `${baseUrlWorkspace}/teams/${teamSlug}/sources`,
    teams: `${baseUrlWorkspace}/teams`,
    teamsPersonal: `${baseUrlWorkspace}/teams/user`,
    teamsInfo: `${baseUrlWorkspace}/teams/info`,
    teamUsers: `${baseUrlWorkspace}/teams/${teamSlug}/users`,
    addUserTeam: `${baseUrlWorkspace}/teams/`,
    teamsSystemInfo: `${baseUrlSystem}/admin/teams/info`,
    systemTeams: `${baseUrlSystem}/admin/teams`,
  };
};

const AppAPI = {
  endpoints,
};

export default AppAPI;
