import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavListItem = ({ text, url }: { text: string; url: string }) => {
  const pathname = usePathname();
  return (
    <Link href={url} className="hover-underline-animation-parent group p-2.5">
      <li
        className={`hover-underline-animation from-purple-medium to-purple-darker after:from-purple-medium after:to-purple-darker relative bg-linear-to-br bg-clip-text text-base font-bold text-transparent after:bg-linear-to-r dark:from-gray-200 dark:to-gray-400 dark:after:from-gray-200 dark:after:to-gray-400 ${
          pathname === url
            ? 'active-underline-animation before:from-purple-medium before:to-purple-darker before:bg-linear-to-r dark:before:from-gray-200 dark:before:to-gray-400'
            : ''
        }`}
      >
        {text}
      </li>
    </Link>
  );
};
export default NavListItem;
