import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, Menu, X, MessageSquare, ArrowRight, GraduationCap } from 'lucide-react';
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

export default function Navbar({ activePage, setActivePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine current active vertical: 'classes' | 'printing'
  const isClasses = activePage === 'classes';
  const isPrinting = activePage === 'printing' || activePage === 'quote';

  const classesNavLinks = [
    { id: 'home', label: 'Home', isAction: 'page' },
    { id: 'faculty', label: 'Faculty Mentor', page: 'classes', hash: '#faculty' },
    { id: 'courses', label: 'Courses Offered', page: 'classes', hash: '#courses' },
    { id: 'enquiry', label: 'Admission Enquiry', page: 'classes', hash: '#enquiry', highlight: true },
  ];

  const printingNavLinks = [
    { id: 'home', label: 'Home', isAction: 'page' },
    { id: 'materials', label: 'Supported Materials', page: 'printing', hash: '#materials' },
    { id: 'capabilities', label: 'Capabilities', page: 'printing', hash: '#capabilities' },
    { id: 'contact', label: 'Contact', page: 'printing', hash: '#contact' },
    { id: 'quote', label: 'Instant 3D Quote', page: 'quote', highlight: true },
  ];

  const activeLinks = isClasses ? classesNavLinks : printingNavLinks;

  const handleNavClick = (link) => {
    if (link.isAction === 'page') {
      setActivePage(link.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.page && link.page !== activePage) {
      setActivePage(link.page);
      if (link.hash) {
        setTimeout(() => {
          const el = document.querySelector(link.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (link.hash) {
      const el = document.querySelector(link.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  // Color theming constants based on active vertical
  const theme = isClasses
    ? {
        utilityBg: 'bg-[#061224] text-blue-200/80 border-blue-900/60',
        utilityHighlight: 'text-blue-400',
        navbarBg: 'bg-[#091a36]/95 border-blue-900/50 shadow-blue-950/40',
        activeLink: 'text-white bg-blue-900/60 font-semibold border border-blue-400/30',
        hoverLink: 'text-slate-300 hover:text-white hover:bg-blue-950/60',
        highlightBtn:
          'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-blue-600/30',
        mobileDrawerBg: 'bg-[#091a36] border-blue-900/80 text-slate-200',
        mobileSubBtn: 'bg-blue-950/80 border-blue-800 text-blue-200',
        badge: 'Engineering Classes',
        badgeIcon: <GraduationCap className="w-4 h-4 text-blue-400" />,
      }
    : {
        utilityBg: 'bg-[#120a05] text-orange-200/80 border-orange-950/60',
        utilityHighlight: 'text-orange-400',
        navbarBg: 'bg-[#1a0f07]/95 border-orange-950/60 shadow-black/40',
        activeLink: 'text-white bg-orange-950/60 font-semibold border border-orange-500/30',
        hoverLink: 'text-slate-300 hover:text-white hover:bg-orange-950/60',
        highlightBtn:
          'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/30',
        mobileDrawerBg: 'bg-[#1a0f07] border-orange-950/80 text-slate-200',
        mobileSubBtn: 'bg-orange-950/80 border-orange-800 text-orange-200',
        badge: '3D Printing Service',
        badgeIcon: <Printer3DIcon className="w-4 h-4 text-orange-400" />,
      };

  const activePhone = isPrinting
    ? siteConfig.contact.printingPhone || '+91 9773842944'
    : siteConfig.contact.classesPhone || '+91 9773529009';
  const activePhoneRaw = isPrinting
    ? siteConfig.contact.printingPhoneRaw || '919773842944'
    : siteConfig.contact.classesPhoneRaw || '919773529009';
  const activeWhatsapp = isPrinting
    ? siteConfig.contact.printingWhatsapp || '919773842944'
    : siteConfig.contact.whatsappNumber || '919773529009';

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className={`${theme.utilityBg} text-xs py-1.5 px-4 border-b hidden sm:block backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${activePhoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Phone className={`w-3.5 h-3.5 ${theme.utilityHighlight}`} />
              <span>{activePhone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Mail className={`w-3.5 h-3.5 ${theme.utilityHighlight}`} />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Mon - Sat: 8:00 AM - 8:30 PM</span>
            </div>
            <a
              href={`https://wa.me/${activeWhatsapp}?text=${encodeURIComponent(
                isClasses
                  ? 'Hello Shri Siddhivinayak Classes, I have an admission enquiry.'
                  : 'Hello Shri Siddhivinayak 3D Printing, I want a quote for 3D printing.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition ml-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full backdrop-blur-md border-b transition-all duration-200 ${theme.navbarBg} ${
          isScrolled ? 'shadow-md py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name (Contextual to the active vertical) */}
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-left focus:outline-none group"
            title="Return to Home"
          >
            <SSLogo
              size="md"
              invert={true}
              vertical={isClasses ? 'classes' : isPrinting ? 'printing' : 'generic'}
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {activeLinks.map((link) => {
              if (link.highlight) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className={`ml-3 relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${theme.highlightBtn} shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0`}
                  >
                    {isClasses ? (
                      <GraduationCap className="w-4 h-4" />
                    ) : (
                      <Printer3DIcon className="w-4 h-4" />
                    )}
                    <span>{link.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition ${theme.hoverLink}`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Home Switcher (Tablet/Mobile) */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition flex items-center gap-1.5"
            >
              <span>← Switch Service</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden fixed inset-x-0 top-[calc(100%)] border-b shadow-2xl px-4 pt-4 pb-6 space-y-2 animate-fadeIn z-50 ${theme.mobileDrawerBg}`}
        >
          <div className="flex flex-col space-y-1">
            {activeLinks.map((link) => {
              if (link.highlight) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition mt-2 ${theme.highlightBtn}`}
                  >
                    <span className="flex items-center gap-2">
                      {isClasses ? <GraduationCap className="w-4 h-4" /> : <Printer3DIcon className="w-4 h-4" />}
                      {link.label}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between text-slate-300 hover:text-white hover:bg-white/10 transition"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>
              );
            })}
          </div>

          {/* Mobile Contact Quick Actions */}
          <div className="pt-4 mt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
            <a
              href={`tel:${activePhoneRaw}`}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              Call Direct
            </a>
            <a
              href={`https://wa.me/${activeWhatsapp}?text=${encodeURIComponent(
                isClasses
                  ? 'Hello Shri Siddhivinayak Classes, I would like to enquire about engineering coaching courses.'
                  : 'Hello Shri Siddhivinayak 3D Printing, I want to submit a 3D model for quotation.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium hover:bg-emerald-500/30 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
