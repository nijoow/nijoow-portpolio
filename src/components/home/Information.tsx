import styles from '@styles/home/Home.module.css';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';
interface InformationProps {
  Icon: IconType;
  list: string;
  contents: string;
  link: string | null;
}
export default function Information({ Icon, list, contents, link }: InformationProps) {
  return (
    <div className={'flex w-full items-center'}>
      <div className={'flex items-center justify-start gap-1 flex-[2]'}>
        <Icon />
        <span>{list}</span>
      </div>
      <div className={'flex-[8] font-semibold text-lg'}>
        {link ? (
          <Link href={link} target="_blank" rel="noopener noreferrer" className={'text-purple-dark'}>
            {contents}
          </Link>
        ) : (
          <span>{contents}</span>
        )}
      </div>
    </div>
  );
}
