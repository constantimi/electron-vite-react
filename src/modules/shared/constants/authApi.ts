import config from '../config/config';

const endpoints = () => {
  const baseUrl = `${config.API_URL}/api/auth`;

  return {
    base: baseUrl,

    token: `${baseUrl}/users/token/54bb2165-71e1-41a6-af3e-7da4a0e1e2c1`,
    refresh_token: `${baseUrl}/users/token/refresh/54bb2165-71e1-41a6-af3e-7da4a0e1e2c1`,
  };
};

const AuthAPI = {
  endpoints,
};

export default AuthAPI;
