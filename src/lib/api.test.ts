// @vitest-environment node

import { z } from 'zod';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchApiData } from './api';

const dataSchema = z.object({ message: z.string() });
const options = {
  input: 'https://example.com/api',
  dataSchema,
  invalidResponseMessage: '응답 형식 오류',
  networkErrorMessage: '네트워크 오류',
};

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

afterEach(() => vi.unstubAllGlobals());

describe('fetchApiData', () => {
  it('검증된 성공 응답의 data를 반환한다', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          jsonResponse({ success: true, data: { message: '전송 완료' } }),
        ),
    );

    await expect(fetchApiData(options)).resolves.toEqual({
      message: '전송 완료',
    });
  });

  it('서버가 전달한 실패 메시지를 보존한다', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(
          {
            success: false,
            error: {
              code: 'RATE_LIMITED',
              message: '잠시 후 다시 시도해 주세요.',
            },
          },
          429,
        ),
      ),
    );

    await expect(fetchApiData(options)).rejects.toThrow(
      '잠시 후 다시 시도해 주세요.',
    );
  });

  it('스키마와 다른 응답에는 안전한 오류를 반환한다', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ success: true, data: null })),
    );

    await expect(fetchApiData(options)).rejects.toThrow('응답 형식 오류');
  });

  it('네트워크 실패를 사용자용 메시지로 변환한다', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')));

    await expect(fetchApiData(options)).rejects.toThrow('네트워크 오류');
  });
});
