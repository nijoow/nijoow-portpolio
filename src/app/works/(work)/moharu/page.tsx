import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
import CustomList from '../../_container/CustomList'
import PartSubTitle from '../../_container/PartSubTitle'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'

const MoharuPage = () => {
  return (
    <>
      <PartTitle title={'View'} />

      <WorkImage imgSrc="moharu.png" />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">🎫 moharu</span>

      <CustomList>
        <CustomList.MainListItem>취미 활동 추천 플랫폼</CustomList.MainListItem>
        <CustomList.MainListItem>
          비사이드 포텐데이 온라인 해커톤 팀 프로젝트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <CustomList>
        <CustomList.MainListItem>
          Next.js, Typescript, Tailwind CSS, Auth.js
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'팀구성'} />

      <CustomList>
        <CustomList.MainListItem>
          기획자 1, 디자이너 1, 프론트엔드 2, 백엔드 2
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'역할'} />

      <CustomList>
        <CustomList.MainListItem>Next.js 구조 설계</CustomList.MainListItem>
        <CustomList.MainListItem>
          Auth.js 회원가입/이메일 로그인/소셜 로그인 기능 및 페이지 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Vercel 배포 및 도메인 연결
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          클라이언 컴포넌트로 만든 페이지를 서버 컴포넌트로 리팩토링
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'트러블 슈팅'} />

      <ul className="pl-2 flex flex-col gap-1">
        <li>
          1) 백엔드 서버는 네이버 클라우드 플랫폼에 배포되었고, 프론트엔드
          서버는 vercel에 배포하였는데, Auth.js 로그인/회원가입 요청에서 가끔씩
          SSL 에러가 나는 문제 발생
        </li>
        <li>
          2) lte 모바일 네트워크에서 백엔드 서버에 연결이 안되는 문제 발생
          (SSL_PROTOCOL_ERROR)
        </li>
        <li>
          - SSL 검사 사이트를 통해 확인한 결과, https://api.moharu.site 에
          vercel 관련 IP가 나타나는 것을 확인
        </li>
        <li className="font-semibold text-purple-regular">
          - 네이버 클라우드 플랫폼에 적용했던 api.moharu.site 의 서브 도메인 DNS
          Records를 Vercel 도메인 설정에서 추가하여 문제 해결
        </li>
      </ul>

      <div className="my-3" />

      <PartTitle title={'Link'} />

      <Link
        href="https://bside.best/projects/detail/P240514222247"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>상세 설명 바로가기</span>
      </Link>

      <Link
        href="https://github.com/poten-moharu/moharu-frontend"
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

export default MoharuPage
