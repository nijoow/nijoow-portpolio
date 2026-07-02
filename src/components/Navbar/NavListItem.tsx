import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavListItem = ({
  text,
  url,
  onClick,
}: {
  text: string;
  url: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === url || (url !== '/' && pathname.startsWith(url));

  return (
    <Link
      href={url}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'rounded-full px-4 py-1.5 text-sm font-bold transition-colors',
        isActive
          ? 'bg-white/10 text-white'
          : 'text-white/55 hover:bg-white/5 hover:text-white',
      )}
    >
      {text}
    </Link>
  );
};
export default NavListItem;
