'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { prefix } from '@/config/config';
import Image from 'next/image';

const PrevButton = () => {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      className="absolute left-1.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full"
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
      className="absolute right-1.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full"
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
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{
        clickable: true,
      }}
      loop
      className={`relative w-full max-w-3xl overflow-hidden rounded-lg shadow-md [&_.swiper-pagination-bullet-active]:bg-purple-regular ${
        { video: 'aspect-video', square: 'aspect-square' }[aspectRatio]
      }`}
    >
      {imgSrcList.map((imgSrc) => (
        <SwiperSlide key={imgSrc} className="relative h-full w-full bg-white">
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
  );
};

export default WorkCarousel;
