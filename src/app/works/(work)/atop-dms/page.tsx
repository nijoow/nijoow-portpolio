import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';

const AtopDmsPage = () => {
  return (
    <>
      <WorkCarousel
        imgSrcList={[
          'atop-dms/main.webp',
          'atop-dms/excel.webp',
          'atop-dms/risk-matrix.webp',
          'atop-dms/chart.webp',
          'atop-dms/formula.webp',
        ]}
      />
      <div className="my-3" />
      <PartTitle title={'Explanation'} />
      <span className="text-gray-400">주식회사 비멕스(BMEKSCo. Ltd.)</span>
      <span className="text-xl font-bold">📊 ATOP.DMS</span>
      <CustomList>
        <CustomList.MainListItem>
          기업 맞춤형 데이터 관리 시스템 SaaS
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <TechStack
        stacks={['Next.js', 'Typescript', 'Recoil', 'React-Query', 'Material UI']}
      />

      <PartSubTitle title={'주요 업무 및 성과'} />

      <CustomList>
        <CustomList.MainListItem>
          프로젝트에 중간 합류하여 비즈니스 로직과 라이브러리를 신속하게
          파악하고,{' '}
          <strong className="font-bold">데모용 MVP의 출시 기한</strong>을
          맞추는데 기여
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          엑셀 기능 관련 라이브러리를 교체를 통해 Virtualization을 적용하고
          대용량 파일{' '}
          <strong className="font-bold">렌더링 속도 90% 이상 개선</strong>, 다중
          워크시트 기능을 추가 개발하여 사용성 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Apache ECharts를 활용한{' '}
          <strong className="font-bold">데이터 정제 및 차트 시각화</strong> 기능
          개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          사용자 정의 변수와 사칙연산, 함수를 수식으로 입력하여 결과값을
          가져오는 Formula 기능 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          useState 기반의 폼 모달을{' '}
          <strong className="font-bold">react-hook-form</strong>으로
          리팩토링하여 코드 복잡도 및 유지보수성 개선
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  );
};

export default AtopDmsPage;
