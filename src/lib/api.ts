import { z } from 'zod';

export const apiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});

export function createApiResponseSchema<T extends z.ZodType>(dataSchema: T) {
  return z.discriminatedUnion('success', [
    z.object({ success: z.literal(true), data: dataSchema }),
    apiErrorSchema,
  ]);
}

export function createApiSuccess<T>(data: T) {
  return { success: true as const, data };
}

export function createApiError(
  code: string,
  message: string,
  details?: unknown,
) {
  return {
    success: false as const,
    error: {
      code,
      message,
      ...(details === undefined ? {} : { details }),
    },
  };
}

interface FetchValidatedJsonOptions<T> {
  input: RequestInfo | URL;
  schema: z.ZodType<T>;
  init?: RequestInit;
  invalidResponseMessage: string;
  networkErrorMessage?: string;
  timeoutMs?: number;
}

export async function fetchValidatedJson<T>({
  input,
  schema,
  init,
  invalidResponseMessage,
  networkErrorMessage = invalidResponseMessage,
  timeoutMs = 15_000,
}: FetchValidatedJsonOptions<T>): Promise<T> {
  let response: Response;

  try {
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    const signal = init?.signal
      ? AbortSignal.any([init.signal, timeoutSignal])
      : timeoutSignal;

    response = await fetch(input, {
      ...init,
      signal,
    });
  } catch {
    throw new Error(networkErrorMessage);
  }

  const payload: unknown = await response.json().catch(() => null);
  const parsed = schema.safeParse(payload);

  if (!parsed.success) throw new Error(invalidResponseMessage);

  return parsed.data;
}

interface FetchApiDataOptions<T>
  extends Omit<FetchValidatedJsonOptions<T>, 'schema'> {
  dataSchema: z.ZodType<T>;
}

export async function fetchApiData<T>({
  dataSchema,
  ...options
}: FetchApiDataOptions<T>): Promise<T> {
  const response = await fetchValidatedJson({
    ...options,
    schema: createApiResponseSchema(dataSchema),
  });

  if (!response.success) throw new Error(response.error.message);

  return response.data;
}
