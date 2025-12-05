"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import { servicesData } from "@/lib/mock-data/services";
import Link from "next/link";
import Image from "next/image";

export function ServicesDetailSection() {
  const [activeService, setActiveService] = useState(servicesData[0]);
  const categories = [
    ...new Set(servicesData.map((service) => service.category)),
  ];

  return (
    <section className="py-16 bg-white text-gray-800 w-full">
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#3ab54a]/10 text-[#3ab54a] hover:bg-[#3ab54a]/20">
            Our Services & Equipment
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0372b9] mb-6">
            Comprehensive{" "}
            <span className="text-[#3ab54a]">Dialysis Solutions</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From state-of-the-art equipment to comprehensive support services,
            we provide everything healthcare facilities need for superior
            patient care and operational excellence.
          </p>
        </div>

        {/* Service Categories */}
        <Tabs defaultValue={categories[0]} className="mb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}{" "}
            <div className="lg:w-1/4">
              {" "}
              <TabsList className="flex flex-col h-auto w-full p-1 bg-muted">
                {" "}
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="w-full justify-start text-left data-[state=active]:bg-[#0372b9]/10 data-[state=active]:text-[#0372b9] rounded-md px-3 py-2 hover:bg-gray-100 transition"
                  >
                    {" "}
                    {category}{" "}
                  </TabsTrigger>
                ))}{" "}
              </TabsList>{" "}
            </div>
            {/* Content */}
            <div className="lg:w-3/4">
              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid gap-8">
                    {servicesData
                      .filter((service) => service.category === category)
                      .map((service) => (
                        <div
                          key={service.id}
                          className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <div className="grid lg:grid-cols-2">
                            {/* Image */}
                            <div className="relative h-64 lg:h-auto">
                              <Image
                                src={service.image}
                                alt={service.title}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-white/90 text-[#0372b9] border border-[#0372b9]/20">
                                  {service.category}
                                </Badge>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="pt-8 pb-8 pr-4 pl-4">
                              <h3 className="text-2xl font-bold text-[#0372b9] mb-4">
                                {service.title}
                              </h3>
                              <p className="text-gray-600 mb-6 leading-relaxed">
                                {service.description}
                              </p>

                              {/* Features */}
                              <div className="space-y-6 mb-8">
                                {service.features?.map((featureGroup, i) => (
                                  <div key={i}>
                                    <h4 className="text-[15px] font-semibold text-[#59AC77] mb-2">
                                      <span className="bg-[#59AC77]/10 px-2 py-1 rounded-full">{featureGroup.title}</span>
                                    </h4>

                                    {/* Level 1 Requirements */}
                                    <ul className="space-y-2 ml-4">
                                      {featureGroup.requirements?.map((req, j) =>
                                        typeof req === "string" ? (
                                          <li
                                            key={j}
                                            className="flex items-start text-gray-700 text-[13px]"
                                          >
                                            <CheckCircle2 className="w-4 h-4 text-[#3ab54a] mr-2 mt-[2px] flex-shrink-0" />
                                            <span>{req}</span>
                                          </li>
                                        ) : (
                                          // ✅ Nested group (has title + items array)
                                          <li key={j} className="mt-3">
                                      <p className="font-medium text-[#043915] mb-1 text-[13px]">
                                        {req.title}
                                      </p>

                                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 ml-6">
                                        {req.items?.map((sub, k) => (
                                          <li
                                            key={k}
                                            className="flex items-start text-gray-700 text-[13px]"
                                          >
                                            <CheckCircle2 className="w-4 h-4 text-[#3ab54a] mr-2 mt-[2px] flex-shrink-0" />
                                            <span className="break-words leading-snug">
                                              {sub}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </li>


                                        )
                                      )}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                              {/* Buttons */}
                              <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                  className="bg-[#0372b9] hover:bg-[#0363a3] text-white flex-1"
                                  asChild
                                >
                                  <Link href="/contact">
                                    Request Quote
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-[#3ab54a] text-[#3ab54a] hover:bg-[#3ab54a]/10 flex-1"
                                  asChild
                                >
                                  <Link href="/contact">Learn More</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </div>


          </div>
        </Tabs>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-[#0372b9] mb-12">
            Why Healthcare Providers Choose Our Solutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: "Proven Excellence",
                description:
                  "15,000+ machines deployed worldwide with exceptional performance records",
              },
              {
                icon: Shield,
                title: "Safety First",
                description:
                  "Advanced safety protocols and comprehensive monitoring systems",
              },
              {
                icon: Zap,
                title: "Latest Technology",
                description:
                  "Cutting-edge features including AI monitoring and IoT integration",
              },
              {
                icon: Users,
                title: "Expert Support",
                description:
                  "24/7 technical support and comprehensive training programs",
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#0372b9]/10 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-[#0372b9]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white border border-gray-200 rounded-2xl p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-[#0372b9] mb-4">
            Ready to Transform Your Dialysis Facility?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our experts are ready to help you choose the perfect dialysis
            solutions for your facility. Get personalized recommendations and
            competitive pricing tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              size="lg"
              className="bg-[#3ab54a] hover:bg-[#349d41] text-white"
              asChild
            >
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#0372b9] text-[#0372b9] hover:bg-[#0372b9]/10"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            ✓ Free consultation • ✓ Custom solutions • ✓ Competitive pricing
          </div>
        </div>
      </div>
    </section>
  );
}
