import CustomList from '../../_container/CustomList'
import PartSubTitle from '../../_container/PartSubTitle'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'

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

      <CustomList>
        <CustomList.MainListItem>
          React.js, Typescript, Recoil, Tailwind CSS, React-native(webview)
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'팀구성'} />

      <CustomList>
        <CustomList.MainListItem>
          PM 1, 프론트엔드 1, 백엔드 1, 디자이너 1
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'역할'} />

      <CustomList>
        <CustomList.MainListItem>
          React 프로젝트 세팅 및 반응형 SPA 개발(유저/어드민 페이지)
        </CustomList.MainListItem>
        <CustomList.MainListItem>외부 서비스 연동</CustomList.MainListItem>
        <CustomList.SubListItem>
          무통장입금 결제 / 휴대폰 본인인증 / 문서 작성, 서명 및 조회 / 인증서
          등록 / 세금계산서 조회{' '}
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          React-Native 웹뷰를 사용한 하이브리드앱 개발 및 빌드
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          구글 플레이 스토어/애플 앱스토어 앱 배포
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          firebase cloud messaging 앱 푸시알림 기능 구현
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  )
}

export default TreenowPage
