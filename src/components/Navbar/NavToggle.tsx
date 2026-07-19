import { cn } from '@/lib/utils';
import type { Ref } from 'react';

interface NavToggleProps {
  ref?: Ref<HTMLButtonElement>;
  isNavShow: boolean;
  onToggle: () => void;
}

const BAR_BASE = 'bg-brand-muted h-0.5 rounded';

function NavToggle({ ref, isNavShow, onToggle }: NavToggleProps) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-label={isNavShow ? '메뉴 닫기' : '메뉴 열기'}
      aria-expanded={isNavShow}
      aria-controls="mobile-navigation"
      className="focus-visible:ring-brand-lavender ml-auto flex size-11 items-center justify-center rounded-full transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 md:hidden"
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-5 w-5 origin-center transform flex-col justify-between transition-transform duration-300',
          isNavShow && '-rotate-45',
        )}
      >
        <span
          className={cn(
            BAR_BASE,
            'origin-right transform transition-all delay-150 duration-300',
            isNavShow ? 'w-1/2 -translate-y-px -rotate-90' : 'w-2/3',
          )}
        />
        <span className={BAR_BASE} />
        <span
          className={cn(
            BAR_BASE,
            'origin-left transform self-end transition-all delay-150 duration-300',
            isNavShow ? 'w-1/2 translate-y-px -rotate-90' : 'w-2/3',
          )}
        />
      </span>
    </button>
  );
}

export default NavToggle;
