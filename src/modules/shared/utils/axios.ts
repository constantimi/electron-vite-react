import { z } from 'zod';
import jwtDecode from 'jwt-decode';
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import AuthAPI from '../constants/authApi';

export class AxiosClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();

    this.axiosInstance.interceptors.request.use(AxiosClient.addAccessToken);
    this.axiosInstance.interceptors.response.use(
      undefined,
      this.handleUnauthorized
    );
  }

  static setTokens(accessToken: string, refreshToken?: string) {
    sessionStorage.setItem('access_token', accessToken);

    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }

    try {
      const payload = z
        .object({
          sub: z.string(),
          role: z.string(),
          sr: z.string().optional(),
          ws: z.string(),
        })
        .parse(jwtDecode(accessToken));
      sessionStorage.setItem('user_id', payload.sub);
      sessionStorage.setItem('user_role', payload.role);
      if (payload.sr) {
        sessionStorage.setItem('system_role', payload.sr);
      }

      sessionStorage.setItem('active_workspace', payload.ws);
    } catch {
      AxiosClient.clearTokens();
      window.location.href = '/';
      throw new Error('Invalid application settings. You must log in again');
    }
  }

  static clearTokens() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_role');
    sessionStorage.removeItem('team_role');
    sessionStorage.removeItem('system_role');
    sessionStorage.removeItem('user_avatar_url');
    sessionStorage.removeItem('active_workspace');
    sessionStorage.removeItem('active_workspace_name');
    sessionStorage.removeItem('active_team_slug');
    sessionStorage.removeItem('active_team_id');

    localStorage.removeItem('refresh_token');
  }

  static addAccessToken(config: InternalAxiosRequestConfig) {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        config.headers = new AxiosHeaders({
          Authorization: `Bearer ${accessToken}`,
        });
      }
    }
    return config;
  }

  // Check if the token has expired
  static validToken(token: string | null) {
    if (!token) {
      return false;
    }

    const decodeToken = z
      .object({
        exp: z.number(),
      })
      .parse(jwtDecode(token));

    // The expirationTime must be calculated, it comes as milliseconds
    const expirationTime = Number(decodeToken.exp) * 1000;

    return Date.now() <= expirationTime;
  }

  public static async RefreshToken(
    refreshToken: string,
    slug?: string
  ): Promise<string> {
    try {
      // Replace this with your actual refresh token API endpoint
      const response: AxiosResponse = await axios.get(
        AuthAPI.endpoints().refresh_token(slug),
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const newAccessToken = response.data.access_token;
      AxiosClient.setTokens(newAccessToken);
      return newAccessToken;
    } catch (refreshError) {
      // Handle refresh token failure (e.g., logout, show an error message, etc.)
      AxiosClient.clearTokens();
      window.location.href = '/';
      throw new Error('Unauthorized');
    }
  }

  private handleUnauthorized = async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      retry: boolean;
    };

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest.retry
    ) {
      originalRequest.retry = true;

      const refreshToken = localStorage.getItem('refresh_token');
      const refreshTokenValid = AxiosClient.validToken(refreshToken);

      if (refreshToken && refreshTokenValid) {
        try {
          const newAccessToken = await AxiosClient.RefreshToken(refreshToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          } else {
            originalRequest.headers = {
              Authorization: `Bearer ${newAccessToken}`,
            };
          }
          return this.axiosInstance(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure (e.g., logout, show an error message, etc.)
          AxiosClient.clearTokens();
          window.location.href = '/';
          throw new Error('Unauthorized');
        }
      } else {
        AxiosClient.clearTokens();
        window.location.href = '/';
        throw new Error('Unauthorized');
      }
    }

    return Promise.reject(error);
  };

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.axiosInstance.request(config);
  }
}

const axiosClient = new AxiosClient();

export default axiosClient;
