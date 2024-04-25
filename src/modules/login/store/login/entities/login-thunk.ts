import axios, { AxiosRequestHeaders } from 'axios';
import AuthAPI from '../../../../shared/constants/authApi';
import {
  ThunkMethod,
  createAppAsyncThunk,
} from '../../../../shared/store/thunk';

export const loginThunk = createAppAsyncThunk<undefined>()(
  ThunkMethod.get,
  () => AuthAPI.endpoints().otp,
  {
    name: 'login',
    error: 'No login loading',
    responseProperty: 'data',
    axiosClient: axios,
  },
  undefined,
  (
    headerArgs: { email: string } | undefined
  ): AxiosRequestHeaders | undefined => {
    if (!headerArgs) return undefined;

    const { email } = headerArgs;
    const headers = {
      Authorization: `Basic ${btoa(`${email}:`)}`,
    } as AxiosRequestHeaders;
    return headers;
  },
  undefined
);

export const signupThunk = createAppAsyncThunk<undefined>()(
  ThunkMethod.post,
  () => AuthAPI.endpoints().signup,
  {
    name: 'signup',
    error: 'No login loading',
    responseProperty: 'data',
    axiosClient: axios,
  },
  (b?: { email: string }) => b,
  (
    headerArgs: { email: string } | undefined
  ): AxiosRequestHeaders | undefined => {
    if (!headerArgs) return undefined;

    const { email } = headerArgs;
    const headers = {
      Authorization: `Basic ${btoa(`${email}:`)}`,
    } as AxiosRequestHeaders;
    return headers;
  },
  undefined
);
