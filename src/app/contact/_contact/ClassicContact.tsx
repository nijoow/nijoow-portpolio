import { GithubIcon } from '@/components/Icons/GithubIcon';
import GlassCard from '@/components/Motion/GlassCard';
import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import Section from '@/components/Section/Section';
import { Mail } from 'lucide-react';
import { ContactForm } from '../_container/ContactForm';

const contactChannels = [
  {
    label: 'Email',
    value: 'nijoow1127@gmail.com',
    href: 'mailto:nijoow1127@gmail.com',
    icon: <Mail size={20} />,
    external: false,
  },
  {
    label: 'GitHub',
    value: '@nijoow',
    href: 'https://github.com/nijoow',
    icon: <GithubIcon size={20} />,
    external: true,
  },
];

// 기존 Contact(클래식 모드).
export default function ClassicContact() {
  return (
    <TransitionPageWrapper>
      <Section>
        <div className="mb-2 flex w-full flex-col gap-1.5">
          <span className="text-purple-light/80 text-xs font-bold tracking-widest uppercase">
            Get in Touch
          </span>
          <h1 className="text-3xl font-black sm:text-4xl">Contact</h1>
          <p className="text-sm break-keep text-white/50">
            프로젝트·협업 제안 등 어떤 이야기든 편하게 남겨주세요.
          </p>
          <div className="from-purple-medium/70 mt-3 h-px w-full bg-linear-to-r to-transparent" />
        </div>

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="flex flex-col gap-3 lg:col-span-2">
            {contactChannels.map(({ label, value, href, icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group block"
              >
                <GlassCard className="w-full">
                  <div className="flex items-center gap-3 p-5">
                    <div className="text-purple-light flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      {icon}
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="text-xs font-semibold text-white/45">
                        {label}
                      </span>
                      <span className="group-hover:text-purple-light truncate text-sm font-bold transition-colors">
                        {value}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </a>
            ))}
          </div>

          <GlassCard lift={false} className="lg:col-span-3">
            <div className="p-5 sm:p-6">
              <ContactForm />
            </div>
          </GlassCard>
        </div>
      </Section>
    </TransitionPageWrapper>
  );
}
