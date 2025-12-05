'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { servicesData } from '@/lib/mock-data/services'
import Link from 'next/link'
import Image from 'next/image'

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  const categories = ['All', ...new Set(servicesData.map(service => service.category))]
  
  const filteredServices = activeCategory === 'All' 
    ? servicesData 
    : servicesData.filter(service => service.category === activeCategory)

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Dialysis Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From state-of-the-art dialysis machines to comprehensive support services, 
            we provide everything healthcare facilities need for superior patient care.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredServices.map((service, index) => (
            <div 
              key={service.id}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 scale-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {service.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-[#3ab54a] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <Link href="/services">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-card rounded-2xl border border-border p-12 shadow-glow-accent">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">
            Ready to Upgrade Your Dialysis Facility?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our experts help you choose the perfect dialysis solutions for your facility. 
            Get a personalized consultation and competitive pricing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#3ab54a] hover:bg-[#3ab54a]/90 text-white"
              asChild
            >
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link href="/services">View All Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}