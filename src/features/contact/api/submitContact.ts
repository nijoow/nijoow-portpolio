import {
  contactApiResponseSchema,
  type ContactFormData,
} from '@/features/contact/schemas/contactSchema';

const INVALID_RESPONSE_MESSAGE =
  '응답을 확인하지 못했습니다. 이메일로 직접 연락해 주세요.';

export async function submitContact(data: ContactFormData): Promise<string> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  const responseBody: unknown = await response.json();
  const parsedResponse = contactApiResponseSchema.safeParse(responseBody);

  if (!parsedResponse.success) {
    throw new Error(INVALID_RESPONSE_MESSAGE);
  }

  if (!parsedResponse.data.success) {
    throw new Error(parsedResponse.data.error.message);
  }

  return parsedResponse.data.data.message;
}
