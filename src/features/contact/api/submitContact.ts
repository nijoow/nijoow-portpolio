import {
  contactApiDataSchema,
  type ContactFormData,
} from '@/features/contact/schemas/contactSchema';
import { fetchApiData } from '@/lib/api';

const INVALID_RESPONSE_MESSAGE =
  '응답을 확인하지 못했습니다. 이메일로 직접 연락해 주세요.';
const NETWORK_ERROR_MESSAGE =
  '네트워크 연결을 확인한 뒤 다시 시도해 주세요. 문제가 계속되면 이메일로 직접 연락해 주세요.';

export async function submitContact(data: ContactFormData): Promise<string> {
  const response = await fetchApiData({
    input: '/api/contact',
    dataSchema: contactApiDataSchema,
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store',
    },
    invalidResponseMessage: INVALID_RESPONSE_MESSAGE,
    networkErrorMessage: NETWORK_ERROR_MESSAGE,
  });

  return response.message;
}
