import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, ShieldCheck, GraduationCap } from 'lucide-react';
import SSLogo from './SSLogo';
import { siteConfig } from '../data/siteConfig';

/**
 * Custom 3D Printer Vector Icon
 */
function Printer3DIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="18" x2="21" y2="18" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <path d="M10 6h4v3l-2 2-2-2V6z" fill="currentColor" fillOpacity="0.25" />
      <line x1="12" y1="11" x2="12" y2="13" />
      <path d="M9.5 18v-2.8l2.5-1.4 2.5 1.4v2.8" />
      <path d="M9.5 15.2l2.5 1.4 2.5-1.4" />
    </svg>
  );
}

export default function Footer({ activePage, setActivePage }) {
  const isClasses = activePage === 'classes';

  const handleLinkClick = (pageId, hash) => {
    if (pageId && pageId !== activePage) {
      setActivePage(pageId);
    }
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isClasses) {
    /* ========================================================================= */
    /* 1. DEDICATED CLASSES FOOTER (DEEP NAVY BLUE THEME) */
    /* ========================================================================= */
    return (
      <footer className="bg-[#050e1c] text-slate-300 border-t border-blue-900/60 pt-16 pb-8 relative overflow-hidden">
        {/* Subtle Ambient Blueprint Flare */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-950/80">
            
            {/* Brand & Overview */}
            <div className="lg:col-span-2 space-y-4">
              <button
                onClick={() => handleLinkClick('home')}
                className="text-left focus:outline-none"
              >
                <SSLogo size="lg" invert={true} vertical="classes" />
              </button>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                Premier engineering coaching institute delivering conceptual mastery, university exam preparation, and top academic scores for Diploma (Polytechnic) and Degree (B.E. / B.Tech) students across all branches.
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-900/50 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                  100% Pass Rate Record
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-900/50 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                  MSBTE & SPPU Syllabi
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-900/50 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                  24+ Yrs Teaching Legacy
                </span>
              </div>
            </div>

            {/* Courses Navigation */}
            <div className="space-y-4">
              <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white border-l-2 border-blue-500 pl-2">
                Academic Programs
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button onClick={() => handleLinkClick('classes', '#courses')} className="hover:text-blue-300 transition flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" /> Diploma Engineering (Polytechnic)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLinkClick('classes', '#courses')} className="hover:text-blue-300 transition flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" /> Degree Engineering (FE to BE)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLinkClick('classes', '#courses')} className="hover:text-blue-300 transition flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" /> Applied Mathematics (M1 to M4)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLinkClick('classes', '#courses')} className="hover:text-blue-300 transition flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" /> Engineering Backlog Clearing
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white border-l-2 border-blue-500 pl-2">
                Institute Info
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button onClick={() => handleLinkClick('classes', '#methodology')} className="hover:text-blue-300 transition flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" /> Teaching Methodology
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLinkClick('classes', '#faculty')} className="hover:text-blue-300 transition flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" /> Faculty: Prof. Jatin Shah
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLinkClick('classes', '#enquiry')} className="hover:text-blue-300 transition flex items-center gap-1.5 font-bold text-blue-400">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" /> Admission Enquiry
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLinkClick('home')} className="hover:text-blue-300 transition flex items-center gap-1.5 text-slate-400">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Return to Home Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* Campus Contact */}
            <div className="space-y-4">
              <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white border-l-2 border-blue-500 pl-2">
                Campus Location
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="leading-snug">{siteConfig.contact.address.full}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-white font-semibold">
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Mon - Sat: 8:00 AM - 8:30 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright strip */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Shri Siddhivinayak Engineering Classes. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => handleLinkClick('home')} className="hover:text-slate-300">
                Home Portal
              </button>
              <span>•</span>
              <button onClick={() => handleLinkClick('classes', '#enquiry')} className="hover:text-blue-300">
                Admissions Form
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  /* ========================================================================= */
  /* 2. DEDICATED 3D PRINTING FOOTER (DEEP CHARCOAL & EMBER THEME) */
  /* ========================================================================= */
  return (
    <footer className="bg-[#0a0604] text-slate-300 border-t border-orange-950/60 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle Ambient Ember Flare */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-orange-950/80">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left focus:outline-none"
            >
              <SSLogo size="lg" invert={true} vertical="printing" />
            </button>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              High-precision custom 3D printing and rapid prototyping service. Supporting engineering students, product designers, hobbyists, and industrial clients with fast, reliable additive manufacturing.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-300 text-xs font-semibold">
                0.3 mm Precision
              </span>
              <span className="px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-300 text-xs font-semibold">
                PLA • PETG • TPU • PVA
              </span>
              <span className="px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-300 text-xs font-semibold">
                No Minimum Order
              </span>
            </div>
          </div>

          {/* Materials & Capabilities */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white border-l-2 border-orange-500 pl-2">
              Supported Materials
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => handleLinkClick('printing', '#materials')} className="hover:text-orange-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" /> PLA & Tough PLA (High Detail)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('printing', '#materials')} className="hover:text-orange-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" /> PETG (Impact & Heat Resistant)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('printing', '#materials')} className="hover:text-orange-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" /> Flexible TPU 95A (Elastomer)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('printing', '#materials')} className="hover:text-orange-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" /> Water-Soluble PVA Supports
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('printing', '#materials')} className="hover:text-orange-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" /> High-Resolution SLA UV Resin
                </button>
              </li>
            </ul>
          </div>

          {/* 3D Studio Links */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white border-l-2 border-orange-500 pl-2">
              3D Print Studio
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => handleLinkClick('quote')} className="hover:text-orange-300 transition flex items-center gap-1.5 font-bold text-orange-400">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" /> Instant STL Quotation Studio
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('printing', '#materials')} className="hover:text-orange-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" /> Supported Materials
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('printing', '#capabilities')} className="hover:text-orange-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" /> Practical Capabilities
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-orange-300 transition flex items-center gap-1.5 text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Return to Home Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white border-l-2 border-orange-500 pl-2">
              Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <p className="leading-snug">{siteConfig.contact.address.full}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-white font-semibold">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon - Sat: 8:00 AM - 8:30 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Shri Siddhivinayak 3D Printing Service. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleLinkClick('home')} className="hover:text-slate-300">
              Home Portal
            </button>
            <span>•</span>
            <button onClick={() => handleLinkClick('quote')} className="hover:text-orange-300">
              Get Instant STL Quote
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
