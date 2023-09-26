import React from 'react'
import {
  BsPersonCircle,
  BsFillCalendarEventFill,
  BsGithub,
  BsFillEnvelopeFill,
  BsFillPencilFill,
  BsLink45Deg,
} from 'react-icons/bs'
import InformationItem from './InformationItem'

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
  {
    icon: <BsLink45Deg />,
    list: '프로필링크',
    contents: '@nijoow',
    link: 'https://prfl.link/@nijoow',
  },
]

const Informations = () => {
  return (
    <div className="flex flex-col w-full gap-1">
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
  )
}

export default Informations
