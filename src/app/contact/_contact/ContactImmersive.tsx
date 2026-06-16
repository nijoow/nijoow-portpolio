import { ContactForm } from '../_container/ContactForm';

// 3D 모드의 집중형 컨택트 — 다크 앰비언트 위 글래스 폼 카드.
export default function ContactImmersive() {
  return (
    <div className="flex min-h-[78vh] flex-col items-center justify-center py-16">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <p className="text-purple-light mb-2 text-sm tracking-[0.3em] uppercase">
          contact
        </p>
        <h1 className="from-purple-light bg-linear-to-br to-white bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          함께 만들어요
        </h1>
        <p className="mt-2 text-sm text-white/50">
          프로젝트 문의나 협업 제안을 남겨주세요.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
