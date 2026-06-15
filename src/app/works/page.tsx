import WorksGallery from '@/components/WorksGallery/WorksGalleryDynamic';
import ClassicWorks from './_works/ClassicWorks';
import WorksExperience from './_works/WorksExperience';

const WorksPage = () => {
  return (
    <WorksExperience immersive={<WorksGallery />} classic={<ClassicWorks />} />
  );
};

export default WorksPage;
