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
            <span className="text-purple-light/80 text-xs font-bold tracking-widest uppercase">
              Contact
            </span>
            <h2 className="mt-2 text-2xl font-black break-keep sm:text-3xl">
              프로젝트나 협업에 관한 이야기를 나눠요.
            </h2>
            <p className="mt-2 text-sm leading-relaxed break-keep text-white/50">
              궁금한 점이나 제안이 있다면 편하게 연락해 주세요.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 lg:w-72">
            {contactLinks.map(({ label, value, href, icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group border-purple-light/20 bg-purple-medium/15 hover:bg-purple-medium/30 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm backdrop-blur-xl transition-colors"
              >
                <span className="text-purple-light">{icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold tracking-wider text-white/35 uppercase">
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
              className="mt-1 text-center text-xs font-bold text-white/40 transition-colors hover:text-white"
            >
              Contact 페이지에서 메시지 남기기
            </Link>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
