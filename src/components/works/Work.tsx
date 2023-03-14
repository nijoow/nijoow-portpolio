import { prefix } from '@config/config';
import { IWorkImage } from '@type/interface';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const Work = ({ url, imgSrc }: IWorkImage) => {
  return (
    <div className={'max-w-3xl w-full relative pb-[56.25%] h-0 group overflow-hidden rounded-lg shadow-md'}>
      {!imgSrc ? <div className={''}>이미지가 없습니다</div> : <Image src={`${prefix}/images/works/${imgSrc}`} fill className={'object-contain'} alt={''} />}

      <Link
        href={url}
        target="_blank"
        className={`absolute inset-0 w-full h-full bg-black/70 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-all duration-300`}
      >
        <span className="flex items-center text-2xl text-white">
          사이트 바로가기 <FiChevronRight size={30} />
        </span>
      </Link>
    </div>
  );
};
export default Work;
