import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: '이름은 최소 2글자 이상 입력해 주세요.' })
    .max(50, { message: '이름은 50글자 이하로 입력해 주세요.' }),
  email: z
    .string()
    .trim()
    .email({ message: '이메일 형식을 확인해 주세요.' })
    .max(100, { message: '이메일은 100글자 이하로 입력해 주세요.' }),
  subject: z
    .string()
    .trim()
    .min(5, { message: '제목은 최소 5글자 이상 입력해 주세요.' })
    .max(100, { message: '제목은 100글자 이하로 입력해 주세요.' }),
  message: z
    .string()
    .trim()
    .min(10, { message: '내용은 최소 10글자 이상 입력해 주세요.' })
    .max(1000, { message: '내용은 1000글자 이하로 입력해 주세요.' }),
  website: z.string().max(200).optional().default(''),
});

export const contactApiDataSchema = z.object({ message: z.string() });

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.output<typeof contactFormSchema>;
