"use client";

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { branchLocations } from '@/lib/branchLocatorModule'
// import { useMemo } from 'react'
import MockupGridVertical from '../MockupGridVertical'
import HeroSlider from '../HeroSlider'







export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % branchLocations.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // useEffect(() => {
  //   const container = document.querySelector('#mockup-container');
  //   if (container) {
  //     container.scrollTo({
  //       top: currentIndex * (200 + 50),
  //       behavior: 'smooth'
  //     });
  //   }
  // }, [currentIndex]);
  


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-[-60px] bg-gradient-to-br from-white via-white to-[#0372b9]/5">
      
{/* DITO ang Mockup Grid animation */}
            <div className="absolute inset-0 overflow-hidden -z-10 hidden md:block">
                <MockupGridVertical branchLocations={branchLocations} currentIndex={currentIndex} />
            </div>


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="text-left fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#3ab54a]/10 text-[#3ab54a] border border-[#3ab54a]/20 mb-6">
              <CheckCircle className="w-4 h-4 mr-2 text-[#3ab54a]" />
              <span className="text-sm font-medium">Trusted by Patients Nationwide</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0372b9] leading-tight mb-6">
              Quality{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0372b9] to-[#3ab54a]">
                Dialysis Care
              </span>{' '}
              Beyond Compare
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Prime Dialysis Center Inc. operates dialysis centers across the Philippines, providing
              compassionate and high-quality hemodialysis services for patients with advanced
              kidney failure. Our mission is to deliver <strong>“Quality Dialysis Beyond Compare”</strong>
              — ensuring safety, comfort, and care for every patient we serve.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-[#0372b9] hover:bg-[#03629d] text-white shadow-lg shadow-[#0372b9]/30"
                asChild
              >
                <Link href="/map-branches">
                See Branches
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-[#0372b9] text-[#0372b9] hover:bg-[#0372b9] hover:text-white"
                asChild
              >
                <Link href="/services ">Explore Services <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#0372b9] text-[#0372b9] hover:bg-[#0372b9] hover:text-white"
                asChild
              >
                <Link href="/careers "> Join the team <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#0372b9] mb-1">3</div>
                <div className="text-sm text-gray-600">Branches Nationwide</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#0372b9] mb-1">1000+</div>
                <div className="text-sm text-gray-600">Patients Served</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#0372b9] mb-1">100%</div>
                <div className="text-sm text-gray-600">PhilHealth Accredited</div>
              </div>
              {/* <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#0372b9] mb-1">15</div>
                <div className="text-sm text-gray-600">Dialysis Stations</div>
              </div> */}
            </div>
          </div>

          
         {/* Hero Image */}
        <HeroSlider branchLocations={branchLocations} />


        </div>
      </div>

    
    </section>
  )
}
