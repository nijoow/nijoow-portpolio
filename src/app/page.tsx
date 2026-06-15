import SignatureHero from '@/components/ConceptA/SignatureHeroDynamic';
import ClassicHome from './_home/ClassicHome';
import HomeExperience from './_home/HomeExperience';

const HomePage = () => {
  return (
    <HomeExperience immersive={<SignatureHero />} classic={<ClassicHome />} />
  );
};

export default HomePage;
