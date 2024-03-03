import { z } from 'zod';

export const userSettingsSchema = z.object({
  userId: z.string().optional(),
  lang: z.string(),
  fontSize: z.string(),
  theme: z.string(),
});

export const addUserSettingsSchema = z.object({
  lang: z.string(),
  fontSize: z.string(),
  theme: z.string(),
});

export type UserSettingsType = z.infer<typeof userSettingsSchema>;
export type AddUserSettingsType = z.infer<typeof addUserSettingsSchema>;

export type Status = {
  code: number;
  loading: boolean;
  msg: string;
};

export type SettingsOption = {
  init: string;
  value: string;
};

export type SettingsStoreSchema = {
  loaded: boolean;
  isSettingsModified: boolean;
  isSettingsUpdated: boolean;
  touchscreen?: boolean;
  status: Status;
  defaultLang: SettingsOption;
  defaultFontSize: SettingsOption;
  defaultTheme: SettingsOption;
};
