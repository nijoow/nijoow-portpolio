import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';

const TreenowPage = () => {
  return (
    <>
      <WorkImage imgSrc="treenow.png" />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-gray-400">주식회사 비멕스(BMEKSCo. Ltd.)</span>
      <span className="text-xl font-bold">🌳 트리나우</span>

      <CustomList>
        <CustomList.MainListItem>
          B2B 조경 수목 거래 플랫폼 웹/하이브리드앱
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <TechStack
        stacks={[
          'React.js',
          'Typescript',
          'Recoil',
          'Tailwind CSS',
          'React-native(webview)',
        ]}
      />

      <PartSubTitle title={'주요 업무 및 성과'} />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">디자인 시스템</strong>을 고려한{' '}
          <strong className="font-bold">React/Typescript</strong> 기반{' '}
          <strong className="font-bold">
            프론트엔드 환경 설계 및 반응형 UI 개발
          </strong>
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          무통장입금, 본인인증, 전자계약 서명 등{' '}
          <strong className="font-bold">외부 API 연동</strong>을 통한 비즈니스
          로직 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">React-Native 웹뷰</strong>를 활용한{' '}
          <strong className="font-bold">
            하이브리드 앱 개발 및 앱스토어 심사·배포
          </strong>
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  );
};

export default TreenowPage;
