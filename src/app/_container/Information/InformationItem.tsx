import Link from 'next/link';
import React from 'react';

interface InformationItemProps {
  icon: React.ReactNode;
  list: string;
  contents: string;
  link: string | null;
}

export default function InformationItem({
  icon,
  list,
  contents,
  link,
}: InformationItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-purple-light flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
        {icon}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-semibold text-white/45">{list}</span>
        {link ? (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-light truncate text-sm font-bold hover:underline sm:text-base"
          >
            {contents}
          </Link>
        ) : (
          <span className="truncate text-sm font-bold sm:text-base">
            {contents}
          </span>
        )}
      </div>
    </div>
  );
}
