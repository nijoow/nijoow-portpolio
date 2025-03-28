import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
import CustomList from '../../_container/CustomList'
import PartSubTitle from '../../_container/PartSubTitle'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'

const PortPolioPage = () => {
  return (
    <>
      <PartTitle title={'View'} />

      <WorkImage
        url="https://nijoow-portfolio.vercel.app"
        imgSrc="portfolio.png"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">🎨 개인 포트폴리오 사이트</span>

      <PartSubTitle title={'기술 스택'} />

      <CustomList>
        <CustomList.MainListItem>
          Next.js, Typescript, Tailwind CSS, React-Three-Fiber, Framer-Motion
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'개발'} />

      <CustomList>
        <CustomList.MainListItem>
          Next.js 프레임워크의 SPA
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          canvas, three.js 라이브러리를 사용한 3D 로고 렌더링
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Framer-motion 라이브러리를 활용한 트랜지션
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          시스템 테마에 따른 다크모드 및 토글 기능
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Spotify API를 통해 AccessToken 발급 및 최근들은 음악 정보 소개
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          javascript 에서 typescript로 마이그레이션
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          SCSS를 통한 스타일링에서 tailwind css로 마이그레이션
        </CustomList.MainListItem>
      </CustomList>

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
  )
}

export default PortPolioPage
