import { z } from 'zod';

export const RegisterScheme = {
  username: 'username',
  firstName: 'firstName',
  lastName: 'lastName',
};

export const RegisterRequestSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
