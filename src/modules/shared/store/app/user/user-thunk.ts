import AuthAPI from '../../../constants/authApi';
import { ThunkMethod, createAppAsyncThunk } from '../../thunk';
import {
  UserInfoResponse,
  UserInfo,
  userInfoSchema,
} from '../../../types/settings/userSettingsValidators';

export const loadUserInfo = createAppAsyncThunk<UserInfoResponse>()(
  ThunkMethod.get,
  (id?: string) => `${AuthAPI.endpoints().users}/${id}`,
  {
    name: 'loadUserInfo',
    error: 'Er is iets fout gegaan bij het updaten van de gebruiker.',
    responseProperty: 'data',
  },
  undefined,
  undefined,
  userInfoSchema.safeParse
);

export const updateUserInfo = createAppAsyncThunk<UserInfoResponse>()(
  ThunkMethod.put,
  (id?: string) => `${AuthAPI.endpoints().users}/${id}`,
  {
    name: 'updateUserInfo',
    error: 'Er is iets fout gegaan bij het updaten van de gebruiker.',
    responseProperty: 'data',
  },
  (b?: Partial<UserInfo>) => b,
  undefined,
  userInfoSchema.safeParse
);
