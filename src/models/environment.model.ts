import { z } from 'zod';

export const EnvironmentSchema = z.object({
  HTTPS: z.coerce.boolean(),
  HTTP: z.coerce.boolean(),
  HTTP_PORT: z.coerce.number().int(),
  HTTPS_PORT: z.coerce.number().int(),
  NODE_ENV: z.string(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;
