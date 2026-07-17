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

const PAGE_NAME = 'ml3yp';

export const metadata = createWorkMetadata(PAGE_NAME);

const TelevisionPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage url="https://ml3yp.vercel.app/" imgSrc="ml3yp.webp" />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">
        📺 Midnight Lofi 3D Youtube Player
      </span>

      <CustomList>
        <CustomList.MainListItem>
          YouTube 플레이리스트 감상을 위한 몰입형 3D 환경 토이 프로젝트.
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <TechStack
        stacks={[
          'Next.js',
          'Typescript',
          'Three.js',
          'React Three Fiber',
          'Framer Motion',
          'Tailwind CSS',
        ]}
      />

      <PartSubTitle title={'주요 기능'} />
      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">🌌 몰입형 3D 환경</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">TV 화면 속 영상</strong>: TV 화면 내에
          Youtube Player를 맵핑하여 실감나게 구현.
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">인터랙티브 카메라</strong>: Orbit
          Controls을 통해 원하는 각도에서 공간을 탐색하고 감상 가능.
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">🎥 YouTube Player 기능</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">커스텀 플레이리스트</strong>: 나만의
          영상 플레이리스트를 만들어 연속 영상 시청 가능.
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">실시간 검색</strong>: YouTube API 연동을
          통해 영상을 검색 해서 플레이리스트에 추가 가능.
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">직관적인 UI</strong>: 하단 제어 컨트롤러
          패널을 통해 재생, 볼륨 조절, 플레이리스트 관리.
        </CustomList.SubListItem>
      </CustomList>

      <div className="my-3" />
      <PartTitle title={'Link'} />
      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default TelevisionPage;
