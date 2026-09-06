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

const PAGE_NAME = 'lessor-panda-village';

export const metadata = createWorkMetadata(PAGE_NAME);

const LessorPandaVillagePage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://lessor-panda-village.vercel.app/"
        imgSrc="lessor-panda-village.webp"
      />

      <div className="my-3" />

      <PartTitle title="프로젝트 개요" />
      <CustomList>
        <CustomList.MainListItem>
          레서판다와 함께 평화로운 마을에서 다른 유저들과 소통하는 3D 인터랙티브
          웹 애플리케이션
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Google Antigravity·Claude·Codex를 3D 로직 설계·구현·리뷰를 위한 페어
          프로그래밍 도구로 함께 활용하고, 실시간 동기화 기능을 직접 검증하며
          개발
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="기술 스택 및 사용 도구" />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-muted text-sm font-bold">Core</span>
          <TechStack
            stacks={[
              'Next.js 16',
              'React 19',
              'TypeScript',
              'Supabase 2 (Auth · Postgres · Realtime)',
              'Zustand 5',
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-muted text-sm font-bold">
            3D Rendering & Physics
          </span>
          <TechStack
            stacks={[
              'Three.js r183',
              'React Three Fiber 9',
              '@react-three/drei 10',
              '@react-three/postprocessing',
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-muted text-sm font-bold">
            Styling & Animation
          </span>
          <TechStack stacks={['Tailwind CSS 4', 'Framer Motion']} />
        </div>
      </div>
      <PartSubTitle title="주요 기능" />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">3D 캐릭터 컨트롤 & 인터랙션</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          키보드/마우스를 통한 자유로운 이동(걷기, 달리기, 점프) 및 공간 해시
          그리드 기반의 충돌 판정
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

      <PartSubTitle title="문제 해결" />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">경관 3D 에셋 렌더링 비용</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-ink-muted border-l-2 border-white/15 pl-3 text-sm break-keep">
            이슈: 메시 압축만으로는 GPU가 처리하는 삼각형 수가 줄지 않아 집·고목
            경관 에셋의 렌더링 비용이 그대로 남는 문제
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="border-brand-lavender/40 text-brand-lavender/90 border-l-2 pl-3 text-sm break-keep">
            해결책: 분리된 정점을 결합한 뒤 오차 범위를 제한해 단순화하고, 월드
            bbox를 비교해 배치·충돌 기준을 검증하여 두 에셋의 삼각형 수를 각각
            885,380→46,067, 349,791→22,127로 약 94% 축소하고 모델 용량을
            9.1MB에서 3.2MB로 감소
          </p>
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">하이드레이션(Hydration) 에러</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-ink-muted border-l-2 border-white/15 pl-3 text-sm break-keep">
            이슈: 랜덤 파티클 배치 시 서버와 클라이언트의 렌더링 결과가
            불일치하여 발생하는 하이드레이션 오류
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="border-brand-lavender/40 text-brand-lavender/90 border-l-2 pl-3 text-sm break-keep">
            해결책: 3D 씬을 dynamic import와 ssr: false로 분리하고 랜덤 파티클을
            클라이언트에서 초기화하도록 구성
          </p>
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">
            캐릭터 위 닉네임 위치 동기화 문제
          </strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-ink-muted border-l-2 border-white/15 pl-3 text-sm break-keep">
            이슈: Html 컴포넌트로 구현된 닉네임이 캐릭터의 움직임을 따라가지
            못하고 고정되지 않는 현상
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="border-brand-lavender/40 text-brand-lavender/90 border-l-2 pl-3 text-sm break-keep">
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
          <p className="text-ink-muted border-l-2 border-white/15 pl-3 text-sm break-keep">
            이슈: Supabase Realtime 통신 시 과도한 업데이트로 인한 네트워크 부하
            및 리렌더링 성능 저하
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="border-brand-lavender/40 text-brand-lavender/90 border-l-2 pl-3 text-sm break-keep">
            해결책: 위치 정보를 useRef로 관리해 불필요한 리렌더링을 줄이고, 전송
            주기를 100ms로 제한해 위치 업데이트 트래픽을 제어
          </p>
        </CustomList.SubListItem>
      </CustomList>
      <div className="my-3" />

      <PartTitle title="관련 링크" />
      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default LessorPandaVillagePage;
