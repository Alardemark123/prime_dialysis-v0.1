'use client'

import { Building2, Users, Globe, Calendar, Activity, Target, Eye, Heart, Lightbulb, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"


const profileStats = [
  {
    icon: Calendar,
    label: "Established",
    value: "N/A"
  },
  {
    icon: Building2,
    label: "Headquarters",
    value: "Philippines"
  },
  {
    icon: Users,
    label: "Team Members",
    value: "101–500"
  },
  {
    icon: Globe,
    label: "Clinic Locations",
    value: "Multiple nationwide"
  }
]

export const AccreditationGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)


  const images = [
    '/assets/certificates/one.jpg',
    '/assets/certificates/two.jpg',
    '/assets/certificates/three.jpg',
    '/assets/certificates/four.jpg',
    '/assets/certificates/five.jpg',
    '/assets/certificates/six.jpg',
  ]

  return (
    <div className="rounded-2xl p-6 sm:p-12 text-center">
      <h3 className="text-2xl font-bold text-[#0372b9] mb-6 sm:mb-8">
        Accreditation & Commitment
      </h3>

      <p className="text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base">
        Our facilities and team are certified by trusted institutions to ensure
        quality hemodialysis care and patient safety.
      </p>

      {/* GALLERY */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6 max-w-6xl mx-auto">
        {images.map((src, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => setSelectedImage(src)}
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] overflow-hidden">
              <Image
                src={src}
                alt={`Certificate ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX PREVIEW */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-auto"
            onClick={(e) => e.stopPropagation()} // prevent close on image click
          >
            <Image
              src={selectedImage}
              alt="Certificate preview"
              width={1000}
              height={1000}
              className="w-auto max-w-full h-auto max-h-[85vh] rounded-lg shadow-lg object-contain"
            />
            <button
              className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full px-3 py-1 text-slate-800 font-semibold text-sm shadow"
              onClick={() => setSelectedImage(null)}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export function CompanyProfile() {
  return (
    <section className="py-24 bg-slate-50 text-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Company Story */}
          <div className="slide-up ">
        
             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0372b9] leading-tight mb-6">
              Our{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0372b9] to-[#3ab54a]">
                Company
              </span>
            </h1>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                It is a 100% Filipino-owned and managed Hemodialysis provider 
                company, reflecting its commitment to advancing local 
                healthcare services and contributing to the nation’s long-term 
                health development agenda.
              </p>
              <p>
                Currently operating 24 Hemodialysis Centers nationwide, and still growing.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                  {/* Daily treatments */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#e8f9ee] to-[#dfffe8] border border-[#3ab54a]/30 text-[#043915] shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3ab54a]/20 text-[#3ab54a]">
                      <Activity size={28} />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-[#3ab54a] leading-tight">1K+</h3>
                      <p className="text-sm font-medium text-slate-600">Treatments Daily</p>
                    </div>
                  </div>

                  {/* Yearly treatments */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#e8f9ee] to-[#dfffe8] border border-[#3ab54a]/30 text-[#043915] shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3ab54a]/20 text-[#3ab54a]">
                      <Calendar size={28} />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-[#3ab54a] leading-tight">26K+</h3>
                      <p className="text-sm font-medium text-slate-600">Treatments Yearly</p>
                    </div>
                  </div>
                </div>
               </div>
          </div>

          {/* Company Image */}
          <div className="relative slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/dialysis-solutions/image-5.png"
                alt="Prime Dialysis Center Inc Facility"
                width={500}
                height={500}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0372b9]/20 to-[#3ab54a]/10" />

              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-[#3ab54a]" />
                <span className="text-sm font-medium text-[#0372b9]">
                  Accredited by PhilHealth
                </span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#0372b9]">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Guided by compassion, excellence, and commitment to quality care, we
              aim to provide world-class dialysis services for every Filipino in
              need.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-all duration-300 slide-up">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#0372b9]/10 flex items-center justify-center mr-4">
                  <Target className="w-7 h-7 text-[#0372b9]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Our Mission</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
              To provide a sustainable hemodialysis program through dynamic 
  collaboration with National, Local, and Provincial Government Units 
  and Local Healthcare Providers.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-all duration-300 slide-up">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#3ab54a]/10 flex items-center justify-center mr-4">
                  <Eye className="w-7 h-7 text-[#3ab54a]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Our Vision</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
              To be the leading hemodialysis center provider in the Philippines by the 
              year 2030.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="fade-in max-w-4xl mx-auto py-12">
            {/* Title */}
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-[#0372b9] inline-block relative px-6">
                Our Core Values
                <span className="absolute left-0 right-0 -bottom-3 h-0.5 bg-gradient-to-r from-transparent via-[#3ab54a] to-transparent"></span>
              </h3>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Quality Care",
                  description: "We provide safe, effective, and compassionate dialysis services for every patient.",
                  icon: Heart,
                  gradient: "from-[#3ab54a] to-[#0372b9]"
                },
                {
                  title: "Integrity",
                  description: "We uphold honesty, transparency, and accountability in every aspect of care.",
                  icon: Lightbulb,
                  gradient: "from-[#0372b9] to-[#3ab54a]"
                },
                {
                  title: "Excellence",
                  description: "We continuously improve our skills, systems, and facilities to exceed expectations.",
                  icon: Target,
                  gradient: "from-[#0372b9] to-[#3ab54a]"
                },
                {
                  title: "Compassion",
                  description: "We treat every patient with empathy, dignity, and respect.",
                  icon: Heart,
                  gradient: "from-[#3ab54a] to-[#0372b9]"
                }
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group border border-slate-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${value.gradient} p-1`}>
                      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                        <value.icon className="w-5 h-5 text-[#0372b9]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-[#0372b9] transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        

        {/* Certifications */}
        <AccreditationGallery />

      </div>
    </section>
  )
}
