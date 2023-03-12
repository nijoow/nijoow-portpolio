import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const NavListItem = ({ text, url }: { text: string; url: string }) => {
  const router = useRouter();

  return (
    <Link href={url} className="p-2.5">
      <li
        className={`text-base font-bold bg-gradient-to-br from-purple-medium bg-clip-text text-transparent to-purple-darker dark:from-gray-200 dark:to-gray-400 ${
          router.pathname === url ? 'underline' : ''
        }`}
      >
        {text}
      </li>
    </Link>
  );
};
export default NavListItem;
