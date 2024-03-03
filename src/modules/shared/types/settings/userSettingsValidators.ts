import { z } from 'zod';

export const UserFormScheme = {
  username: 'username',
  firstName: 'firstName',
  lastName: 'lastName',
  avatarUrl: 'avatarUrl',
  email: 'email',
};

export const workspaceUserInfo = z.object({
  role: z.string(),
  name: z.string(),
});

export const userInfoSchema = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  avatarUrl: z.string(),
  active: z.boolean(),
  verified: z.boolean(),
  userName: z.string(),
  workspaces: z.array(workspaceUserInfo).optional(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;

export type UserInfoResponse = z.infer<typeof userInfoSchema>;
