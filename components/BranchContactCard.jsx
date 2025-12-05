'use client';

import { Phone, Mail, Facebook, MapPin, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const ContactItem = ({ icon: Icon, label, value, href, isLink = false, className = '' }) => {
  if (!value) return null;
  
  const content = (
    <div className="flex items-start space-x-3">
      <Icon className="w-5 h-5 text-[#3ab54a] mt-0.5 flex-shrink-0" aria-hidden="true" />
      <span className={`text-gray-800 hover:text-[#3ab54a] transition-colors ${className}`}>
        {label || value}
      </span>
    </div>
  );

  // For email links, we use a simple mailto: link
  const isEmail = href && href.startsWith('mailto:');
  
  const linkProps = isLink && !isEmail 
    ? { target: "_blank", rel: "noopener noreferrer" } 
    : {};

  // For email links, use a simple <a> tag with mailto:
  if (isEmail) {
    return (
      <a 
        href={href}
        className="block hover:bg-gray-50 -mx-5 px-5 py-1 cursor-pointer"
      >
        {content}
      </a>
    );
  }

  // For regular links with href
  if (href) {
    return (
      <a 
        href={href}
        className="block hover:bg-gray-50 -mx-5 px-5 py-1"
        {...linkProps}
      >
        {content}
      </a>
    );
  }
  
  // If no href but we have a value, render as plain text
  return (
    <div className="-mx-5 px-5 py-1">
      {content}
    </div>
  );
};

export const BranchContactCard = ({ branch }) => {
  const { name, phone, email, facebook, address } = branch;
  const [isMounted, setIsMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardId = `branch-${name.toLowerCase().replace(/\s+/g, '-')}`;

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <li className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="group" role="group" aria-labelledby={`${cardId}-header`}>
        <button
          id={`${cardId}-header`}
          aria-expanded={isExpanded}
          aria-controls={`${cardId}-content`}
          className="w-full cursor-pointer flex justify-between items-center px-5 py-3 bg-slate-100 font-medium text-slate-800 hover:bg-slate-200 transition-colors text-left"
          onClick={toggleExpand}
        >
          <span>Prime Dialysis Center Inc - {name}</span>
          <ChevronDown 
            className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            aria-hidden="true"
          />
        </button>

        <div 
          id={`${cardId}-content`}
          className={`p-5 space-y-4 bg-white border-t border-slate-100 animate-fadeIn ${!isExpanded ? 'hidden' : ''}`}
          aria-hidden={!isExpanded}
        >
          <ul className="space-y-4 list-none p-0 m-0">
            <li>
              <ContactItem 
                icon={Phone} 
                value={phone} 
                href={phone ? `tel:${phone.replace(/\D/g, '')}` : ''}
              />
            </li>
            
            <li>
              <ContactItem 
                icon={Mail} 
                value={email} 
                href={email ? `https://mail.google.com/mail/?view=cm&to=${email}` : null}
                isLink={true}
              />
            </li>
            
            {facebook && (
              <li>
                <ContactItem 
                  icon={Facebook} 
                  value={`${name} on Facebook`}
                  href={facebook}
                  isLink={true}
                  className="hover:text-[#0372b9]"
                />
              </li>
            )}
            
            {address && (
              <li className="-mx-5 px-5 py-1">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#3ab54a] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <address className="not-italic text-gray-800">{address}</address>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </li>
  );
};
