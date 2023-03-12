import { prefix } from '@config/config';
import { ISkill } from '@type/interface';
import Image from 'next/image';

const Skill = ({ fileName, name }: ISkill) => {
  return (
    <div className="flex flex-col items-center col-span-6 gap-2 sm:col-span-3">
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
export default Skill;
