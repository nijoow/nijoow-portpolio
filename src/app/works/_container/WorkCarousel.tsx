'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const NAV_BUTTON_CLASSES =
  'focus-visible:ring-purple-light absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-purple-regular outline-none transition-colors hover:bg-black/45 focus-visible:ring-2';

interface WorkCarouselProps {
  imgSrcList: string[];
  aspectRatio?: 'video' | 'square';
}

function CarouselNavigationButton({ direction }: { direction: -1 | 1 }) {
  const swiper = useSwiper();
  const isPrevious = direction === -1;

  return (
    <button
      type="button"
      aria-label={isPrevious ? '이전 이미지' : '다음 이미지'}
      className={cn(NAV_BUTTON_CLASSES, isPrevious ? 'left-1.5' : 'right-1.5')}
      onClick={() => {
        if (isPrevious) swiper.slidePrev();
        else swiper.slideNext();
      }}
    >
      {isPrevious ? (
        <ChevronLeft aria-hidden className="size-7" />
      ) : (
        <ChevronRight aria-hidden className="size-7" />
      )}
    </button>
  );
}

export function WorkCarousel({
  imgSrcList,
  aspectRatio = 'video',
}: WorkCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const selectedImage =
    selectedIndex === null ? null : (imgSrcList[selectedIndex] ?? null);
  const isModalOpen = selectedImage !== null;

  const closeModal = useCallback(() => setSelectedIndex(null), []);

  const moveSelection = useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex === null || imgSrcList.length === 0) return;

      const nextIndex =
        (selectedIndex + direction + imgSrcList.length) % imgSrcList.length;
      setSelectedIndex(nextIndex);
      swiper?.slideToLoop(nextIndex);
    },
    [selectedIndex, imgSrcList.length, swiper],
  );

  useEffect(() => {
    if (!isModalOpen) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
      previouslyFocusedRef.current = null;
    };
  }, [isModalOpen]);

  function handleModalKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key === 'ArrowLeft' && imgSrcList.length > 1) {
      event.preventDefault();
      moveSelection(-1);
      return;
    }

    if (event.key === 'ArrowRight' && imgSrcList.length > 1) {
      event.preventDefault();
      moveSelection(1);
      return;
    }

    if (event.key !== 'Tab') return;

    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled])',
      ),
    );
    const firstControl = controls[0];
    const lastControl = controls.at(-1);

    if (!firstControl || !lastControl) return;

    if (event.shiftKey && document.activeElement === firstControl) {
      event.preventDefault();
      lastControl.focus();
    } else if (!event.shiftKey && document.activeElement === lastControl) {
      event.preventDefault();
      firstControl.focus();
    }
  }

  if (imgSrcList.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm text-white/60">
        표시할 이미지가 없습니다.
      </div>
    );
  }

  return (
    <>
      <Swiper
        onSwiper={setSwiper}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={imgSrcList.length > 1}
        className={cn(
          '[&_.swiper-pagination-bullet-active]:bg-purple-regular relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-md',
          aspectRatio === 'video' ? 'aspect-video' : 'aspect-square',
        )}
      >
        {imgSrcList.map((imgSrc, index) => (
          <SwiperSlide
            key={imgSrc}
            className="group relative h-full w-full bg-white"
          >
            <Image
              src={`/images/works/${imgSrc}`}
              alt={`${imgSrc.replace(/\.\w+$/, '')} 작업 이미지 ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
              priority={index === 0}
            />
            <button
              type="button"
              aria-label={`${index + 1}번 이미지 크게 보기`}
              aria-haspopup="dialog"
              onClick={() => setSelectedIndex(index)}
              className="focus-visible:ring-purple-light absolute inset-0 z-10 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-inset"
            />
          </SwiperSlide>
        ))}

        {imgSrcList.length > 1 ? (
          <>
            <CarouselNavigationButton direction={-1} />
            <CarouselNavigationButton direction={1} />
          </>
        ) : null}
      </Swiper>

      <AnimatePresence>
        {isModalOpen ? (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="작업 이미지 확대 보기"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={handleModalKeyDown}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
            className="fixed inset-0 z-100 flex cursor-zoom-out items-center justify-center bg-black/75 backdrop-blur-sm md:p-8"
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative flex h-full w-full cursor-default overflow-hidden rounded-2xl bg-gray-500/30 md:max-h-[90vh] md:max-w-[86vw]"
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="확대 이미지 닫기"
                className="focus-visible:ring-purple-light absolute top-4 right-4 z-50 flex size-11 items-center justify-center rounded-full bg-black/35 text-white/75 transition-colors outline-none hover:text-white focus-visible:ring-2"
                onClick={closeModal}
              >
                <X aria-hidden size={24} />
              </button>

              <div className="relative m-auto h-full w-full md:h-[96%] md:w-[84%]">
                <Image
                  src={`/images/works/${selectedImage}`}
                  alt={`${selectedImage.replace(/\.\w+$/, '')} 확대 이미지`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {imgSrcList.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="이전 확대 이미지"
                    className="focus-visible:ring-purple-light absolute top-1/2 left-2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white/75 shadow-lg transition-colors outline-none hover:bg-white/20 hover:text-white focus-visible:ring-2 md:left-6"
                    onClick={() => moveSelection(-1)}
                  >
                    <ChevronLeft aria-hidden className="size-8" />
                  </button>
                  <button
                    type="button"
                    aria-label="다음 확대 이미지"
                    className="focus-visible:ring-purple-light absolute top-1/2 right-2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white/75 shadow-lg transition-colors outline-none hover:bg-white/20 hover:text-white focus-visible:ring-2 md:right-6"
                    onClick={() => moveSelection(1)}
                  >
                    <ChevronRight aria-hidden className="size-8" />
                  </button>
                </>
              ) : null}
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default WorkCarousel;
