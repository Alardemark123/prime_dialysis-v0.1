import { ServicesDetailSection } from '@/components/sections/ServicesDetailSection'

export const metadata = {
  title: 'Dialysis Services & Equipment - Prime Dialysis Center Inc',
  description: 'Comprehensive dialysis solutions including hemodialysis machines, water treatment systems, patient chairs, dialyzers, and 24/7 technical support services.',
}

export default function ServicesPage() {
  return (
    <div className="overflow-hidden">
      <ServicesDetailSection />
    </div>
  )
}