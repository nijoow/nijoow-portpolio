import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'launchpad';

export const metadata = createWorkMetadata(PAGE_NAME);

const LaunchpadPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://nijoow-launchpad.vercel.app/"
        imgSrc="nijoow-launchpad.webp"
      />

      <div className="my-3" />

      <PartTitle title="프로젝트 개요" />
      <CustomList>
        <CustomList.MainListItem>
          전자 악기 런치패드 토이 프로젝트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="기술 스택" />

      <TechStack stacks={['Next.js', 'TypeScript', 'Tailwind CSS']} />

      <PartSubTitle title="주요 기능" />

      <CustomList>
        <CustomList.MainListItem>
          마우스·키보드·터치 입력으로 런치패드를 누를 때마다 사운드 재생
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          피아노와 드럼을 포함한 두 가지 사운드 모드 제공
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="문제 해결" />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">연속 클릭 시 사운드 중첩 문제</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-ink-muted border-l-2 border-white/15 pl-3 text-sm break-keep">
            이슈: onClick 이벤트를 통해 사운드를 재생할 때, 빠른 속도로 연속
            클릭 시 사운드가 끊기지 않고 부자연스럽게 중첩되는 현상
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="border-brand-lavender/40 text-brand-lavender/90 border-l-2 pl-3 text-sm break-keep">
            해결책: 마우스를 누를 때와 뗄 때의 이벤트를 분리하고, 모바일 환경을
            위해 Touch 이벤트를 개별 처리하여 사운드 재생 시점 제어
          </p>
        </CustomList.SubListItem>
      </CustomList>

      <div className="my-3" />
      <PartTitle title="관련 링크" />
      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default LaunchpadPage;
