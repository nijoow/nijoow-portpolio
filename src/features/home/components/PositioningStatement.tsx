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
      <p className="mt-5 max-w-3xl text-sm leading-relaxed break-keep text-white/55 sm:text-base">
        뛰어난 시각적 경험과 기술적 안정성의 조화를 통해 사용자에게 인상깊은
        경험을 제공하고자 합니다.
      </p>
    </section>
  );
}
