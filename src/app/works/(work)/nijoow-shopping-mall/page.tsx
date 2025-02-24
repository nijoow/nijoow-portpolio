import React from 'react'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const NijoowShoppingMallPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <WorkImage
        url="https://nijoow-shopping-mall.vercel.app/"
        imgSrc="nijoow-shopping-mall.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">👟 shopping-mall</span>
      <span className="text-base font-medium">
        - 쇼핑몰 풀스택 토이 프로젝트
      </span>
      <span className="text-base font-medium">- 🚧 개발 진행 중 🚧</span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Tailwind CSS, PostgreSQL</span>
      <PartSubTitle title={'기능'} />
      <ul>
        <li>- 회원가입, 로그인, 소셜로그인(구글) 기능</li>
        <li>- 내 정보 수정, 배송정보 저장</li>
        <li>- 홈화면, 상품 목록 페이지, 상품 페이지, 좋아요 리스트</li>
      </ul>
      <PartSubTitle title={'추가/개선할 기능'} />
      <ul>
        <li>- 디자인 개선</li>
        <li>- 내 정보 생년월일 추가</li>
        <li>- 소셜로그인(네이버/카카오)</li>
        <li>- 주문, 배송, 리뷰</li>
        <li>- 관리자 페이지(상품/주문/리뷰 관리)</li>
      </ul>

      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-shopping-mall.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/shopping-mall"
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

export default NijoowShoppingMallPage
