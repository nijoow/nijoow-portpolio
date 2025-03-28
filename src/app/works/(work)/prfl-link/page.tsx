import CustomList from '../../_container/CustomList'
import PartSubTitle from '../../_container/PartSubTitle'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'

const PrflLinkPage = () => {
  return (
    <>
      <PartTitle title={'View'} />

      <WorkImage imgSrc="prflLink.png" />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">🔗 프로필링크 (prfl.link)</span>

      <CustomList>
        <CustomList.MainListItem>
          다양한 링크 한 페이지에서 볼 수 있는 멀티링크 연결 서비스
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'역할'} />

      <CustomList>
        <CustomList.MainListItem>
          서비스 내 테마 페이지 디자인
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          svg를 활용한 테마 페이지 퍼블리싱
        </CustomList.MainListItem>
        <CustomList.MainListItem> 로고 제작</CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  )
}

export default PrflLinkPage
