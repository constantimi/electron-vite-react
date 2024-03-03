import { z } from 'zod';

export enum TeamRole {
  manager = 'MANAGER',
  admin = 'ADMIN',
  user = 'USER',
  systemAdmin = 'SYSTEM_ADMIN',
}

export const teamActiveSchema = z.object({
  team_id: z.string(),
  workspace_id: z.string(),
  slug: z.string(),
  name: z.string(),
  avatar_url: z.string(),
  team_role: z.string(),
  archived: z.boolean(),
});

export const teamUserSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  id: z.string(),
  teamRole: z.string(),
  userName: z.string(),
});

export const teamSchemaShared = z.object({
  id: z.string(),
  avatar_url: z.string(),
  name: z.string(),
  archived: z.boolean(),
  workspace_id: z.string(),
  slug: z.string(),
});

export const teamSearchArray = z.array(teamSchemaShared);

export const teamBaseSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  name: z.string(),
  avatar_url: z.string(),
  slug: z.string(),
  archived: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const teamWithUsersSchema = teamBaseSchema.extend({
  users: z.array(teamUserSchema),
});

export type Team = z.infer<typeof teamWithUsersSchema>;

export type ActiveTeam = z.infer<typeof teamActiveSchema>;

export type TeamSharedType = z.infer<typeof teamSchemaShared>;
