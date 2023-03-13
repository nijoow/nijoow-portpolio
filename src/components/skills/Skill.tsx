import { prefix } from '@config/config';
import { ISkillProps } from '@type/interface';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Skill = ({ fileName, name, constraintsRef }: ISkillProps) => {
  return (
    <motion.div
      drag
      dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
      dragConstraints={constraintsRef}
      dragSnapToOrigin
      whileHover={{ scale: 1.2 }}
      className="flex flex-col items-center col-span-6 gap-2 cursor-pointer sm:col-span-3"
    >
      <div
        className={`transition-all duration-300 rounded-lg overflow-hidden w-16 h-16 relative ${
          name === 'NEXT JS' ? 'dark:bg-purple-50 bg-transparent p-2' : ''
        }`}
      >
        <Image src={`${prefix}/images/skills/${fileName}`} alt={fileName} fill className={`pointer-events-none ${name === 'NEXT JS' ? 'p-1' : ''}`} />
      </div>
      <span className={'font-semibold'}>{name}</span>
    </motion.div>
  );
};
export default Skill;
