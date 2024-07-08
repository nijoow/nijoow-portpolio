import React from 'react'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'

const CusmeticPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <WorkImage url="https://cusmetic.kr" imgSrc="cusmetic.png" />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🧴 Cusmetic</span>
      <span className="text-base font-medium">
        - 피부타입 진단 설문 및 화장품 매칭률 서비스
      </span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Recoil, Tailwind CSS</span>
      <PartSubTitle title={'기능'} />
      <ul>
        <li>- Next.js App Router 기반 프로젝트 세팅 및 반응형 웹 개발</li>
        <li>- 서버/클라이언트 컴포넌트를 조합하여 유저 페이지 개발</li>
        <li>
          - 유저/화장품/성분 등을 Excel import/export를 통해 관리할 수 있는
          어드민 페이지 개발
        </li>
        <li>- Next-Auth를 통한 소셜 로그인 연동</li>
        <li>- 화장품 검색 리스트 무한스크롤 적용</li>
        <li>- AWS Amplify 프론트엔드 배포 자동화</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://cusmetic.kr"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
    </>
  )
}

export default CusmeticPage
