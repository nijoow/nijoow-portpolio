import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';

const LessorPandaVillagePage = () => {
  return (
    <>
      <WorkImage
        url="https://lessor-panda-village.vercel.app/"
        imgSrc="lessor-panda-village.png"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">
        🐾 Lessor Panda Village (레서판다 빌리지)
      </span>
      <CustomList>
        <CustomList.MainListItem>
          레서판다와 함께 평화로운 마을을 탐험하는 3D 인터랙티브 웹 애플리케이션
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          AI Agent를 활용하여 구현
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'주요 기능'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">3D 인터랙션</strong>{' '}
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          WASD 또는 방향키를 사용하여 레서판다를 자유롭게 조작 (걷기, 달리기,
          점프)
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">낮과 밤에 따른 시각효과 변화</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          실시간으로 전환되는 조명과 환경 연출 (흩날리는 벚꽃잎/반딧불이)
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">물리 상호작용</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          마을 내 울타리, 집, 나무 등 지형지물과의 충돌 처리 구현
        </CustomList.SubListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택 및 사용 도구'} />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Core
          </span>
          <TechStack stacks={['Next.js 15', 'React 19', 'TypeScript']} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            3D & Graphics
          </span>
          <TechStack
            stacks={[
              'Three.js',
              'React Three Fiber',
              '@react-three/drei',
              '@react-three/postprocessing',
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Styling & Animation
          </span>
          <TechStack stacks={['Tailwind CSS 4', 'Framer Motion']} />
        </div>
      </div>

      <PartSubTitle title={'팀 구성'} />

      <CustomList>
        <CustomList.MainListItem>개인 프로젝트</CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title={'Link'} />
      <Link
        href="https://lessor-panda-village.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-medium dark:bg-purple-regular flex items-center justify-center rounded-lg px-5 py-2 text-base text-white"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/lessor-panda-village"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-medium dark:bg-purple-regular flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-base text-white"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  );
};

export default LessorPandaVillagePage;
