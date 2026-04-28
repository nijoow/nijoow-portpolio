import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';

const MoimcityPage = () => {
  return (
    <>
      <WorkCarousel
        imgSrcList={[
          'moimcity/moimcity.png',
          'moimcity/만남.jpeg',
          'moimcity/위시리스트.jpeg',
          'moimcity/필터.jpeg',
          'moimcity/모임상세.jpeg',
          'moimcity/프로필상세.jpeg',
        ]}
        aspectRatio="square"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-gray-400">(주)모임특별시</span>
      <span className="text-xl font-bold">💖 모임특별시</span>
      <CustomList>
        <CustomList.MainListItem>
          취향 기반 소셜 모임 플랫폼
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />
      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'zustand',
          'Framer Motion',
        ]}
      />

      <PartSubTitle title={'주요 업무 및 성과'} />

      <CustomList>
        <CustomList.MainListItem>
          서비스 리뉴얼에 따른 프론트엔드 고도화 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          크로스 브라우저 환경에서의{' '}
          <strong className="font-bold">터치 동작 오류 해결</strong> 등 모바일
          UX 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">
            Prettier 및 플러그인 설정・코드 리팩토링
          </strong>
          을 통해 가독성 및 유지보수성 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">
            600개 이상의 불필요한 파일 정리 및 9만 줄의 데드코드 감축
          </strong>
          을 통해 개발 환경 최적화 및 빌드 속도 개선
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'트러블 슈팅'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">
            여러 프리랜서를 거치며 발생한 컨벤션 불일치 및 코드 중복
          </strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-sm text-gray-400">
            이슈: 다수의 개발자가 참여하며 코딩 컨벤션이 무너지고, 중복 파일과
            사용되지 않는 익스포트가 산재하여 유지보수가 어려운 상태
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-purple-regular text-sm">
            해결책: <strong className="font-bold">Knip</strong> 라이브러리
            도입을 통한 프로젝트 내 미사용 파일, 익스포트, 의존성을 정리
          </p>
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">
            키보드 활성 시 하단 공백 발생 문제
          </strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-sm text-gray-400">
            이슈: 모바일 웹뷰 앱 환경에서 키보드가 나타날 때, 하단에 불필요한
            여백이 생기는 현상
          </p>
        </CustomList.SubListItem>

        <CustomList.SubListItem showBullet={false}>
          <p className="text-purple-regular text-sm">
            해결책: 뷰포트 단위를 dvh로 변경하고, 전반적인 레이아웃을 구성하는
            height 및 overflow 속성 최적화
          </p>
        </CustomList.SubListItem>
      </CustomList>

      <div className="my-3" />
    </>
  );
};

export default MoimcityPage;
