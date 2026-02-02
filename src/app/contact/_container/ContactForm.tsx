'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult('문의 내용 전송 중...');
    setStatus('idle');

    const formData = new FormData(event.currentTarget);
    formData.append('access_key', ACCESS_KEY || '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setResult('문의 내용이 성공적으로 전달되었습니다! 감사합니다.');
        (event.target as HTMLFormElement).reset();
      } else {
        console.log('Error', data);
        setStatus('error');
        setResult(data.message || '문의 내용 전달 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.log('Error', error);
      setStatus('error');
      setResult('서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold">
            이름
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="이름을 입력해주세요"
            className="border-purple-dark/20 ring-purple-regular dark:ring-purple-light rounded-lg border bg-white/50 p-3 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold">
            이메일
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="example@email.com"
            className="border-purple-dark/20 ring-purple-regular dark:ring-purple-light rounded-lg border bg-white/50 p-3 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-sm font-semibold">
            제목
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            required
            placeholder="문의 제목을 입력해주세요"
            className="border-purple-dark/20 ring-purple-regular dark:ring-purple-light rounded-lg border bg-white/50 p-3 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold">
            내용
          </label>
          <textarea
            name="message"
            id="message"
            required
            rows={5}
            placeholder="문의하실 내용을 입력해주세요"
            className="border-purple-dark/20 ring-purple-regular dark:ring-purple-light resize-none rounded-lg border bg-white/50 p-3 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5"
          ></textarea>
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

        {result && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-center text-sm font-medium ${
              status === 'success'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-500'
            }`}
          >
            {result}
          </motion.p>
        )}
      </form>
    </div>
  );
};
