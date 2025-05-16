import Image from 'next/image';

const GithubCommitLog = () => {
  return (
    <div className="relative aspect-[648/141] w-full rounded-lg bg-gray-600 sm:rounded-xl">
      <Image
        src="https://raw.githubusercontent.com/nijoow/nijoow/output/snake.svg"
        alt="Commit Snake Animation"
        fill
      />
    </div>
  );
};

export default GithubCommitLog;
