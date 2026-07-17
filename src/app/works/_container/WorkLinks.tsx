import { GithubIcon } from '@/components/Icons/GithubIcon';
import { getWork } from '@/features/works/data/worksData';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export interface WorkLink {
  href: string;
  label: string;
  kind?: 'site' | 'github' | 'reference';
}

interface WorkLinksProps {
  pageName?: string;
  links?: readonly WorkLink[];
  liveLabel?: string;
}

export function WorkLinks({
  pageName,
  links = [],
  liveLabel = '사이트 바로가기',
}: WorkLinksProps) {
  const work = pageName ? getWork(pageName) : undefined;
  const resolvedLinks: WorkLink[] = [
    ...(work?.liveUrl
      ? [{ href: work.liveUrl, label: liveLabel, kind: 'site' as const }]
      : []),
    ...(work?.repoUrl
      ? [{ href: work.repoUrl, label: 'GitHub', kind: 'github' as const }]
      : []),
    ...links,
  ];

  return resolvedLinks.map(({ href, label, kind = 'reference' }) => (
    <Link
      key={`${kind}-${href}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border-purple-light/25 bg-purple-medium/20 hover:bg-purple-medium/35 focus-visible:ring-purple-light flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-bold text-white backdrop-blur-xl transition-colors outline-none focus-visible:ring-2"
    >
      {kind === 'github' ? (
        <GithubIcon aria-hidden size={20} />
      ) : (
        <ExternalLink aria-hidden size={16} />
      )}
      <span>{label}</span>
    </Link>
  ));
}
