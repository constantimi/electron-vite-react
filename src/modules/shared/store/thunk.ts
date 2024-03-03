import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { AppDispatch } from '.';
import axiosClient, { AxiosClient } from '../utils/axios';

export enum ThunkMethod {
  'delete' = 'delete',
  'put' = 'put',
  'post' = 'post',
  'get' = 'get',
}

export type ThunkConfig<R> = {
  name: string;
  error: string;
  responseProperty: keyof AxiosResponse<R>;
  axiosClient?: AxiosInstance;
};

interface ErrorResponse {
  error: string;
  fields?: { [key: string]: string };
}

export enum ErrorTag {
  Validation = 'data validation error',
}

export type ThunkError = {
  validation?: string;
  message: string;
  error?: {
    raw?: unknown;
    axios?: AxiosError<ErrorResponse>;
  };
};

export const isAxiosError = (
  error: unknown
): error is AxiosError<ErrorResponse> =>
  (error as AxiosError<ErrorResponse>)?.isAxiosError === true;

export const createAppAsyncThunk =
  <R>() =>
  <UrlArgs, BodyArgs, HeaderArgs, Body>(
    m: ThunkMethod,
    url: (args?: UrlArgs) => string,
    cfg: ThunkConfig<R>,
    body?: (args: BodyArgs) => Body | undefined,
    header?: (args?: HeaderArgs) => AxiosRequestHeaders | undefined,
    validator?: (val: unknown) => Zod.SafeParseReturnType<unknown, R>,
    cleanup?: (dispatch: AppDispatch) => void,
    mockData?: R,
    mockMode = false
  ) =>
    createAsyncThunk<
      R,
      { urlArgs?: UrlArgs; bodyArgs?: BodyArgs; headerArgs?: HeaderArgs },
      {
        rejectValue: ThunkError;
      }
    >(cfg.name, async ({ urlArgs, bodyArgs, headerArgs }, thunkAPI) => {
      try {
        if (mockMode && mockData) {
          return mockData;
        }

        const client = cfg.axiosClient ? cfg.axiosClient : axiosClient;
        const headers = header ? header(headerArgs) : {};
        const resConf: AxiosRequestConfig = {
          data: body && bodyArgs && body(bodyArgs),
          headers,
        };

        let resp: AxiosResponse<R>;
        if (m === ThunkMethod.get || m === ThunkMethod.delete) {
          resp = await (client as AxiosClient)[m](url(urlArgs), resConf);
        } else {
          resp = await (client as AxiosClient)[m](
            url(urlArgs),
            resConf.data,
            resConf
          );
        }
        let data: R = resp[cfg.responseProperty];
        if (validator) {
          const check = validator(data);
          if (!check.success) {
            return thunkAPI.rejectWithValue({
              message: cfg.error,
              validation: `validation error: [${JSON.stringify(check.error)}]`,
            });
          }
          data = check.data;
        }

        if (cleanup) cleanup(thunkAPI.dispatch as AppDispatch);

        return data;
      } catch (e) {
        if (isAxiosError(e)) {
          return thunkAPI.rejectWithValue({
            error: { raw: e, axios: e },
            message: cfg.error,
          });
        }

        return thunkAPI.rejectWithValue({
          error: { raw: e },
          message: cfg.error,
        });
      }
    });
