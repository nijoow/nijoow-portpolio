import PartSubTitle from '@/app/works/[work]/_container/PartSubTitle'
import PartTitle from '@/app/works/[work]/_container/PartTitle'
import Work from '@/app/works/[work]/_container/Work'
import Link from 'next/link'
import React from 'react'
import { BsGithub } from 'react-icons/bs'

interface WorkContents {
  [key: string]: JSX.Element
}

export const workContent: WorkContents = {
  'nijoow-vintage': (
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
      <div className="my-1" />
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Tailwind, Recoil, supabase</span>
      <div className="my-1" />
      <PartSubTitle title={'기능'} />
      <ul>
        <li>- supabase를 통한 이메일 회원가입 및 로그인</li>
        <li>- 상품 리스트 및 상품 디테일 페이지</li>
        <li>- 전역 상태로 임시 구현한 장바구니, 관심상품 기능</li>
      </ul>
      <div className="my-1" /> <PartSubTitle title={'테스트 계정'} />
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
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/nijoow-vintage"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  ),
  'catch-the-candy': (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow-portfolio.vercel.app/CatchTheCandy_p5/"
        imgSrc="catchTheCandy.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🍬 Catch the candy</span>
      <span className="text-base font-medium">
        - 졸업전시회 팀 인터랙티브아트 (p5.js ver.)
      </span>
      <div className="my-1" />
      <PartSubTitle title={'컨셉'} />
      <span className="font-semibold">&quot;Bias&quot;</span>
      <span className="pl-1">
        바구니를 선택하면 게임은 시작된다. 높은 점수를 얻기 위해 이리저리
        움직이며 떨어지는 사탕들을 받아보자. 게임에 온전히 몰입하고 빠져들어보는
        것이다. 다양한 사탕을 제대로 받고 있는 것이 맞을까? 예상과는 다른 결과가
        나올지도 모른다.
      </span>
      <div className="my-1" />
      <PartSubTitle title={'실행 과정'} />
      <ul>
        <li>1) 빨간색 바구니와 파란색 바구니중 하나를 클릭하면 게임 시작</li>
        <li>
          2) 마우스 위치에 따라 바구니가 양옆으로 움직이며 하늘에서 떨어지는
          사탕을 받으며 게임 진행{' '}
        </li>
        <li>3) 타이머가 끝나고 게임이 종료되면 결과를 확인</li>
      </ul>
      <div className="my-1" />
      <PartSubTitle title={'기술 스택'} />
      <span>- Processing / Javascript (p5.js)</span>
      <PartSubTitle title={'팀구성'} />
      <span>- 디자인앤테크놀로지 졸업전시회 멤버 Memory팀 4명</span>
      <PartSubTitle title={'역할'} />
      <ul>
        <li>- 아이디어 및 컨셉 기획</li>
        <li>- 게임 기능 개발</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://www.youtube.com/watch?v=vcJvQrc6k_w"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>졸업전시회 시연 영상</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://nijoow-portfolio.vercel.app/CatchTheCandy_p5/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/CatchTheCandy_p5"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  ),
  treenow: (
    <>
      {' '}
      <PartTitle title={'View'} />
      <Work url="https://treenow.co.kr" imgSrc="treenow.png" />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🌳 트리나우</span>
      <span className="text-base font-medium">
        - B2B 조경 수목 거래 플랫폼 웹/하이브리드앱
      </span>
      <PartSubTitle title={'기술 스택'} />
      <span>
        - React.js, Typescript, Recoil, Tailwind, React-native(webview)
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
  ),
  'nijoow-launchpad': (
    <>
      {' '}
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow-launchpad.vercel.app/"
        imgSrc="nijoow-launchpad.png"
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🎹 nijoow-launchpad</span>
      <span>- 전자 악기 런치패드 토이프로젝트</span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Tailwind</span>
      <PartSubTitle title={'기능'} />
      <span>
        - 마우스/키보드/터치 이벤트로 런치패드를 클릭할 때 마다 사운드 재생
      </span>
      <span>
        - 피아노 사운드/드럼을 포함한 다양한 사운드의 두가지 모드로 연주 가능
      </span>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-launchpad.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/nijoow-launchpad"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  ),
  memory: (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow-portfolio.vercel.app/PNUDT12/"
        imgSrc="pnudt12.png"
      ></Work>
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🎓 MEMORY</span>
      <span>
        - 부산대학교 디자인학과 디자인엔테크놀로지 전공 12회 졸업전시회 웹사이트
      </span>
      <span>- 졸업전시회 소개 및 전시 정보 소개</span>
      <span>- 컨셉 및 작품 설명 (전시회 도록 대체)</span>
      <span>- 전시회 작품 시연 영상 링크</span>
      <PartSubTitle title={'기술 스택'} />
      <span>- HTML, CSS, Javascript</span>
      <PartSubTitle title={'팀구성'} />
      <span>- 디자인앤테크놀로지 졸업전시회 멤버 웹팀 5명</span>
      <PartSubTitle title={'역할'} />
      <ul>
        <li>- 기획 및 디자인 참여</li>
        <li>- 전체적인 레이아웃, About 페이지, Header 반응형 퍼블리싱</li>
        <li>- 가로스크롤 페이지, 스크롤 타임라인 구현</li>
        <li>- 스크롤, hover 애니메이션 구현</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />

      <Link
        href="https://nijoow-portfolio.vercel.app/PNUDT12/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/PNUDT12"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  ),
  portfolio: (
    <>
      {' '}
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow-portfolio.vercel.app"
        imgSrc="portfolio.png"
      ></Work>
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🎨 개인 포트폴리오 사이트</span>
      <span>- 주기적으로 업데이트 중</span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, tailwind css</span>
      <PartSubTitle title={'개발'} />
      <ul>
        <li>- Next.js 프레임워크의 SPA</li>
        <li>- canvas, three.js 라이브러리를 사용한 3D 로고 렌더링</li>
        <li>- Framer-motion 라이브러리를 활용한 트랜지션</li>
        <li>- 시스템 테마에 따른 다크모드 및 토글 기능</li>
        <li>
          - Spotify API를 통해 AccessToken 발급 및 최근들은 음악 정보 소개
        </li>
        <li>- javascript 에서 typescript로 마이그레이션</li>
        <li>- SCSS를 통한 스타일링에서 tailwind css로 마이그레이션</li>
        <li className="line-through">- Markdown 파일을 불러온 블로그 기능</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-portfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/nijoow.github.io"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  ),
  'prfl-link': (
    <>
      <PartTitle title={'View'} />
      <Work url="https://prfl.link/" imgSrc="prflLink.png"></Work>
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🔗 프로필링크 (prfl.link)</span>
      <span>- 다양한 링크 한 페이지에서 볼 수 있는 멀티링크 연결 서비스</span>
      <PartSubTitle title={'역할'} />
      <ul>
        <li>- 서비스 내 테마 페이지 디자인</li>
        <li>- svg를 활용한 테마 페이지 퍼블리싱</li>
        <li>- 로고 제작</li>
      </ul>{' '}
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://prfl.link/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>{' '}
      <div className="my-1" />
      <Link
        href="https://prfl.link/@nijoow"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>@nijoow</span>
      </Link>
    </>
  ),
  'ai-love-predictor': (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://ai-love-predictor.vercel.app/"
        imgSrc="ai-love-predictor.png"
      ></Work>
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">💓 너는 솔로? 그것이 알고싶다!</span>
      <span className="text-base font-medium">
        - 질문 응답을 통해 연애 확률 예측 결과를 보여주는 테스트
      </span>
      <span className="text-base font-medium">- 스터디용 사이드 프로젝트</span>
      <span className="text-base font-medium">
        - 기획 미완성, 프론트엔드만 임시로 제작해서 배포
      </span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Jotai, Tailwind</span>
      <PartSubTitle title={'역할'} />
      <ul>
        <li>- 기획 참여</li>
        <li>- 디자인에 따른 UI구현</li>
        <li>- 질문 응답 테스트 기능 구현</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://ai-love-predictor.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/ai-love-predictor-front"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  ),
  // 'nijoow-cocktail': (
  //   <>
  //     <PartTitle title={'View'} />
  //     <Work
  //       url="https://nijoow-cocktail.vercel.app/"
  //       imgSrc="nijoow-cocktail.png"
  //     ></Work>
  //     <div className="my-3" />
  //     <PartTitle title={'Explanation'} />
  //     <span className="text-xl font-bold">🍸 nijoow-cocktail</span>
  //     <span className="text-base font-medium">
  //       - 칵테일 조회 사이트 토이 프로젝트
  //     </span>
  //     <PartSubTitle title={'기술 스택'} />
  //     <span>
  //       - Next.js, Typescript, Recoil, Tailwind, React-query, Daisy UI
  //     </span>
  //     <PartSubTitle title={'기능'} />
  //     <ul>
  //       <li>- Next.js 13 버전 사용</li>
  //       <li>- thecocktaildb.com 칵테일 관련 api 연동</li>
  //       <li>- 카테고리, 재료 필터 기능</li>
  //       <li>- React-query 데이터 캐싱</li>
  //     </ul>
  //     <div className="my-3" />
  //     <PartTitle title={'Link'} />
  //     <Link
  //       href="https://nijoow-cocktail.vercel.app/"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
  //     >
  //       <span>사이트 바로가기</span>
  //     </Link>
  //     <div className="my-1" />
  //     <Link
  //       href="https://github.com/nijoow/nijoow-cocktail"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
  //     >
  //       <BsGithub />
  //       <span>Github</span>
  //     </Link>
  //   </>
  // ),
  'nijoow-drawing': (
    <>
      <PartTitle title={'View'} />
      <Work
        url="https://nijoow-drawing.vercel.app/"
        imgSrc="nijoow-drawing.png"
      ></Work>
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-xl font-bold">🎨 nijoow-drawing</span>
      <span className="text-base font-medium">- svg 드로잉 토이 프로젝트</span>
      <span className="text-base font-medium">- 🚧 개발 진행 중 🚧</span>
      <PartSubTitle title={'기술 스택'} />
      <span>- Next.js, Typescript, Recoil, Tailwind</span>
      <PartSubTitle title={'기능'} />
      <ul>
        <li>- 마우스 드래그로 사각형, 삼각형, 원 그리기</li>
        <li>
          - 면 색, 선 색, 선 굵기, 투명도 조절 (기본 세팅으로 그리기 및 도형
          선택해서 변경)
        </li>
        <li>- 도형 선택 핸들러 구현 (드래그 이동, 크기 조절, 회전 이벤트)</li>
      </ul>
      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-drawing.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <div className="my-1" />
      <Link
        href="https://github.com/nijoow/nijoow-drawing"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  ),
  cusmetic: (
    <>
      <PartTitle title={'View'} />
      <Work url="https://cusmetic.kr" imgSrc="cusmetic.png"></Work>
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
  ),
}
