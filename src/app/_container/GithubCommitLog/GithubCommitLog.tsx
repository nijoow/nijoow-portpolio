import GlassCard from '@/components/Motion/GlassCard';
import Image from 'next/image';

const GithubCommitLog = () => {
  return (
    <GlassCard className="aspect-648/141 w-full bg-black/30">
      <div className="relative h-full w-full p-2 py-4 md:p-4">
        <Image
          src="https://raw.githubusercontent.com/nijoow/nijoow/output/snake.svg"
          alt="Commit Snake Animation"
          fill
          className="object-contain"
          unoptimized={true}
        />
      </div>
    </GlassCard>
  );
};

export default GithubCommitLog;
