import React from 'react'
import PartTitle from '../../_container/PartTitle'
import Work from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const NijoowVintagePage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow-vintage.vercel.app/"
        imgSrc="nijoow-vintage.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🧥 nijoow-vintage</span>
      <span className="text-base font-medium">
        - 빈티지 쇼핑몰 토이프로젝트
      </span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Tailwind CSS, Recoil, Supabase</span>
      <PartSubTitle title={'기능'} />
      <ul>
        <li>- supabase를 통한 이메일 회원가입 및 로그인</li>
        <li>- 상품 리스트 및 상품 디테일 페이지</li>
        <li>- 전역 상태로 임시 구현한 장바구니, 관심상품 기능</li>
      </ul>
      <PartSubTitle title={'테스트 계정'} />
      <ul>
        <li>- id : test@email.com</li>
        <li>- pw : test12#$</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-vintage.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/vintage"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  )
}

export default NijoowVintagePage
