import { Shield, Award, Users, HeartPulse } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Shield,
    title: "Quality Dialysis Beyond Compare",
    description:
      "Our guiding philosophy reflects our promise to deliver safe, reliable, and compassionate dialysis care to every patient.",
  },
  {
    icon: Award,
    title: "Modern, High-Quality Equipment",
    description:
      "Each facility is equipped with brand-new, state-of-the-art hemodialysis machines designed for efficiency, safety, and comfort.",
  },
  {
    icon: Users,
    title: "Professional and Trained Personnel",
    description:
      "Experienced nurses and doctors provide personalized care, ensuring every treatment is conducted with precision and compassion.",
  },
  {
    icon: HeartPulse,
    title: "Comfort and Accessibility",
    description:
      "Our dialysis centers are clean, spacious, fully air-conditioned, and PhilHealth-accredited — with added patient benefits in select branches.",
  },
];

export function IntroSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0372b9]/5 to-[#3ab54a]/5 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0372b9] mb-4">
            Why Choose <span className="text-[#3ab54a]">Prime Dialysis Center Inc.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Prime Dialysis Center Inc. is dedicated to providing{" "}
            <strong>quality dialysis care beyond compare</strong>. As part of the{" "}
            <strong>Nephro Group of Dialysis Centers</strong>, we combine advanced
            technology, professional expertise, and patient-centered values to
            improve the quality of life for individuals with kidney disease
            across the Philippines.
          </p>
        </div>

        {/* About + Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="slide-up">
            <h3 className="text-2xl font-bold text-[#0372b9] mb-6">
              Committed to Excellence in Renal Care
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              At Prime Dialysis Center Inc., our approach goes beyond treatment — it’s
              about restoring comfort, trust, and dignity to every patient. We
              operate modern dialysis centers equipped with advanced technology
              and supported by trained healthcare professionals, ensuring each
              session is delivered with care and precision.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#3ab54a] mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#0372b9] mb-1">
                    Patient-Focused Approach
                  </h4>
                  <p className="text-sm text-gray-600">
                    Treatments are carefully arranged and supervised by
                    nephrology consultants to meet individual patient needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#3ab54a] mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#0372b9] mb-1">
                    Accredited and Accessible
                  </h4>
                  <p className="text-sm text-gray-600">
                    All centers are PhilHealth-accredited, helping patients
                    access affordable and reliable dialysis treatment.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#3ab54a] mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#0372b9] mb-1">
                    Added Patient Benefits
                  </h4>
                  <p className="text-sm text-gray-600">
                    Select branches offer free monthly laboratory services,
                    complimentary high-flux dialyzers, and free EPO injections
                    for added patient care value.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/images/equipment.png"
                alt="Prime Dialysis Center Dialysis Center"
                className="w-full h-[400px] object-cover"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0372b9]/30 to-[#3ab54a]/20" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg hover:shadow-[#0372b9]/20 transition-all duration-300 scale-hover"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#0372b9]/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-[#0372b9]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0372b9] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
