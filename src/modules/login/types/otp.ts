import { z } from 'zod';

export const OtpReponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export type OtpResponse = z.infer<typeof OtpReponseSchema>;
