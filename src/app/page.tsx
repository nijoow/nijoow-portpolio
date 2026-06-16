import IntroExperience from '@/components/Immersive/IntroExperienceDynamic';
import ClassicHome from './_home/ClassicHome';
import HomeExperience from './_home/HomeExperience';

const HomePage = () => {
  return (
    <HomeExperience immersive={<IntroExperience />} classic={<ClassicHome />} />
  );
};

export default HomePage;
