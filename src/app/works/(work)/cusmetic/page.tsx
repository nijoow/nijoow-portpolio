import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';

const CusmeticPage = () => {
  return (
    <>
      <WorkCarousel
        imgSrcList={[
          'cusmetic/landing.png',
          'cusmetic/skin-type-check.png',
          'cusmetic/skin-type-result.png',
          'cusmetic/search.png',
          'cusmetic/cosmetic-result.png',
        ]}
        aspectRatio="square"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-gray-400">주식회사 비멕스(BMEKSCo. Ltd.)</span>
      <span className="text-xl font-bold">🧴 Cusmetic</span>

      <CustomList>
        <CustomList.MainListItem>
          피부타입 진단 설문 및 화장품 매칭률 서비스
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <TechStack stacks={['Next.js', 'Typescript', 'Recoil', 'Tailwind CSS']} />

      <PartSubTitle title={'주요 업무 및 성과'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">Next.js/Typescript</strong> 기반의{' '}
          <strong className="font-bold">
            프론트엔드 아키텍쳐 설계 및 인터페이스 구현
          </strong>
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">Next.js</strong>와 서버 사이드 세션을
          활용해 인증에 따른 컴포넌트 깜빡임 제거 및 초기 렌더링 속도 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">Next-Auth</strong>를 활용해 프론트엔드
          환경에서{' '}
          <strong className="font-bold">소셜 로그인 기반의 인증 체계</strong>를
          신속하게 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          검색 상태를 <strong className="font-bold">URL 쿼리 스트링</strong>으로
          관리하여 새로고침이나 링크 공유 시 맥락 유지
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          검색 <strong className="font-bold">Debounce</strong> 적용으로{' '}
          <strong className="font-bold">API 호출을 80% 이상 절감</strong>
          하고, <strong className="font-bold">무한스크롤</strong> 기반 리스트
          최적화로 사용자 경험 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          AWS Amplify를 활용한{' '}
          <strong className="font-bold">배포 자동화 파이프라인</strong>을
          구축하여{' '}
          <strong className="font-bold">개발 및 배포 프로세스 단축</strong>
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'트러블 슈팅'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">서버 컴포넌트 데이터 캐싱 문제</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-sm text-gray-400">
            이슈: fetch 함수에 no-store 옵션을 적용했음에도 클라이언트 Router
            Cache로 인해 약 30초간 새로운 데이터를 불러오지 못하는 현상
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-purple-regular text-sm">
            해결책: 페이지 진입 시 router.refresh()를 호출하여 클라이언트 측
            캐시를 강제로 무효화함으로써 최신 데이터 보장
          </p>
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">Next/Image 로딩 성능 저하</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-sm text-gray-400">
            이슈: layout=&apos;fill&apos; 사용 시 너무 많은 srcSet이 생성되어
            이미지 로딩 속도가 느려지는 문제 발생
          </p>
        </CustomList.SubListItem>
        <CustomList.SubListItem showBullet={false}>
          <p className="text-purple-regular text-sm">
            해결책: next.config.js에서 imageSizes 및 deviceSizes를 최적화하여
            불필요한 이미지 생성을 방지
          </p>
        </CustomList.SubListItem>
      </CustomList>
      <div className="my-3" />
    </>
  );
};

export default CusmeticPage;
