import { Target, Eye, Heart, Lightbulb } from "lucide-react"

export function MissionVision() {
  return (
    <section className="py-24 bg-slate-50 text-slate-800">
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
        <div className="fade-in">
          <h3 className="text-3xl font-bold text-[#0372b9] text-center mb-12">
            Our Core Values
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quality Care",
                description:
                  "We provide safe, effective, and compassionate dialysis services for every patient.",
                icon: Heart,
                gradient: "from-[#3ab54a] to-[#0372b9]"
              },
              {
                title: "Integrity",
                description:
                  "We uphold honesty, transparency, and accountability in every aspect of care.",
                icon: Lightbulb,
                gradient: "from-[#0372b9] to-[#3ab54a]"
              },
              {
                title: "Excellence",
                description:
                  "We continuously improve our skills, systems, and facilities to exceed expectations.",
                icon: Target,
                gradient: "from-[#0372b9] to-[#3ab54a]"
              },
              {
                title: "Compassion",
                description:
                  "We treat every patient with empathy, dignity, and respect.",
                icon: Heart,
                gradient: "from-[#3ab54a] to-[#0372b9]"
              }
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} p-0.5`}
                  >
                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[#0372b9]" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-[#0372b9] transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Leadership Quote */}
        <div className="mt-20 bg-[#0372b9]/5 rounded-2xl border border-[#0372b9]/20 p-12 text-center">
          <blockquote className="text-xl italic text-slate-700 mb-6 max-w-4xl mx-auto leading-relaxed">
            "At Prime Dialysis Center, we don’t just provide dialysis — we provide hope
            and healing with every treatment session."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#0372b9]/20 flex items-center justify-center">
              <span className="text-[#0372b9] font-bold">GO</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-800">
                Dr. Gjay Ordinal
              </div>
              <div className="text-sm text-slate-500">Medical Director</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
