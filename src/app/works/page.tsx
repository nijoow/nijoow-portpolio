import WorksWall from '@/components/WorksGallery/WorksWallDynamic';
import ClassicWorks from './_works/ClassicWorks';
import WorksExperience from './_works/WorksExperience';

const WorksPage = () => {
  return (
    <WorksExperience immersive={<WorksWall />} classic={<ClassicWorks />} />
  );
};

export default WorksPage;
