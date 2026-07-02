import Link from 'next/link';
import { GithubIcon } from '@/components/Icons/GithubIcon';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';

export const metadata = {
  title: 'launchpad',
  description: 'launchpad — nijoow 포트폴리오 작업물',
};

const LaunchpadPage = () => {
  return (
    <>
      <WorkImage
        url="https://nijoow-launchpad.vercel.app/"
        imgSrc="nijoow-launchpad.webp"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">🎹 nijoow-launchpad</span>
      <CustomList>
        <CustomList.MainListItem>
          전자 악기 런치패드 토이프로젝트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <TechStack stacks={['Next.js', 'Typescript', 'Tailwind CSS']} />

      <PartSubTitle title={'기능'} />

      <CustomList>
        <CustomList.MainListItem>
          마우스/키보드/터치 이벤트로 런치패드를 클릭할 때 마다 사운드 재생
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          피아노 사운드/드럼을 포함한 다양한 사운드의 두가지 모드로 연주 가능
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'트러블 슈팅'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">연속 클릭 시 사운드 중첩 문제</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="border-l-2 border-white/15 pl-3 text-sm break-keep text-white/55">
            이슈: onClick 이벤트를 통해 사운드를 재생할 때, 빠른 속도로 연속
            클릭 시 사운드가 끊기지 않고 부자연스럽게 중첩되는 현상
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="border-purple-light/40 text-purple-light/90 border-l-2 pl-3 text-sm break-keep">
            해결책: 마우스를 누를 때와 뗄 때의 이벤트를 분리하고, 모바일 환경을
            위해 Touch 이벤트를 개별 처리하여 사운드 재생 시점 제어
          </p>
        </CustomList.SubListItem>
      </CustomList>

      <div className="my-3" />
      <PartTitle title={'Link'} />
      <Link
        href="https://nijoow-launchpad.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="border-purple-light/25 bg-purple-medium/20 hover:bg-purple-medium/35 flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-bold text-white backdrop-blur-xl transition-colors"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/launchpad"
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

export default LaunchpadPage;
