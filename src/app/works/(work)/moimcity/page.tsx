import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
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

      <div className="my-3" />
    </>
  );
};

export default MoimcityPage;
