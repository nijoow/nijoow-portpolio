interface SubTitleProps {
  title: string;
  /** 타이틀 위에 붙는 작은 대문자 라벨 (예: 'PROFILE'). */
  eyebrow?: string;
}

function SubTitle({ title, eyebrow }: SubTitleProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-1.5">
      {eyebrow && (
        <span className="text-purple-light/80 text-xs font-bold tracking-widest uppercase">
          {eyebrow}
        </span>
      )}
      <span className="text-2xl font-black sm:text-3xl">{title}</span>
      <div className="from-purple-medium/70 mt-2 h-px w-full bg-linear-to-r to-transparent" />
    </div>
  );
}

export default SubTitle;
