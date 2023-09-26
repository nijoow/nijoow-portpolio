import Link from 'next/link'

interface InformationProps {
  icon: JSX.Element
  list: string
  contents: string
  link: string | null
}

export default function Information({
  icon,
  list,
  contents,
  link,
}: InformationProps) {
  return (
    <div className={'flex w-full items-center'}>
      <div
        className={
          'flex items-center justify-start gap-1 flex-[3] sm:flex-[2] font-semibold text-sm'
        }
      >
        {icon}
        <span>{list}</span>
      </div>
      <div className={'flex-[7] sm:flex=[8] font-semibold text-sm sm:text-lg'}>
        :{' '}
        {link ? (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={'text-purple-medium dark:text-purple-light '}
          >
            {contents}
          </Link>
        ) : (
          <span>{contents}</span>
        )}
      </div>
    </div>
  )
}
