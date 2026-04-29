import Link from 'next/link';
import { GithubIcon } from '@/components/Icons/GithubIcon';
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
          레서판다와 함께 평화로운 마을에서 다른 유저들과 소통하는 3D 인터랙티브
          웹 애플리케이션
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          AI Agent(Antigravity)를 페어 프로그래밍 파트너로 활용하여 복잡한 3D
          로직과 실시간 동기화 기능을 효율적으로 구현
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택 및 사용 도구'} />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Core
          </span>
          <TechStack
            stacks={[
              'Next.js 15',
              'React 19',
              'TypeScript',
              'Supabase Realtime',
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            3D Rendering & Physics
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
      <PartSubTitle title={'주요 기능'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">3D 캐릭터 컨트롤 & 인터랙션</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          키보드/마우스를 통한 자유로운 이동(걷기, 달리기, 점프) 및 물리 엔진
          기반의 충돌 처리
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">실시간 멀티플레이어 시스템</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          Supabase Realtime을 활용하여 접속 중인 유저의 위치와 닉네임을
          실시간으로 동기화
        </CustomList.SubListItem>
        <CustomList.SubListItem>실시간 채팅 기능 구현</CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">낮과 밤에 따른 시각효과 변화</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          낮과 밤의 실시간 전환에 따른 조명 변화 및 흩날리는 벚꽃, 반딧불이 등의
          파티클 시스템
        </CustomList.SubListItem>
      </CustomList>

      <PartSubTitle title={'트러블 슈팅'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">하이드레이션(Hydration) 에러</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-sm text-gray-400">
            이슈: 랜덤 파티클 배치 시 서버와 클라이언트의 렌더링 결과가
            불일치하여 발생하는 하이드레이션 오류
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-purple-regular text-sm">
            해결책: useEffect 내 상태 초기화 및 dynamic import를 통해 클라이언트
            사이드 렌더링 시점에만 해당 로직이 활성화되도록 수정
          </p>
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">
            캐릭터 위 닉네임 위치 동기화 문제
          </strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-sm text-gray-400">
            이슈: Html 컴포넌트로 구현된 닉네임이 캐릭터의 움직임을 따라가지
            못하고 고정되지 않는 현상
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-purple-regular text-sm">
            해결책: Html 대신 3D 씬 내부에 포함되는 Text 컴포넌트를 사용하여
            정확한 3D 좌표 동기화 구현
          </p>
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">
            실시간 멀티플레이어 동기화 최적화
          </strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-sm text-gray-400">
            이슈: Supabase Realtime 통신 시 과도한 업데이트로 인한 네트워크 부하
            및 리렌더링 성능 저하
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-purple-regular text-sm">
            해결책: 위치 정보를 useRef로 관리하여 리렌더링을 방지하고, 전송
            주기를 100ms로 조절하여 트래픽 80% 절감
          </p>
        </CustomList.SubListItem>
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
        <GithubIcon size={20} />
        <span>Github</span>
      </Link>
    </>
  );
};

export default LessorPandaVillagePage;
