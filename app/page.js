import { HeroSection } from '@/components/sections/HeroSection'
import { IntroSection } from '@/components/sections/IntroSection'


export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <IntroSection />
    </div>
  )
}