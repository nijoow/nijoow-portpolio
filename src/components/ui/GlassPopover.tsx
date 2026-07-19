'use client';

import { cn } from '@/lib/utils';
import { Popover } from 'radix-ui';
import {
  createContext,
  type Dispatch,
  type PointerEvent,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

interface GlassPopoverProps {
  ariaLabel: string;
  children: ReactNode;
  content: ReactNode;
  className?: string;
  contentClassName?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

interface GlassPopoverGroupProps {
  children: ReactNode;
}

interface GlassPopoverGroupValue {
  activeId: string | null;
  setActiveId: Dispatch<SetStateAction<string | null>>;
}

const CLOSE_DELAY_MS = 80;
const GlassPopoverGroupContext = createContext<GlassPopoverGroupValue | null>(
  null,
);

export function GlassPopoverGroup({ children }: GlassPopoverGroupProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const value = useMemo(() => ({ activeId, setActiveId }), [activeId]);

  return (
    <GlassPopoverGroupContext value={value}>
      {children}
    </GlassPopoverGroupContext>
  );
}

export function GlassPopover({
  ariaLabel,
  children,
  content,
  className,
  contentClassName,
  onOpenChange,
}: GlassPopoverProps) {
  const id = useId();
  const group = useContext(GlassPopoverGroupContext);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = group ? group.activeId === id : localOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (group) {
        if (nextOpen) group.setActiveId(id);
        else {
          group.setActiveId((activeId) => (activeId === id ? null : activeId));
        }
        return;
      }

      setLocalOpen(nextOpen);
    },
    [group, id],
  );

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const open = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer, setOpen]);

  const close = useCallback(() => {
    clearCloseTimer();
    setOpen(false);
  }, [clearCloseTimer, setOpen]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(close, CLOSE_DELAY_MS);
  }, [clearCloseTimer, close]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') open();
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') scheduleClose();
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-label={ariaLabel}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerDown={(event) => {
            if (event.pointerType === 'mouse') event.preventDefault();
          }}
          onFocus={open}
          onBlur={scheduleClose}
          onClick={(event) => {
            event.preventDefault();
            open();
          }}
          className={className}
        >
          {children}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="center"
          sideOffset={10}
          collisionPadding={16}
          sticky="always"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (triggerRef.current?.matches(':focus-visible')) {
              triggerRef.current.focus();
            }
          }}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onFocusCapture={clearCloseTimer}
          onBlurCapture={scheduleClose}
          className={cn(
            'frosted-glass animate-popover-in relative z-100 max-h-[min(70vh,28rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border p-4 text-left outline-none',
            "before:border-brand-lavender/15 before:pointer-events-none before:absolute before:inset-px before:rounded-[15px] before:border before:content-['']",
            contentClassName,
          )}
        >
          {content}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
