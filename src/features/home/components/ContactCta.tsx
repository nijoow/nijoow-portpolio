import { GithubIcon } from '@/components/Icons/GithubIcon';
import GlassCard from '@/components/Motion/GlassCard';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

const contactLinks = [
  {
    label: 'Email',
    value: 'nijoow1127@gmail.com',
    href: 'mailto:nijoow1127@gmail.com',
    icon: <Mail size={18} />,
    external: false,
  },
  {
    label: 'GitHub',
    value: '@nijoow',
    href: 'https://github.com/nijoow',
    icon: <GithubIcon size={18} />,
    external: true,
  },
];

export function ContactCta() {
  return (
    <section className="w-full">
      <GlassCard lift={false} className="w-full">
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-lg">
            <span className="text-brand-lavender/85 text-xs font-bold tracking-widest uppercase">
              Contact
            </span>
            <h2 className="mt-2 text-2xl font-black break-keep sm:text-3xl">
              새로운 기회나 아이디어는 언제나 환영입니다.
            </h2>
            <p className="mt-2 text-sm leading-relaxed break-keep text-white/50">
              협업에 관한 구체적인 제안부터 가벼운 커피 챗까지 모두 편하게 남겨
              주세요.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 lg:w-72">
            {contactLinks.map(({ label, value, href, icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="frosted-glass-subtle group border-accent/20 hover:border-accent/35 focus-visible:ring-brand-lavender flex min-h-11 items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors outline-none focus-visible:ring-2"
              >
                <span className="text-accent-light">{icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold tracking-wider text-white/55 uppercase">
                    {label}
                  </span>
                  <span className="block truncate font-bold text-white/75 group-hover:text-white">
                    {value}
                  </span>
                </span>
                <ArrowRight
                  size={15}
                  className="text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                />
              </a>
            ))}
            <Link
              href="/contact"
              className="focus-visible:ring-brand-lavender mt-3 flex min-h-11 items-center justify-center rounded-lg text-center text-xs font-bold text-white/60 transition-colors outline-none hover:text-white focus-visible:ring-2"
            >
              메일 보내기
            </Link>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
