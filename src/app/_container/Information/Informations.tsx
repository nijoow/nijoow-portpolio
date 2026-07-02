'use client';

import { Calendar, Mail, Pencil, User } from 'lucide-react';
import { GithubIcon } from '@/components/Icons/GithubIcon';
import InformationItem from './InformationItem';

const informationList = [
  { icon: <User size={20} />, list: '이름', contents: '이우진', link: null },
  {
    icon: <Mail size={20} />,
    list: '이메일',
    contents: 'nijoow1127@gmail.com',
    link: null,
  },
  {
    icon: <Calendar size={20} />,
    list: '생년월일',
    contents: '1996.11.27',
    link: null,
  },
  {
    icon: <Pencil size={20} />,
    list: '학력',
    contents: '부산대학교 디자인학과 디자인앤테크놀로지전공',
    link: null,
  },
  {
    icon: <GithubIcon size={20} />,
    list: '깃허브',
    contents: '@nijoow',
    link: 'https://github.com/nijoow',
  },
];

const Informations = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:grid-cols-2 sm:gap-5 sm:p-6">
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
