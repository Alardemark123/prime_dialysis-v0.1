import { CompanyProfile } from '@/components/sections/CompanyProfile'
import { MissionVision } from '@/components/sections/MissionVision'
import { ArticlePreview } from '@/components/sections/ArticlePreview'

export const metadata = {
  title: 'About Us - Prime Dialysis Center Inc',
  description: 'Learn about Prime Dialysis Center Inc, our mission to revolutionize dialysis care, and our commitment to improving patient outcomes through innovative technology.',
}
 
export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <CompanyProfile />
      {/* <MissionVision /> */}
      {/* <ArticlePreview /> */}
    </div>
  )
}