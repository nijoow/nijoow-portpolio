import Image from 'next/image'

const GithubCommitLog = () => {
  return (
    <div className="relative w-full aspect-[648/141] bg-gray-600 rounded-lg sm:rounded-xl">
      <Image
        src="https://raw.githubusercontent.com/nijoow/nijoow/output/snake.svg"
        alt="Commit Snake Animation"
        fill
      />
    </div>
  )
}

export default GithubCommitLog
