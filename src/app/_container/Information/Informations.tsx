import {
  BsFillCalendarEventFill,
  BsFillEnvelopeFill,
  BsFillPencilFill,
  BsGithub,
  BsPersonCircle,
} from 'react-icons/bs';
import InformationItem from './InformationItem';

const informationList = [
  { icon: <BsPersonCircle />, list: '이름', contents: '이우진', link: null },
  {
    icon: <BsFillCalendarEventFill />,
    list: '생년월일',
    contents: '1996.11.27',
    link: null,
  },
  {
    icon: <BsFillPencilFill />,
    list: '학력',
    contents: '부산대학교 디자인학과 디자인앤테크놀로지전공',
    link: null,
  },
  {
    icon: <BsFillEnvelopeFill />,
    list: '이메일',
    contents: 'nijoow1127@gmail.com',
    link: null,
  },
  {
    icon: <BsGithub />,
    list: '깃허브',
    contents: '@nijoow',
    link: 'https://github.com/nijoow',
  },
];

const Informations = () => {
  return (
    <div className="flex w-full flex-col gap-1">
      {informationList.map(({ icon, list, contents, link }) => (
        <InformationItem
          key={list}
          icon={icon}
          list={list}
          contents={contents}
          link={link}
        />
      ))}
    </div>
  );
};

export default Informations;
