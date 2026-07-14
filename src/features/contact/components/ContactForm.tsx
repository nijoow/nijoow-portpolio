'use client';

import { submitContact } from '@/features/contact/api/submitContact';
import {
  contactFormSchema,
  type ContactFormData,
  type ContactFormInput,
} from '@/features/contact/schemas/contactSchema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { m } from 'framer-motion';
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type SubmissionState =
  | { status: 'idle' }
  | { status: 'submitting'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const BUTTON_HOVER = { y: -2 };
const BUTTON_TAP = { scale: 0.98 };

function fieldClass(hasError: boolean) {
  return cn(
    'w-full rounded-xl border bg-black/20 p-3.5 text-sm text-white transition-colors outline-none placeholder:text-white/25 focus:ring-2',
    hasError
      ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/30'
      : 'focus:border-purple-light/45 focus:ring-purple-light/20 border-white/10',
  );
}

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: 'idle',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { website: '' },
  });

  async function handleContactSubmit(data: ContactFormData) {
    setSubmissionState({
      status: 'submitting',
      message: '문의를 보내고 있습니다.',
    });

    try {
      const message = await submitContact(data);
      reset();
      setSubmissionState({ status: 'success', message });
    } catch (error) {
      setSubmissionState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : '문의를 전송하지 못했습니다. 이메일로 직접 연락해 주세요.',
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleContactSubmit)}
      className="flex flex-col gap-4"
      noValidate
      aria-busy={isSubmitting}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-bold text-white/80">
            이름 <span className="text-purple-light">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            autoComplete="name"
            maxLength={50}
            placeholder="이름을 입력해 주세요"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass(Boolean(errors.name))}
          />
          {errors.name ? (
            <p id="name-error" className="text-xs text-red-300">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-white/80">
            이메일 <span className="text-purple-light">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            inputMode="email"
            autoComplete="email"
            maxLength={100}
            placeholder="example@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass(Boolean(errors.email))}
          />
          {errors.email ? (
            <p id="email-error" className="text-xs text-red-300">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-bold text-white/80">
          제목 <span className="text-purple-light">*</span>
        </label>
        <input
          {...register('subject')}
          type="text"
          id="subject"
          maxLength={100}
          placeholder="어떤 이야기인지 간단히 알려주세요"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={fieldClass(Boolean(errors.subject))}
        />
        {errors.subject ? (
          <p id="subject-error" className="text-xs text-red-300">
            {errors.subject.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="message" className="text-sm font-bold text-white/80">
            내용 <span className="text-purple-light">*</span>
          </label>
          <span className="text-xs text-white/30">최대 1000자</span>
        </div>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          maxLength={1000}
          placeholder="프로젝트나 협업에 관해 편하게 남겨주세요"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(fieldClass(Boolean(errors.message)), 'resize-y')}
        />
        {errors.message ? (
          <p id="message-error" className="text-xs text-red-300">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">웹사이트</label>
        <input
          {...register('website')}
          type="text"
          id="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div aria-live="polite" aria-atomic="true" className="min-h-11">
        {submissionState.status !== 'idle' ? (
          <div
            role={submissionState.status === 'error' ? 'alert' : 'status'}
            className={cn(
              'flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm leading-relaxed',
              submissionState.status === 'success' &&
                'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
              submissionState.status === 'error' &&
                'border-red-400/20 bg-red-400/10 text-red-200',
              submissionState.status === 'submitting' &&
                'border-purple-light/20 bg-purple-medium/15 text-white/65',
            )}
          >
            {submissionState.status === 'success' ? (
              <CheckCircle2 className="mt-0.5 shrink-0" size={16} aria-hidden />
            ) : submissionState.status === 'error' ? (
              <AlertCircle className="mt-0.5 shrink-0" size={16} aria-hidden />
            ) : (
              <LoaderCircle
                className="mt-0.5 shrink-0 animate-spin"
                size={16}
                aria-hidden
              />
            )}
            <span>{submissionState.message}</span>
          </div>
        ) : null}
      </div>

      <m.button
        whileHover={isSubmitting ? undefined : BUTTON_HOVER}
        whileTap={isSubmitting ? undefined : BUTTON_TAP}
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'focus-visible:ring-purple-light flex w-full items-center justify-center gap-2 rounded-xl border py-3.5 font-bold text-white backdrop-blur-xl transition-colors focus-visible:ring-2 focus-visible:outline-none',
          isSubmitting
            ? 'cursor-not-allowed border-white/10 bg-white/5 text-white/40'
            : 'border-purple-light/30 bg-purple-medium/30 hover:bg-purple-medium/45',
        )}
      >
        {isSubmitting ? (
          <LoaderCircle className="animate-spin" size={17} aria-hidden />
        ) : (
          <Send size={17} aria-hidden />
        )}
        {isSubmitting ? '보내는 중...' : '문의 보내기'}
      </m.button>
    </form>
  );
}
