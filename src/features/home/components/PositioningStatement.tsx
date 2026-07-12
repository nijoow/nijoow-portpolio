import Image from 'next/image';

const preferences = [
  { label: '커피', icon: '/images/icons/coffee.svg' },
  { label: '농구', icon: '/images/icons/basketball.svg' },
  { label: '힙합', icon: '/images/icons/hiphop.svg' },
];

export function PositioningStatement() {
  return (
    <section className="flex w-full flex-col items-center py-4 text-center sm:py-8">
      <span className="text-purple-light/80 mb-3 text-xs font-bold tracking-widest uppercase">
        About Me
      </span>
      <h1 className="max-w-3xl text-3xl leading-tight font-black break-keep sm:text-5xl sm:leading-tight">
        디자인을 전공한 프론트엔드 개발자{' '}
        <span className="from-purple-light to-purple-regular bg-linear-to-r bg-clip-text text-transparent">
          이우진
        </span>
        입니다.
      </h1>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed break-keep text-white/55 sm:text-base">
        UX/UI를 이해하고 웹 인터페이스로 구현합니다. 화면의 목적과 사용 흐름을
        살피며, 디자인 의도가 자연스럽게 전달되는 결과를 만들고자 합니다.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-white/45 sm:text-sm">
        {preferences.map(({ label, icon }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
          >
            <Image src={icon} alt="" width={18} height={18} />
            {label}
          </span>
        ))}
        <span>을 좋아합니다.</span>
      </div>
    </section>
  );
}
