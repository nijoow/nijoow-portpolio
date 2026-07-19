import { GithubIcon } from '@/components/Icons/GithubIcon';
import GlassCard from '@/components/Motion/GlassCard';
import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import Section from '@/components/Section/Section';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { ArrowUpRight, Mail, MessageCircleMore } from 'lucide-react';

const CONTACT_CHANNELS = [
  {
    label: 'Email',
    value: 'nijoow1127@gmail.com',
    description: '메일 앱에서 바로 연락하기',
    href: 'mailto:nijoow1127@gmail.com',
    icon: <Mail size={20} aria-hidden />,
    external: false,
  },
  {
    label: 'GitHub',
    value: '@nijoow',
    description: '코드와 최근 활동 확인하기',
    href: 'https://github.com/nijoow',
    icon: <GithubIcon size={20} />,
    external: true,
  },
] as const;

const CONVERSATION_TOPICS = [
  '프로젝트 제안',
  '프론트엔드 협업',
  '커피챗',
] as const;

export function ContactPageContent() {
  return (
    <TransitionPageWrapper>
      <Section>
        <section className="frosted-glass relative mb-2 w-full overflow-hidden rounded-3xl border p-6 sm:p-10">
          <div
            aria-hidden
            className="cosmic-stars absolute inset-0 opacity-45"
          />
          <div
            aria-hidden
            className="bg-brand-deep/30 absolute -top-24 -right-20 size-80 rounded-full blur-3xl"
          />
          <div
            aria-hidden
            className="border-brand-lavender/10 absolute -right-16 -bottom-48 size-96 rounded-full border"
          />

          <div className="relative max-w-3xl">
            <div className="text-brand-lavender/85 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
              <span className="bg-brand-violet size-1.5 rounded-full shadow-lg" />
              Contact · Open to conversation
            </div>
            <h1 className="mt-5 text-3xl leading-tight font-black break-keep sm:text-5xl">
              새로운 기회나 아이디어는{' '}
              <span className="text-brand-lavender">언제나 환영입니다.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed break-keep text-white/55 sm:text-base">
              함께 만들고 싶은 서비스, 프론트엔드 협업, 가볍게 나누고 싶은
              이야기까지 편하게 연락해 주세요.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {CONVERSATION_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/55"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5">
          <aside className="flex flex-col gap-3 lg:col-span-2">
            {CONTACT_CHANNELS.map(
              ({ label, value, description, href, icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="group focus-visible:ring-brand-lavender rounded-2xl outline-none focus-visible:ring-2"
                >
                  <GlassCard className="w-full">
                    <div className="flex items-center gap-3 p-5">
                      <div className="text-accent-light flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        {icon}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="text-xs font-semibold text-white/55">
                          {label}
                        </span>
                        <span className="group-hover:text-accent-light truncate text-sm font-black transition-colors">
                          {value}
                        </span>
                        <span className="mt-1 text-xs text-white/60">
                          {description}
                        </span>
                      </div>
                      <ArrowUpRight
                        className="shrink-0 text-white/25 transition-colors group-hover:text-white/65"
                        size={17}
                        aria-hidden
                      />
                    </div>
                  </GlassCard>
                </a>
              ),
            )}

            <div className="frosted-glass-subtle rounded-2xl border p-5">
              <MessageCircleMore
                className="text-accent-light"
                size={20}
                aria-hidden
              />
              <p className="mt-4 text-sm leading-relaxed break-keep text-white/50">
                문의 폼이 동작하지 않을 때는 이메일로 바로 연락할 수 있습니다.
              </p>
            </div>
          </aside>

          <GlassCard lift={false} className="lg:col-span-3">
            <div className="p-5 sm:p-7">
              <span className="text-brand-lavender/75 text-xs font-black tracking-widest uppercase">
                Send a message
              </span>
              <h2 className="mt-2 text-2xl font-black">문의 남기기</h2>
              <p className="mt-2 mb-6 text-sm leading-relaxed break-keep text-white/60">
                필요한 내용을 남겨주시면 확인 후 이메일로 답장드릴게요.
              </p>
              <ContactForm />
            </div>
          </GlassCard>
        </div>
      </Section>
    </TransitionPageWrapper>
  );
}
