'use client'
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Home,
  Info,
  Stethoscope,
  Newspaper,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { branchLocations } from "@/lib/branchLocatorModule";
import { motion } from "framer-motion";

// ---------------- NAV LINKS ----------------
const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: Stethoscope },
  { name: "Articles", href: "/articles", icon: Newspaper },
  { name: "Contact", href: "/contact", icon: Phone },
];

// ---------------- CONTACT INFO ----------------
import { useState } from 'react';
import { BranchContactCard } from '../BranchContactCard';

export const ContactInfo = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleBranches = showAll ? branchLocations : branchLocations.slice(0, 2);
  const hasMore = branchLocations.length > 2;

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#0372b9]">Contact</h3>
        {hasMore && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-[#3ab54a] hover:text-[#2e8b3e] font-medium flex items-center transition-colors"
          >
            {showAll ? 'See Less' : 'See More'} 
            <span className={`ml-1 transition-transform ${showAll ? 'rotate-180' : ''}`}>▼</span>
          </button>
        )}
      </div>
      
      <ul className="space-y-4">
        {visibleBranches.map((branch) => (
          <motion.div
            key={branch.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BranchContactCard branch={branch} />
          </motion.div>
        ))}
      </ul>
    </div>
  );
};

// ---------------- FOOTER ----------------
export function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-12">

          {/* COMPANY INFO */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/assets/logo/logo-gc.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <span className="text-xl font-bold text-[#0372b9]">
                  G<span className="text-[#3ab54a]">C</span> Hemodynamix Inc.
                </span>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm">
              “Quality Dialysis Beyond Compare” — delivering top-notch
              hemodialysis care through modern equipment, highly trained
              professionals, and a deep commitment to patient-centered service.
              Prime Dialysis Center Inc. continues to uphold the highest standards in
              renal care, ensuring comfort, safety, and compassion in every
              treatment.
            </p>
          </div>

          {/* NAV + CONTACT */}
          <div className="flex flex-col sm:flex-row">
            {/* NAVIGATION */}
            <div className="w-[28%] min-w-[150px]">
              <h3 className="text-lg font-semibold mb-4 text-[#0372b9]">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center space-x-2 text-sm text-slate-600 hover:text-[#3ab54a] transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-[#3ab54a]" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT INFO */}
            <ContactInfo />
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-12 pt-8 border-t border-slate-300 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Prime Dialysis Center Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
