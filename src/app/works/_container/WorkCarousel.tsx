'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { prefix } from '@/config/config';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const NAV_BUTTON_CLASSES =
  'absolute top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full';

const PrevButton = () => {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      className={cn(NAV_BUTTON_CLASSES, 'left-1.5')}
      onClick={() => swiper.slidePrev()}
    >
      <FiChevronLeft className="h-full w-full stroke-purple-regular" />
    </button>
  );
};

const NextButton = () => {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      className={cn(NAV_BUTTON_CLASSES, 'right-1.5')}
      onClick={() => swiper.slideNext()}
    >
      <FiChevronRight className="h-full w-full stroke-purple-regular" />
    </button>
  );
};

const WorkCarousel = ({
  imgSrcList,
  aspectRatio = 'video',
}: {
  imgSrcList: string[];
  aspectRatio?: 'video' | 'square';
}) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <>
      <Swiper
        onSwiper={setSwiperInstance}
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        loop
        className={cn(
          'relative w-full max-w-3xl overflow-hidden rounded-lg shadow-md [&_.swiper-pagination-bullet-active]:bg-purple-regular',
          aspectRatio === 'video' ? 'aspect-video' : 'aspect-square',
        )}
      >
        {imgSrcList.map((imgSrc) => (
          <SwiperSlide
            key={imgSrc}
            className="group relative h-full w-full bg-white"
          >
            <div
              className="absolute inset-0 z-10 h-full w-full cursor-zoom-in"
              onClick={() => setSelectedImg(imgSrc)}
            />
            <Image
              src={`${prefix}/images/works/${imgSrc}`}
              alt={imgSrc}
              fill
              className="object-contain"
            />
          </SwiperSlide>
        ))}

        <PrevButton />
        <NextButton />
      </Swiper>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex cursor-zoom-out items-center justify-center bg-black/50 backdrop-blur-sm md:p-8"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative flex h-full w-full cursor-default overflow-hidden rounded-2xl bg-gray-500/30 md:max-h-[90vh] md:max-w-[86vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="absolute top-4 right-4 z-50 p-2 text-white/70 transition-colors hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImg(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Modal Image Container */}
              <div className="relative m-auto h-full w-full md:h-[96%] md:w-[84%]">
                <Image
                  src={`${prefix}/images/works/${selectedImg}`}
                  alt={selectedImg}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Modal Navigation */}
              {imgSrcList.length > 1 && (
                <>
                  {[
                    {
                      dir: 'left',
                      icon: <FiChevronLeft className="h-8 w-8" />,
                      onClick: () => {
                        const idx = imgSrcList.indexOf(selectedImg);
                        const prev =
                          (idx - 1 + imgSrcList.length) % imgSrcList.length;
                        setSelectedImg(imgSrcList[prev]);
                        swiperInstance?.slideToLoop(prev);
                      },
                    },
                    {
                      dir: 'right',
                      icon: <FiChevronRight className="h-8 w-8" />,
                      onClick: () => {
                        const idx = imgSrcList.indexOf(selectedImg);
                        const next = (idx + 1) % imgSrcList.length;
                        setSelectedImg(imgSrcList[next]);
                        swiperInstance?.slideToLoop(next);
                      },
                    },
                  ].map(({ dir, icon, onClick }) => (
                    <button
                      key={dir}
                      type="button"
                      className={cn(
                        'absolute top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-black/30 text-white/70 shadow-lg transition-colors hover:bg-white/20 hover:text-white',
                        dir === 'left' ? 'left-2 md:left-6' : 'right-2 md:right-6',
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkCarousel;
