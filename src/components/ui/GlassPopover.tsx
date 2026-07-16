'use client';

import { cn } from '@/lib/utils';
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface GlassPopoverProps {
  ariaLabel: string;
  children: ReactNode;
  content: ReactNode;
  className?: string;
  contentClassName?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

interface PopoverPosition {
  left: number;
  top: number;
  placement: 'top' | 'bottom';
}

const POPOVER_GAP = 10;
const VIEWPORT_PADDING = 16;
const POPOVER_OPEN_EVENT = 'glass-popover:open';

export function GlassPopover({
  ariaLabel,
  children,
  content,
  className,
  contentClassName,
  onOpenChange,
}: GlassPopoverProps) {
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastPointerTypeRef = useRef('');
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition>({
    left: 0,
    top: 0,
    placement: 'bottom',
  });

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    setIsOpen(false);
  }, [clearCloseTimer]);

  const open = useCallback(() => {
    clearCloseTimer();
    window.dispatchEvent(new CustomEvent(POPOVER_OPEN_EVENT, { detail: id }));
    setIsOpen(true);
  }, [clearCloseTimer, id]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), 80);
  }, [clearCloseTimer]);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const panel = contentRef.current;
    if (!trigger || !panel) return;

    const triggerRect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const roomBelow = window.innerHeight - triggerRect.bottom;
    const placement =
      roomBelow >= panelRect.height + POPOVER_GAP ? 'bottom' : 'top';
    const preferredLeft =
      triggerRect.left + triggerRect.width / 2 - panelRect.width / 2;
    const maxLeft = window.innerWidth - panelRect.width - VIEWPORT_PADDING;
    const left = Math.max(VIEWPORT_PADDING, Math.min(preferredLeft, maxLeft));
    const top =
      placement === 'bottom'
        ? triggerRect.bottom + POPOVER_GAP
        : triggerRect.top - panelRect.height - POPOVER_GAP;

    setPosition({ left, top: Math.max(VIEWPORT_PADDING, top), placement });
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleAnotherPopoverOpen = (event: Event) => {
      if (!(event instanceof CustomEvent) || event.detail === id) return;
      close();
    };

    window.addEventListener(POPOVER_OPEN_EVENT, handleAnotherPopoverOpen);
    return () => {
      window.removeEventListener(POPOVER_OPEN_EVENT, handleAnotherPopoverOpen);
    };
  }, [close, id]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (
        triggerRef.current?.contains(event.target) ||
        contentRef.current?.contains(event.target)
      ) {
        return;
      }
      close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close();
      triggerRef.current?.focus();
    };

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, isOpen, updatePosition]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const panelStyle: CSSProperties = {
    left: position.left,
    top: position.top,
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={isOpen ? id : undefined}
        aria-label={ariaLabel}
        onPointerDown={(event) => {
          lastPointerTypeRef.current = event.pointerType;
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') open();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') scheduleClose();
        }}
        onFocus={open}
        onBlur={scheduleClose}
        onClick={() => {
          if (lastPointerTypeRef.current !== 'mouse') open();
        }}
        className={className}
      >
        {children}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={contentRef}
            id={id}
            role="dialog"
            aria-label={ariaLabel}
            aria-modal="false"
            data-placement={position.placement}
            onPointerEnter={clearCloseTimer}
            onPointerLeave={scheduleClose}
            className={cn(
              'animate-popover-in bg-glass-panel/90 fixed z-100 max-h-[min(70vh,28rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-white/15 p-4 text-left shadow-2xl shadow-black/50 backdrop-blur-2xl',
              "before:border-purple-light/15 before:pointer-events-none before:absolute before:inset-px before:rounded-[15px] before:border before:content-['']",
              contentClassName,
            )}
            style={panelStyle}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}
