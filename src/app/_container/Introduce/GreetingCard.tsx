import GlassCard from '@/components/Motion/GlassCard';

const GreetingCard = () => {
  return (
    <GlassCard className="w-full">
      <div className="flex w-full flex-col gap-2 p-8 break-keep sm:p-10">
        <span className="text-purple-light/80 text-xs font-bold tracking-widest uppercase">
          Hello, World
        </span>
        <h1 className="text-2xl leading-snug font-black sm:text-4xl">
          반갑습니다🖐🏻
          <br />
          프론트엔드 개발자{' '}
          <span className="from-purple-light via-purple-regular to-purple-medium bg-linear-to-r bg-clip-text text-transparent">
            이우진
          </span>
          입니다.
        </h1>
      </div>
    </GlassCard>
  );
};

export default GreetingCard;
