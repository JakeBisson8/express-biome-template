import { z } from 'zod';

// Not exporting this to force people to use this file to get their parsed environment variable
const EnvironmentSchema = z.object({
  HTTPS_ENABLED: z.enum(['true', 'false']).transform((v) => v === 'true'),
  HTTP_ENABLED: z.enum(['true', 'false']).transform((v) => v === 'true'),
  HTTP_PORT: z.coerce.number().int(),
  HTTPS_PORT: z.coerce.number().int(),
  NODE_ENV: z.string(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

export const environment: Environment = EnvironmentSchema.parse(process.env);
