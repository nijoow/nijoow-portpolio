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

      <ul className="flex flex-col gap-1 pl-2">
        <li>
          1) Next.js 서버컴포넌트에서 fetch 함수의
          <span className="mx-1 rounded-md bg-gray-500 px-2 py-1 text-sm text-white">
            cache: &apos;no-store&apos;
          </span>
          옵션을 적용하였으나, 30초 가량 새로운 데이터를 불러오지 못하는 문제
        </li>
        <li>
          - 클라이언트 Router Cache가 서버컴포넌트의 payload를 캐싱하여 발생한
          것을 확인
        </li>
        <li className="text-purple-regular font-semibold">
          - 해당 페이지에 접근하였을때{' '}
          <span className="mx-1 rounded-md bg-gray-500 px-2 py-1 text-sm text-white">
            router.refresh()
          </span>
          를 통해 강제로 새로고침하도록 수정하여 문제 해결
        </li>
      </ul>

      <ul className="flex flex-col gap-1 pl-2">
        <li>
          2) Next/Image 컴포넌트를 사용하여 이미지를 불러왔을 때, 이미지를
          불러오는 속도가 느린 문제 발생
        </li>
        <li>
          -{' '}
          <span className="mx-1 rounded-md bg-gray-500 px-2 py-1 text-sm text-white">
            layout=&apos;fill&apos;
          </span>{' '}
          옵션을 사용했을 때, 기본적으로 생성되는 이미지 srcSet 이 너무 많아지는
          것을 확인
        </li>
        <li className="text-purple-regular font-semibold">
          - next.config.js 파일에서
          <span className="mx-1 rounded-md bg-gray-500 px-2 py-1 text-sm text-white">
            images.imageSizes / images.domains
          </span>
          옵션을 수정하여 해결
        </li>
      </ul>
      <div className="my-3" />
    </>
  );
};

export default CusmeticPage;
