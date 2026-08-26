import { Logo } from '@/components/Logo/Logo';
import Eyebrow from '@/components/ui/Eyebrow';

interface StaticSignatureProps {
  eyebrow: string;
  title: string;
}

export function StaticSignature({ eyebrow, title }: StaticSignatureProps) {
  return (
    <section
      aria-label="nijoow 시그니처 로고"
      className="relative z-10 mb-10 h-[240px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black sm:h-[400px]"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="bg-brand-lavender/12 absolute size-56 rounded-full blur-3xl"
        />
        <Logo
          width={240}
          height={135}
          className="text-brand-lavender relative opacity-90 drop-shadow-2xl"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_10px_40px_rgba(0,0,0,0.55)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/70 to-transparent"
      />
      <div className="absolute right-5 bottom-4 left-5 flex flex-col gap-0.5 sm:right-7 sm:bottom-6 sm:left-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        <span className="text-lg font-bold text-white sm:text-2xl">
          {title}
        </span>
      </div>
    </section>
  );
}
