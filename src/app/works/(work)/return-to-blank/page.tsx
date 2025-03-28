import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
import CustomList from '../../_container/CustomList'
import PartSubTitle from '../../_container/PartSubTitle'
import PartTitle from '../../_container/PartTitle'
import WorkImage from '../../_container/WorkImage'

const ReturnToBlankPage = () => {
  return (
    <>
      <PartTitle title={'View'} />

      <WorkImage
        url="https://www.youtube.com/watch?v=11Wplgnpt90"
        imgSrc="return-to-blank.png"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">🖌️ Return To Blank</span>

      <CustomList>
        <CustomList.MainListItem>
          졸업전시회 개인 인터랙티브아트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'컨셉'} />

      <span className="font-semibold">
        &quot;제자리걸음(Return to blank) &quot;
      </span>

      <span className="pl-1">
        단기기억을 장기기억으로 바꾸지 못하고 주기적으로 기억을 잃어버리는 현상,
        &quot;선행성 기억상실증[Anterograde amnesia] &quot;. 새로운 정보나
        경험을 완전히 받아들이지 못하고 돌아서는 순간 그 기억들이 사라지게 된다.
        계속해서 자신이 무엇을 하고 있었는지, 무엇을 하려고 했는지, 자신이 처한
        상환 판단조차 할 수 없고 머릿속은 백지상태[白紙狀態]로 돌아간다. 앞으로
        나아가지 못하고 현재에 머무르며 평생 &quot;제자리걸음 &quot;을 하는
        것이다.
        <br /> <br />
        [인터랙티브 아트] 자유롭게 그림을 그릴 수 있는 스크린이 있다. 붓을 들고
        그림을 그리는 것에만 온전히 집중하면 그림을 계속해서 그려나갈 수 있고
        물감의 잔상이 오랫동안 남아있을 것이다. 하지만 스크린에서 손을 떼는 순간
        그려지던 그림의 잔상들은 모두 사라지고 스크린 속에는 아무것도 남아있지
        않을 것이다. 인터랙티브 아트를 통해 계속해서 백지상태로 돌아가며 앞으로
        나아가지 못하고 제자리걸음을 하는 선행성 기억상실증을 표현하였다.
      </span>
      <PartSubTitle title={'실행 과정'} />
      <ul>
        <li>1) 사용자가 붓으로 천스크린을 누르는 동안 그림이 그려진다.</li>
        <li>2) 스크린에서 붓을 떼는 순간 그리던 그림이 사라진다.</li>
        <li>3) 백지상태로 돌아간다.</li>
      </ul>
      <PartSubTitle title={'기술 스택 및 사용 도구'} />

      <CustomList>
        <CustomList.MainListItem>Unity</CustomList.MainListItem>
        <CustomList.MainListItem>
          빔프로젝터, kinect v1, 패브릭 스크린
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'구현 기능'} />
      <CustomList>
        <CustomList.MainListItem>
          Unity vfx graph를 사용하여 파티클로 물감이 그려지는 것처럼 표현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Kinect v1 Depth 카메라를 통해 스크린에 가장 깊게 눌려진 위치와 손을
          떼었는지를 인식
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title={'Link'} />

      <Link
        href="https://www.youtube.com/watch?v=11Wplgnpt90"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <span>졸업전시회 시연 영상</span>
      </Link>
      <Link
        href="https://github.com/nijoow/return-to-blank"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-2 text-base text-white rounded-lg bg-purple-medium dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  )
}

export default ReturnToBlankPage
