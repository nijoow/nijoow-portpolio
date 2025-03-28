'use client'

import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import Image from 'next/image'
import { prefix } from '@/config/config'

const PrevButton = () => {
  const swiper = useSwiper()

  return (
    <button
      type="button"
      className="flex w-8 h-8 items-center z-20 justify-center rounded-full absolute left-1.5 top-1/2 transform -translate-y-1/2 "
      onClick={() => swiper.slidePrev()}
    >
      <FiChevronLeft className="w-full h-full stroke-purple-regular" />
    </button>
  )
}

const NextButton = () => {
  const swiper = useSwiper()

  return (
    <button
      type="button"
      className="flex w-8 h-8 items-center z-20 justify-center rounded-full absolute right-1.5 top-1/2 transform -translate-y-1/2 "
      onClick={() => swiper.slideNext()}
    >
      <FiChevronRight className="w-full h-full stroke-purple-regular" />
    </button>
  )
}

const WorkCarousel = ({ imgSrcList }: { imgSrcList: string[] }) => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{
        clickable: true,
      }}
      loop
      className="max-w-3xl w-full relative aspect-video overflow-hidden rounded-lg shadow-md
      [&_.swiper-pagination-bullet-active]:bg-purple-regular 

      "
    >
      {imgSrcList.map((imgSrc) => (
        <SwiperSlide key={imgSrc} className="relative w-full h-full bg-white">
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
  )
}

export default WorkCarousel
