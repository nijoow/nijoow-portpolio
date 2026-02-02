'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: '이름은 최소 2글자 이상이어야 합니다.' })
    .max(50, { message: '이름이 너무 깁니다.' }),
  email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
  subject: z
    .string()
    .min(5, { message: '제목은 최소 5글자 이상이어야 합니다.' })
    .max(100, { message: '제목이 너무 깁니다.' }),
  message: z
    .string()
    .min(10, { message: '내용은 최소 10글자 이상이어야 합니다.' })
    .max(1000, { message: '내용이 너무 깁니다.' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const toastStyle = {
  style: {
    borderRadius: '12px',
    background: '#8d83ba',
    color: '#fff',
  },
};
export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading(
      '문의 내용을 전송하고 있습니다...',
      toastStyle,
    );

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('access_key', ACCESS_KEY || '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const resultData = await response.json();

      if (resultData.success) {
        toast.success('문의 내용이 성공적으로 전달되었습니다!', {
          id: toastId,
          ...toastStyle,
        });
        reset();
      } else {
        console.log('Error', resultData);
        toast.error(
          resultData.message || '문의 내용 전달 중 오류가 발생했습니다.',
          { id: toastId, ...toastStyle },
        );
      }
    } catch (error) {
      console.log('Error', error);
      toast.error('서버와의 통신 중 오류가 발생했습니다.', {
        id: toastId,
        ...toastStyle,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold">
            이름
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="이름을 입력해주세요"
            className={`rounded-lg border bg-white/50 p-3 transition-all outline-none focus:ring-2 dark:bg-white/5 ${
              errors.name
                ? 'border-red-500 ring-red-500'
                : 'border-purple-dark/20 ring-purple-regular dark:ring-purple-light dark:border-white/10'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold">
            이메일
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="example@email.com"
            className={`rounded-lg border bg-white/50 p-3 transition-all outline-none focus:ring-2 dark:bg-white/5 ${
              errors.email
                ? 'border-red-500 ring-red-500'
                : 'border-purple-dark/20 ring-purple-regular dark:ring-purple-light dark:border-white/10'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-sm font-semibold">
            제목
          </label>
          <input
            {...register('subject')}
            type="text"
            id="subject"
            placeholder="문의 제목을 입력해주세요"
            className={`rounded-lg border bg-white/50 p-3 transition-all outline-none focus:ring-2 dark:bg-white/5 ${
              errors.subject
                ? 'border-red-500 ring-red-500'
                : 'border-purple-dark/20 ring-purple-regular dark:ring-purple-light dark:border-white/10'
            }`}
          />
          {errors.subject && (
            <p className="text-xs text-red-500">{errors.subject.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold">
            내용
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={5}
            placeholder="문의하실 내용을 입력해주세요"
            className={`resize-none rounded-lg border bg-white/50 p-3 transition-all outline-none focus:ring-2 dark:bg-white/5 ${
              errors.message
                ? 'border-red-500 ring-red-500'
                : 'border-purple-dark/20 ring-purple-regular dark:ring-purple-light dark:border-white/10'
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 w-full rounded-lg py-4 font-bold text-white transition-colors ${
            isSubmitting
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-purple-dark hover:bg-purple-darker dark:bg-purple-regular dark:hover:bg-purple-dark'
          }`}
        >
          {isSubmitting ? '전송 중...' : '전송하기'}
        </motion.button>
      </form>
    </div>
  );
};
