import AuthAPI from '../../../constants/authApi';
import {
  AddUserSettingsType,
  UserSettingsType,
  userSettingsSchema,
} from '../../../types/settings/settingsValidators';
import { ThunkMethod, createAppAsyncThunk } from '../../thunk';

export const createUserSettings = createAppAsyncThunk<UserSettingsType>()(
  ThunkMethod.post,
  (id?: string) => `${AuthAPI.endpoints().userSettings}/${id}`,
  {
    name: 'createUserSettings',
    error: 'Semething went wrong while loading the User Settings',
    responseProperty: 'data',
  },
  (b?: AddUserSettingsType) => b,
  undefined,
  userSettingsSchema.safeParse
);

export const loadUserSettings = createAppAsyncThunk<UserSettingsType>()(
  ThunkMethod.get,
  (id?: string) => `${AuthAPI.endpoints().userSettings}/${id}`,
  {
    name: 'loadUserSettings',
    error: 'Semething went wrong while loading the User Settings',
    responseProperty: 'data',
  },
  undefined,
  undefined,
  userSettingsSchema.safeParse
);

export const updateUserSettings = createAppAsyncThunk<UserSettingsType>()(
  ThunkMethod.put,
  (id?: string) => `${AuthAPI.endpoints().userSettings}/${id}`,
  {
    name: 'updateUserSettings',
    error: 'Semething went wrong while loading the User Settings',
    responseProperty: 'data',
  },
  (b?: Partial<AddUserSettingsType>) => b,
  undefined,
  userSettingsSchema.safeParse
);
