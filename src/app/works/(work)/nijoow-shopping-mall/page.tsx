import React from 'react'
import PartTitle from '../../_container/PartTitle'
import Work from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

const NijoowShoppingMallPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <Work
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
      {/* <PartSubTitle title={'트러블 슈팅'} />
      <ul className="pl-2 flex flex-col gap-1">
        <li>
          1) Next.js 서버컴포넌트에서 fetch 함수의
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            cache: &apos;no-store&apos;
          </span>
          옵션을 적용하였으나, 30초 가량 새로운 데이터를 불러오지 못하는 문제
        </li>
        <li >
          - 클라이언트 Router Cache가 서버컴포넌트의 payload를 캐싱하여 발생한
          것을 확인
        </li>
        <li className="font-semibold text-purple-regular">
          - 해당 페이지에 접근하였을때{' '}
          <span className="rounded-md px-2 py-1 mx-1 text-sm bg-gray-500 text-white">
            router.refresh()
          </span>
          를 통해 강제로 새로고침하도록 수정하여 문제 해결
        </li>
      </ul> */}

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
