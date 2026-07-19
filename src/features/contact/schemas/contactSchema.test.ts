import { describe, expect, it } from 'vitest';
import { contactFormSchema } from './contactSchema';

const validContact = {
  name: '이우진',
  email: 'woojin@example.com',
  subject: '포트폴리오 협업 문의',
  message: '새로운 프로젝트에 관해 함께 이야기하고 싶습니다.',
};

describe('contactFormSchema', () => {
  it('입력 양끝의 공백을 제거하고 허니팟 기본값을 채운다', () => {
    const result = contactFormSchema.parse({
      ...validContact,
      name: `  ${validContact.name}  `,
      email: `  ${validContact.email}  `,
    });

    expect(result).toEqual({ ...validContact, website: '' });
  });

  it.each([
    ['짧은 이름', { ...validContact, name: '이' }],
    ['잘못된 이메일', { ...validContact, email: 'invalid-email' }],
    ['짧은 제목', { ...validContact, subject: '문의' }],
    ['짧은 내용', { ...validContact, message: '짧은 내용' }],
    ['긴 허니팟', { ...validContact, website: 'a'.repeat(201) }],
  ])('%s을 거부한다', (_caseName, input) => {
    expect(contactFormSchema.safeParse(input).success).toBe(false);
  });
});
