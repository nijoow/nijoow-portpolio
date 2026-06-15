import ImmersiveExperience from '@/components/Immersive/ImmersiveExperienceDynamic';
import ClassicHome from './_home/ClassicHome';
import HomeExperience from './_home/HomeExperience';

const HomePage = () => {
  return (
    <HomeExperience
      immersive={<ImmersiveExperience />}
      classic={<ClassicHome />}
    />
  );
};

export default HomePage;
