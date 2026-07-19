import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavListItemProps {
  text: string;
  url: string;
  isActive: boolean;
  onClick?: () => void;
  variant?: 'desktop' | 'mobile';
}

export function NavListItem({
  text,
  url,
  isActive,
  onClick,
  variant = 'desktop',
}: NavListItemProps) {
  return (
    <Link
      href={url}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'focus-visible:ring-brand-lavender flex items-center border border-transparent font-bold transition-colors outline-none focus-visible:ring-2',
        variant === 'mobile'
          ? 'h-12 w-full rounded-xl px-4 text-lg'
          : 'min-h-11 rounded-full px-4 py-1.5 text-sm',
        isActive
          ? 'border-brand-lavender/20 bg-brand-deep/55 text-brand-lavender'
          : 'hover:border-brand-lavender/10 hover:bg-brand-deep/25 text-white/55 hover:text-white',
      )}
    >
      {text}
    </Link>
  );
}
