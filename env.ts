import { z } from 'zod';

const envSchemas = z.object({
  VITE_BASE_URL_API: z.url(),
});

export const env = envSchemas.parse(process.env);
