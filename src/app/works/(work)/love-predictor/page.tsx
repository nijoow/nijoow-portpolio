import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import WorkImage from '../../_container/WorkImage';

const LovePredictorPage = () => {
  return (
    <>
      <WorkImage
        url="https://ai-love-predictor.vercel.app/"
        imgSrc="ai-love-predictor.png"
      />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-xl font-bold">💓 너는 솔로? 그것이 알고싶다!</span>

      <CustomList>
        <CustomList.MainListItem>
          질문 응답을 통해 연애 확률 예측 결과를 보여주는 테스트
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          스터디용 사이드 프로젝트
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          기획 미완성, 프론트엔드만 임시로 제작해서 배포
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <CustomList>
        <CustomList.MainListItem>
          Next.js, Typescript, Jotai, Tailwind CSS
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'역할'} />

      <CustomList>
        <CustomList.MainListItem>기획 참여 </CustomList.MainListItem>
        <CustomList.MainListItem>디자인에 따른 UI구현 </CustomList.MainListItem>
        <CustomList.MainListItem>
          질문 응답 테스트 기능 구현
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title={'Link'} />
      <Link
        href="https://ai-love-predictor.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-lg bg-purple-medium px-5 py-2 text-base text-white dark:bg-purple-regular"
      >
        <span>사이트 바로가기</span>
      </Link>
      <Link
        href="https://github.com/nijoow/ai-love-predictor-front"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-purple-medium px-5 py-2 text-base text-white dark:bg-purple-regular"
      >
        <BsGithub />
        <span>Github</span>
      </Link>
    </>
  );
};

export default LovePredictorPage;
