import Link from 'next/link';
import { GithubIcon } from '@/components/Icons/GithubIcon';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';

export const metadata = {
  title: 'moharu',
  description: 'moharu — nijoow 포트폴리오 작업물',
};

const MoharuPage = () => {
  return (
    <>
      <WorkImage imgSrc="moharu.webp" />

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

      <TechStack
        stacks={['Next.js', 'Typescript', 'Tailwind CSS', 'Auth.js']}
      />

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

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">
            LTE 환경에서의 SSL 프로토콜 에러
          </strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="border-l-2 border-white/15 pl-3 text-sm break-keep text-white/55">
            이슈: 백엔드(NCP)와 프론트엔드(Vercel) 배포 환경이 다른 상태에서,
            LTE 모바일 네트워크 접속 시 간헐적으로 SSL_PROTOCOL_ERROR 발생
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="border-l-2 border-white/15 pl-3 text-sm break-keep text-white/55">
            해결책: NCP 서브 도메인의 DNS Records를 Vercel 도메인 설정에
            추가하여 네트워크 경로상의 IP 불일치 문제를 해결
          </p>
        </CustomList.SubListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title={'Link'} />

      <Link
        href="https://bside.best/projects/detail/P240514222247"
        target="_blank"
        rel="noopener noreferrer"
        className="border-purple-light/25 bg-purple-medium/20 hover:bg-purple-medium/35 flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-bold text-white backdrop-blur-xl transition-colors"
      >
        <span>상세 설명 바로가기</span>
      </Link>

      <Link
        href="https://github.com/poten-moharu/moharu-frontend"
        target="_blank"
        rel="noopener noreferrer"
        className="border-purple-light/25 bg-purple-medium/20 hover:bg-purple-medium/35 flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-bold text-white backdrop-blur-xl transition-colors"
      >
        <GithubIcon size={20} />
        <span>Github</span>
      </Link>
    </>
  );
};

export default MoharuPage;
