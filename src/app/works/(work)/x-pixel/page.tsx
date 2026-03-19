import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';

const XpixelPage = () => {
  return (
    <>
      <WorkImage url="https://x-pixel.vercel.app/" imgSrc="x-pixel.png" />

      <div className="my-3" />

      <PartTitle title={'Explanation'} />

      <span className="text-gray-400">X-Pixel</span>

      <span className="text-xl font-bold">🏠 X-Pixel 홈페이지</span>

      <CustomList>
        <CustomList.MainListItem> 🚧 개발 진행 중 🚧</CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title={'기술 스택'} />

      <TechStack stacks={['Next.js', 'Typescript', 'Tailwind CSS']} />

      <PartSubTitle title={'담당 역할'} />

      <CustomList>
        <CustomList.MainListItem>반응형 UI 개발</CustomList.MainListItem>
        <CustomList.MainListItem>
          Swiper를 사용하여 Carousel 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          framer-motion을 사용하여 애니메이션 구현
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  );
};

export default XpixelPage;
