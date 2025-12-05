'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUp, ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { branchLocations } from '@/lib/branchLocatorModule';

// Generate navigation with dynamic branches
const getNavigation = () => [
  { name: 'Home', href: '/' },
  { 
    name: 'About Us', 
    href: '/about',
    dropdown: [
      { name: 'Our Company', href: '/about' },
      { name: 'Our Team', href: '/our-team' },
    ],
    icon: null,
  },
  { 
    name: 'Branches', 
    href: '/map-branches',
    dropdown: branchLocations.map(branch => ({
      name: branch.name,
      href: `/map-branches?search=${encodeURIComponent(branch.name)}`,
    })),
    icon: MapPin,
  },
  { name: 'Services', href: '/services'},
  { name: 'Articles', href: '/articles' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const pathname = usePathname();
  const navigation = getNavigation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!openDropdown) return;

      const ref = dropdownRefs.current[openDropdown];
      if (ref && !ref.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  // Scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/assets/logo/metadatalogo.png"
                alt="Logo"
                width={50}
                height={50}
              />
              <span className="text-xl font-bold text-[#0372b9]">
                Prime Dialysis Center Inc.
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const hasDropdown = item.dropdown;

                if (hasDropdown) {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      ref={(el) => (dropdownRefs.current[item.name] = el)}
                    >
                      <div className="flex items-center">

                        {/* Parent link — navigates normally */}
                        <Link
                          href={item.href}
                          className={`flex items-center font-medium transition-colors duration-200 ${
                            isActive ? 'text-[#0372b9]' : 'text-slate-700 hover:text-[#3ab54a]'
                          }`}
                          onClick={(e) => {
                            // Allow navigation, do NOT toggle dropdown
                            e.stopPropagation();
                            setOpenDropdown(null);
                          }}
                        >
                          {item.icon && <item.icon className="w-4 h-4 mr-1"  />}
                          {item.name}
                        </Link>

                        {/* Arrow toggle */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === item.name ? null : item.name);
                          }}
                          aria-label={`${openDropdown === item.name ? 'Close' : 'Open'} ${item.name} menu`}
                          aria-expanded={openDropdown === item.name}
                          className="ml-1 text-slate-500 hover:text-slate-700"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* DROPDOWN */}
                      {openDropdown === item.name && (
                        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`block px-4 py-2 text-sm ${
                                  pathname === subItem.href
                                    ? 'bg-slate-100 text-[#0372b9]'
                                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#3ab54a]'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Normal link
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[#0372b9] border-b-2 border-[#3ab54a] pb-1'
                        : 'text-slate-700 hover:text-[#3ab54a]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* MOBILE menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* MOBILE NAV */}
          {isOpen && (
            <div className="md:hidden border-t border-border bg-background">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  const hasDropdown = item.dropdown;

                  if (hasDropdown) {
                    return (
                      <div
                        key={item.name}
                        className="space-y-1"
                        ref={(el) => (dropdownRefs.current[item.name] = el)}
                      >
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-3 py-2 text-left font-medium text-slate-700 hover:text-[#3ab54a] flex-grow"
                          >
                            {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                            {item.name}
                          </Link>

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenDropdown(openDropdown === item.name ? null : item.name);
                            }}
                            aria-label={`${openDropdown === item.name ? 'Close' : 'Open'} ${item.name} menu`}
                            aria-expanded={openDropdown === item.name}
                            className="px-2 py-2 text-slate-500 hover:text-slate-700"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                openDropdown === item.name ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {openDropdown === item.name && (
                          <div className="pl-6 space-y-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => {
                                  setIsOpen(false);
                                  setOpenDropdown(null);
                                }}
                                className="block px-3 py-2 text-sm text-slate-700 hover:text-[#3ab54a]"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 font-medium text-slate-700 hover:text-[#3ab54a]"
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#0372b9] text-white p-3 rounded-full shadow-lg hover:bg-[#0363a0] transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
