'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { managementTeam } from "@/lib/managementData"

export function OurTeam() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative py-12 px-6 sm:px-12 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1.5 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"></div>
            
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight italic">
                Advancing <span className="text-brand-primary">Cardiovascular Care</span> Through Innovation
              </h2>
              
              <p className="text-xl text-gray-700 font-medium italic">
                Your heart health is our top priority.
              </p>
              
              <div className="h-0.5 w-16 bg-gradient-to-r from-gray-200 to-transparent mx-auto my-6"></div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                With every 
                <span className="relative mx-1">
                  <span className="relative z-10 font-semibold text-brand-primary italic">heartbeat</span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-brand-accent/20 -z-0 transform -rotate-1"></span>
                </span>, 
                every <span className="relative mx-1">
                  <span className="relative z-10 font-semibold text-brand-primary italic">treatment</span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-brand-accent/20 -z-0 transform -rotate-1"></span>
                </span>, 
                every <span className="relative mx-1">
                  <span className="relative z-10 font-semibold text-brand-primary italic">breakthrough</span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-brand-accent/20 -z-0 transform -rotate-1"></span>
                </span>, 
                and every <span className="relative mx-1">
                  <span className="relative z-10 font-semibold text-brand-primary italic">life </span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-brand-accent/20 -z-0 transform -rotate-1"></span>
                </span> 
                we touch, we're committed to excellence in cardiovascular care.
              </p>
            </div>
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-1.5 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"></div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white via-[#f8fafc] to-white">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #0372b9 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-[1600px] mx-auto px-6">
          {/* === Vision of Our Founder === */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Accent bar */}
              <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#0372b9] to-[#3ab54a] rounded-full hidden lg:block" />

              <h2 className="font-sans text-4xl font-bold text-[#0372b9] mb-6 text-center lg:text-left">
                <p className="mb-4 text-gray-700">VISION OF OUR FOUNDER</p>
                <span className="text-[#3ab54a] font-semibold">MR. {managementTeam.map((teamMember) => teamMember.name)[0]}</span>
              </h2>

              <p className="text-base text-gray-700 mb-6 leading-relaxed">
                <span className="font-bold italic text-[#3ab54a] bg-[#f0fdf4] px-2 py-1 rounded">
                Facere lorem aliquam quod est enim fugit do omnis dolor anim labore veniam
                </span>
              </p>

              <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Facere lorem aliquam quod est enim fugit do omnis dolor anim labore veniam Facere lorem aliquam quod est enim fugit do omnis dolor anim labore veniamFacere lorem aliquam quod est enim fugit do omnis dolor anim labore veniamFacere lorem aliquam quod est enim fugit do omnis dolor anim labore veniam.
              </p>

              <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Facere lorem aliquam quod est enim fugit do omnis dolor anim labore veniamFacere lorem aliquam quod est enim fugit do omnis dolor anim labore veniam
              </p>

              <p className="text-base text-gray-600 leading-relaxed">
              Facere lorem aliquam quod est enim fugit do omnis dolor anim labore veniamFacere lorem aliquam quod est enim fugit do omnis dolor anim labore veniamFacere lorem aliquam quod est enim fugit do omnis dolor anim labore veniam
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-xl"
              style={{
                boxShadow: '15px 15px 30px -5px rgba(3, 114, 185, 0.15)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0372b9]/30 to-transparent z-10" />
              <div className="absolute inset-0 border-4 border-white/20 rounded-3xl pointer-events-none" />
              <Image
                src={managementTeam.map((teamMember) => teamMember.img)[0]}
                alt="Prime Dialysis Center Founder"
                width={500}
                height={500}
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>






      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-[1800px] mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">The Management Team</h2>
            <p className="text-gray-500 mt-2">Meet the leaders behind Prime Dialysis Center commitment to quality healthcare</p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {managementTeam.map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-3xl"
              >
                {/* Image */}
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-[560px] object-cover transform group-hover:scale-105 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-90"></div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 text-white">
                  <h3 className="text-[25px] font-semibold">{person.name}</h3>
                  <p className="text-sm opacity-80">{person.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-[1800px] mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">The Management Team</h2>
            <p className="text-gray-500 mt-2">Meet the leaders behind Prime Dialysis Center commitment to quality healthcare</p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {managementTeam.map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-3xl"
              >
                {/* Image */}
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-[560px] object-cover transform group-hover:scale-105 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-90"></div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 text-white">
                  <h3 className="text-[25px] font-semibold">{person.name}</h3>
                  <p className="text-sm opacity-80">{person.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      
    </div>
  );
}
