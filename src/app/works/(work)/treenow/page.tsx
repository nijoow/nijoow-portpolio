import React from 'react'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'
import PartSubTitle from '../../_container/PartSubTitle'
import Link from 'next/link'

const TreenowPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <WorkImage url="https://treenow.co.kr" imgSrc="treenow.png" />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🌳 트리나우</span>
      <span className="text-base font-medium">
        - B2B 조경 수목 거래 플랫폼 웹/하이브리드앱
      </span>
      <PartSubTitle title={'기술 스택'} />
      <span>
        - React.js, Typescript, Recoil, Tailwind CSS, React-native(webview)
      </span>
      <PartSubTitle title={'팀구성'} />
      <span>- PM 1, 프론트엔드 1, 백엔드 1, 디자이너 1</span>
      <PartSubTitle title={'역할'} />
      <ul>
        <li>- 프로젝트 세팅 및 SPA 웹사이트 개발</li>
        <li>- 사용자 페이지 반응형 UI구현 및 기능 개발</li>
        <li>- 관리자 페이지 UI구현 및 기능 개발</li>
        <li>- REST 아키텍처 API를 통한 기능 구현</li>
        <li>
          - 외부 서비스의 무통장입금 결제, 본인인증, 문서 작성 및 조회, 인증서
          등록, 세금계산서 조회 기능 연동
        </li>
        <li>- React-Native 웹뷰를 사용한 하이브리드앱 개발 및 빌드 경험</li>
        <li>- 구글 플레이 스토어, 애플 앱스토어 앱 배포 경험</li>
        <li>- firebase cloud messaging 앱 푸시알림 기능 구현</li>
        <li>
          - yarn berry zero-install 환경 마이그레이션을 통한 CI/CD 속도 개선
        </li>
        <li>- Lazy Loading, CDN 이미지 최적화로 성능 개선</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://treenow.co.kr"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
    </>
  )
}

export default TreenowPage
