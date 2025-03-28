import CustomList from '../../_container/CustomList'
import PartSubTitle from '../../_container/PartSubTitle'
import PartTitle from '../../_container/PartTitle'
import WorkCarousel from '../../_container/WorkCarousel'

const AtopDmsPage = () => {
  return (
    <>
      <PartTitle title={'View'} />
      <WorkCarousel
        imgSrcList={[
          'atop-dms/main.png',
          'atop-dms/excel.png',
          'atop-dms/risk-matrix.png',
          'atop-dms/chart.png',
          'atop-dms/formula.png',
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

      <CustomList>
        <CustomList.MainListItem>
          Next.js, Typescript, Recoil, React-Query, Material UI
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'담당 역할'} />

      <CustomList>
        <CustomList.MainListItem>
          Excel 데이터를 웹에 표시하고, 셀을 선택하여 Database에 저장하는 기능
          개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          데이터를 정제하여 차트(Apache EChart)로 시각화하는 기능 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>form 모달 개선 작업</CustomList.MainListItem>
        <CustomList.MainListItem>
          데이터베이스 필터 기능 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          변수 설정과 사칙연산 및 함수를 수식으로 입력하여 결과 값을 가져오는
          Formula 기능 개발
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'성과 및 배운점'} />

      <CustomList>
        <CustomList.MainListItem>
          진행중인 프로젝트에 참여하여 업무를 분담하고 데모를 위한 MVP 개발에
          기여
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          react-spreadsheet로 구현된 Excel 관련 기능을 MUI-Datagrid로 변경하여
          사용성 및 성능 개선
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          Virtualization을 적용하여 용량이 큰 엑셀 파일에 대한 렌더링 문제 개선
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          엑셀의 첫 번째 워크시트만 불러오던 기능을, 전체 워크시트의 데이터를
          관리할 수 있도록 수정하여 사용성 개선{' '}
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          useState로 만들어진 모달을 react-hook-form으로 변경하여 모달 사용성 및
          코드 개선{' '}
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          라이브러리의 코드를 커스텀하여 복잡한 기능 개발
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  )
}

export default AtopDmsPage
