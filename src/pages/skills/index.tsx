import styles from '@styles/skills/Skills.module.css';
import { prefix } from '@config/config';
import Head from 'next/head';
import { skillsEtc, skillsFront } from '@data/skills';
import Image from 'next/image';
import Section from '@components/section/section';
import SubTitle from '@components/_common/SubTitle';
interface SkillProps {
  fileName: string;
  name: string;
}
export default function Skills() {
  const Skill = ({ fileName, name }: SkillProps) => {
    return (
      <div className="col-span-6 sm:col-span-3 flex flex-col gap-2 items-center">
        <div
          className={`transition-all duration-300 rounded-lg overflow-hidden w-16 h-16 relative ${
            name === 'NEXT JS' ? 'dark:bg-purple-50 bg-transparent p-2' : ''
          }`}
        >
          <Image src={`${prefix}/images/skills/${fileName}`} alt={fileName} fill className={`${name === 'NEXT JS' ? 'p-1' : ''}`} />
        </div>
        <span className={'font-semibold'}>{name}</span>
      </div>
    );
  };
  return (
    <>
      <Head>
        <title>Skill</title>
      </Head>
      <Section>
        <SubTitle title="Front-End Skills" />
        <div className={'grid grid-cols-12 w-full mt-4 mb-8'}>
          {skillsFront.map((skill) => {
            return <Skill key={skill.name} name={skill.name} fileName={skill.fileName} />;
          })}
        </div>
      </Section>
      <Section>
        <SubTitle title="Etc Skills" />
        <div className={'grid grid-cols-12 w-full mt-4 mb-8'}>
          {skillsEtc.map((skill) => {
            return <Skill key={skill.id} name={skill.name} fileName={skill.fileName} />;
          })}
        </div>
      </Section>
    </>
  );
}
