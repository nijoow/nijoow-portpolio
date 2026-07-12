import GlassCard from '@/components/Motion/GlassCard';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export function GithubCommitLog() {
  return (
    <a
      href="https://github.com/nijoow"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="nijoow GitHub 프로필 열기"
      className="group block h-full"
    >
      <GlassCard className="h-full min-h-40 bg-black/30">
        <div className="flex h-full min-h-40 flex-col p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-extrabold">Commit Log</span>
            <span className="group-hover:border-purple-light/40 group-hover:text-purple-light flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/45 transition-colors">
              <ExternalLink size={14} />
            </span>
          </div>
          <div className="relative min-h-20 flex-1">
            <Image
              src="https://raw.githubusercontent.com/nijoow/nijoow/output/snake.svg"
              alt="GitHub 커밋 그래프 애니메이션"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </GlassCard>
    </a>
  );
}
