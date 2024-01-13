import { z } from 'nestjs-zod/z';

export const environmentSchema = z.object({
  COHERE_API_KEY: z.string({
    required_error: 'env variable COHERE_API_KEY missing',
  }),
  XATA_BRANCH: z.string({
    required_error: 'env variable XATA_BRANCH missing',
  }),
  XATA_API_KEY: z.string({
    required_error: 'env variable XATA_API_KEY missing',
  }),
  AWS_REGION: z.string({
    required_error: 'env variable AWS_REGION missing',
  }),
  AWS_ACCESS_KEY: z.string({
    required_error: 'env variable AWS_ACCESS_KEY missing',
  }),
  AWS_SECRECT_ACCESS_KEY: z.string({
    required_error: 'env variable AWS_SECRECT_ACCESS_KEY missing',
  }),
  AWS_ACCOUNT_ID: z.string({
    required_error: 'env variable AWS_ACCOUNT_ID missing',
  }),
  JWT_SECRET: z.string({
    required_error: 'env variable JWT_SECRET missing',
  }),
  JWT_EXPIRATION_TIME: z.string({
    required_error: 'env variable JWT_EXPIRATION_TIME missing',
  }),
});
