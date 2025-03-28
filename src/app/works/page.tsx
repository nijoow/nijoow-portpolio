import Section from '@/components/Section/Section'
import Link from 'next/link'
import WorkTags from './_container/WorkTags'
import WorksList from './_container/WorksList'

const WorksPage = () => {
  return (
    <Section>
      <div className="w-full flex flex-col gap-0.5">
        <Link href="/works" className="text-2xl font-bold">
          Works
        </Link>
        <div className="w-full h-[2px] bg-gray-dark dark:bg-white rounded-full" />
      </div>
      <WorkTags />
      <WorksList />
    </Section>
  )
}

export default WorksPage
