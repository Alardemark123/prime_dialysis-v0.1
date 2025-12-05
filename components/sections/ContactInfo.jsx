import { Phone, Mail, MapPin, Clock, Headphones, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { companyData } from '@/lib/mock-data/company'
import Link from 'next/link'

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    primary: [
      companyData.contact.phone[0], // First phone number
      companyData.contact.phone[1]  // Second phone number
    ],
    secondary: "24/7 Emergency Support",
  },
  {
    icon: Mail,
    title: "Email Support",
    primary: companyData.contact.email,
    secondary: companyData.contact.support,
    action: `mailto:${companyData.contact.email}`,
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    primary: companyData.contact.address.street,
    secondary: `${companyData.contact.address.city}, ${companyData.contact.address.state} ${companyData.contact.address.zip}`,
  },
]

const departments = [
  {
    icon: Users,
    title: "Sales Inquiries",
    email: companyData.contact.sales,
    description: "Product information, quotes, and purchasing",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    email: companyData.contact.support,
    description: "Installation, maintenance, and troubleshooting",
  },
  {
    icon: Mail,
    title: "General Information",
    email: companyData.contact.email,
    description: "Company information and general inquiries",
  },
]

export function ContactInfo() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Get in Touch with Our{' '}
            <span className="text-[#0372b9]">Expert Team</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you need technical support, product information, or want to discuss your 
            dialysis facility needs, our experienced team is here to help you every step of the way.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#0372b9]/10 flex items-center justify-center">
                <method.icon className="w-8 h-8 text-[#0372b9]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {method.title}
              </h3>

              {/* Handle multiple phone numbers */}
              {Array.isArray(method.primary) ? (
                method.primary.map((num, i) => (
                  <p key={i} className="text-[#0372b9] font-medium mb-1">
                    <Link href={`tel:${num.replace(/\D/g, '')}`}>{num}</Link>
                  </p>
                ))
              ) : (
                <p className="text-[#0372b9] font-medium mb-2">{method.primary}</p>
              )}

              {/* <p className="text-gray-500 text-sm mb-6">{method.secondary}</p> */}

              {method.action && (
                <Button 
                  variant="outline" 
                  className="text-[#0372b9] border-[#0372b9] hover:bg-[#0372b9] hover:text-white"
                  asChild
                >
                  <Link href={method.action} target="_blank">
                    Contact Now
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
