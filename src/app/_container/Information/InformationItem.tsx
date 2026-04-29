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
    <div className={'flex w-full items-center'}>
      <div
        className={
          'flex flex-3 items-center justify-start gap-1 text-sm font-semibold sm:flex-2'
        }
      >
        {icon}
        <span>{list}</span>
      </div>
      <div className={'flex-7 text-sm font-semibold sm:flex-8 sm:text-lg'}>
        :{' '}
        {link ? (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={'text-purple-medium dark:text-purple-light'}
          >
            {contents}
          </Link>
        ) : (
          <span>{contents}</span>
        )}
      </div>
    </div>
  );
}
