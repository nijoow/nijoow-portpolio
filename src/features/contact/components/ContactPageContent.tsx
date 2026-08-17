import Eyebrow from '@/components/ui/Eyebrow';
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
  '채용 관련 이야기',
  '커피챗',
] as const;

export function ContactPageContent() {
  return (
    <TransitionPageWrapper>
      <Section>
        <section className="frosted-glass relative mb-2 w-full overflow-hidden rounded-3xl border p-6 sm:p-10">
          <div
            aria-hidden
            className="bg-brand-deep/15 absolute -top-24 -right-20 size-80 rounded-full blur-3xl"
          />

          <div className="relative max-w-3xl">
            <h1 className="mt-5 text-3xl leading-tight font-bold break-keep sm:text-5xl">
              함께 이야기해 보고 싶은 일이 있다면, 편하게 연락해 주세요.
            </h1>
            <p className="text-ink-muted mt-5 max-w-2xl text-sm leading-relaxed break-keep sm:text-base">
              프론트엔드 협업과 프로젝트 제안, 채용 관련 이야기, 커피챗까지
              편하게 남겨 주세요.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {CONVERSATION_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="text-ink-muted rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold"
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
                        <span className="text-ink-muted text-xs font-bold">
                          {label}
                        </span>
                        <span className="group-hover:text-accent-light truncate text-sm font-bold transition-colors">
                          {value}
                        </span>
                        <span className="text-ink-muted mt-1 text-xs">
                          {description}
                        </span>
                      </div>
                      <ArrowUpRight
                        className="text-ink-faint group-hover:text-ink-muted shrink-0 transition-colors"
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
              <p className="text-ink-muted mt-4 text-sm leading-relaxed break-keep">
                문의 폼이 동작하지 않을 때는 이메일로 바로 연락할 수 있습니다.
              </p>
            </div>
          </aside>

          <GlassCard lift={false} className="lg:col-span-3">
            <div className="p-5 sm:p-7">
              <Eyebrow>Send a message</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold">문의 남기기</h2>
              <p className="text-ink-muted mt-2 mb-6 text-sm leading-relaxed break-keep">
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
