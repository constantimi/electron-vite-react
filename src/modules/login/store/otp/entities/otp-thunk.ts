import axios, { AxiosRequestHeaders } from 'axios';
import {
  ThunkMethod,
  createAppAsyncThunk,
} from '../../../../shared/store/thunk';
import AuthAPI from '../../../../shared/constants/authApi';
import { OtpReponseSchema, OtpResponse } from '../../../types/otp';

const otpThunk = createAppAsyncThunk<OtpResponse>()(
  ThunkMethod.get,
  () => AuthAPI.endpoints().token,
  {
    name: 'otp',
    error: 'No otp loading',
    responseProperty: 'data',
    axiosClient: axios,
  },
  undefined,
  (
    args: { email: string; otp: string } | undefined
  ): AxiosRequestHeaders | undefined => {
    if (!args) return undefined;
    const { email, otp } = args;
    const headers = {
      Authorization: `Basic ${btoa(`${email}:${otp}`)}`,
    } as AxiosRequestHeaders;
    return headers;
  },
  OtpReponseSchema.safeParse
);

export default otpThunk;
