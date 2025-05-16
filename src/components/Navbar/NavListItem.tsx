import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavListItem = ({ text, url }: { text: string; url: string }) => {
  const pathname = usePathname();
  return (
    <Link href={url} className="hover-underline-animation-parent group p-2.5">
      <li
        className={`hover-underline-animation relative bg-gradient-to-br from-purple-medium to-purple-darker bg-clip-text text-base font-bold text-transparent after:bg-gradient-to-r after:from-purple-medium after:to-purple-darker dark:from-gray-200 dark:to-gray-400 dark:after:from-gray-200 dark:after:to-gray-400 ${
          pathname === url
            ? 'active-underline-animation before:bg-gradient-to-r before:from-purple-medium before:to-purple-darker dark:before:from-gray-200 dark:before:to-gray-400'
            : ''
        }`}
      >
        {text}
      </li>
    </Link>
  );
};
export default NavListItem;
