import { ContactInfo } from '@/components/sections/ContactInfo'
import { MapPlaceholder } from '@/components/sections/MapPlaceholder'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata = {
  title: 'Contact Us - Prime Dialysis Center Inc',
  description: 'Get in touch with Prime Dialysis Center Inc for dialysis equipment consultations, technical support, or sales inquiries. We\'re here to help 24/7.',
}

export default function ContactPage() {
  return (
    <div className="overflow-hidden">
      <ContactInfo />
      <div className="grid lg:grid-cols-2 px-8 container">
        <MapPlaceholder />
        <ContactForm />
      </div>
    </div>
  )
}