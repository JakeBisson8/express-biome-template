import { z } from 'zod';

// Need this to type the min and max version since they are expected to be of type SecureVersion from node:tls
const SecureVersionSchema = z.enum(['TLSv1', 'TLSv1.1', 'TLSv1.2', 'TLSv1.3']);

// Not exporting this to force people to use this file to get their parsed environment variable
const EnvironmentSchema = z.object({
  HTTPS_ENABLED: z.enum(['true', 'false']).transform((v) => v === 'true'),
  HTTP_ENABLED: z.enum(['true', 'false']).transform((v) => v === 'true'),
  HTTP_PORT: z.coerce.number().int(),
  HTTPS_PORT: z.coerce.number().int(),
  NODE_ENV: z.string(),
  SSL_CERTIFICATE_FILE: z.string(),
  SSL_KEY_FILE: z.string(),
  DH_PARAM_FILE: z.string(),
  SSL_MIN_VERSION: SecureVersionSchema,
  SSL_MAX_VERSION: SecureVersionSchema,
  SSL_CIPHERS: z.string(),
  ECDH_CURVES: z.string(),
  HSTS_MAX_AGE: z.coerce.number().int(),
  HSTS_INCLUDE_SUBDOMAINS: z.enum(['true', 'false']).transform((v) => v === 'true'),
  HSTS_PRELOAD: z.enum(['true', 'false']).transform((v) => v === 'true'),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

export const environment: Environment = EnvironmentSchema.parse(process.env);
