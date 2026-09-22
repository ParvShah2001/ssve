import React, { useState } from 'react';
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  MousePointerClick,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

/**
 * Custom 3D Printer Vector Icon
 * Depicts an industrial additive manufacturing gantry, extruder carriage,
 * vertical lead screws, heated bed, and a 3D part being printed.
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
      {/* 3D Printer Outer Chassis Gantry */}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      {/* Heated Build Bed */}
      <line x1="3" y1="18" x2="21" y2="18" />
      {/* Horizontal X-Axis Rail */}
      <line x1="3" y1="8" x2="21" y2="8" />
      {/* Extruder Carriage & Nozzle Tip */}
      <path d="M10 6h4v3l-2 2-2-2V6z" fill="currentColor" fillOpacity="0.25" />
      <line x1="12" y1="11" x2="12" y2="13" />
      {/* Isometric 3D Printed Part on Bed */}
      <path d="M9.5 18v-2.8l2.5-1.4 2.5 1.4v2.8" />
      <path d="M9.5 15.2l2.5 1.4 2.5-1.4" />
    </svg>
  );
}

export default function HomePage({ setActivePage }) {
  // Hover expansion state: 'classes' | 'printing' | null
  const [hoveredSide, setHoveredSide] = useState(null);

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onMouseLeave={() => setHoveredSide(null)}
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col lg:flex-row select-none bg-[#071326]"
    >
      {/* ========================================================================= */}
      {/* TOP FLOATING INSTRUCTION PILL (HIGHEST Z-INDEX ON TOP OF THE DIVIDER LINE) */}
      {/* ========================================================================= */}
      <div className="absolute top-3 sm:top-5 inset-x-0 z-50 pointer-events-none flex items-center justify-center px-4">
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-slate-950/95 backdrop-blur-md border border-slate-700/90 shadow-[0_4px_25px_rgba(0,0,0,0.8)] text-xs font-semibold tracking-wider text-slate-200">
          <MousePointerClick className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden sm:inline">Hover to expand • Click to enter</span>
          <span className="sm:hidden">Tap any section to explore</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SIDE A: SHRI SIDDHIVINAYAK ENGINEERING CLASSES (LEFT) */}
      {/* ========================================================================= */}
      <div
        onMouseEnter={() => setHoveredSide('classes')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => navigateTo('classes')}
        className={`relative overflow-hidden cursor-pointer transition-split flex flex-col justify-between group w-full h-1/2 lg:h-full ${
          hoveredSide === 'classes'
            ? 'lg:w-[86%] xl:w-[88%] bg-[#091a36]'
            : hoveredSide === 'printing'
            ? 'lg:w-[14%] xl:w-[12%] bg-[#061224] opacity-75 hover:opacity-100'
            : 'lg:w-1/2 bg-[#091a36]'
        }`}
      >
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=75&w=1200"
            alt="Engineering Students Learning in Classroom"
            loading="eager"
            decoding="async"
            className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
              hoveredSide === 'classes'
                ? 'scale-105 filter brightness-[0.38]'
                : 'filter brightness-[0.25] group-hover:scale-102'
            }`}
          />
          {/* Deep Navy Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#091a36]/95 via-[#0f2b5c]/90 to-[#13336d]/90 mix-blend-multiply" />
          {/* Technical Blueprint Grid Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* Ambient Corner Flare */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Main Content Area */}
        <div className="relative z-10 p-5 sm:p-10 lg:p-14 flex flex-col justify-between h-full pt-14 sm:pt-16 lg:pt-20 pb-5 sm:pb-8 lg:pb-10">
          {/* Top Tag */}
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-900/70 border border-blue-400/40 text-blue-100 text-[11px] sm:text-xs font-bold tracking-wide backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
              <span>{siteConfig.brand.classesName}</span>
            </div>
          </div>

          {/* Core Hook & Headings - Restored Natural Layout */}
          <div
            className={`space-y-3 sm:space-y-4 transition-split max-w-2xl ${
              hoveredSide === 'printing' ? 'lg:opacity-10 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="space-y-1">
              <span className="text-blue-300 font-extrabold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase block font-heading">
                Academic Excellence
              </span>
              <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight drop-shadow-sm">
                From Diploma foundations to Degree mastery—we guide you through.
              </h1>
            </div>

            <p className="text-slate-200 text-xs sm:text-sm lg:text-base leading-relaxed">
              Conceptual mastery and university exam coaching for Diploma (Polytechnic), Degree (B.E. / B.Tech), Applied Mathematics (M1 to M4)
            </p>

            {/* Curriculum Highlights Cards */}
            {hoveredSide === 'classes' && (
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 animate-fadeIn hidden sm:grid max-w-md">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-sm">
                  <div className="text-xs font-bold text-white">Diploma Coaching</div>
                  <div className="text-[11px] text-blue-200">MSBTE All Semesters</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-sm">
                  <div className="text-xs font-bold text-white">Degree Engineering</div>
                  <div className="text-[11px] text-blue-200">FE to BE All Branches</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Strip - Restored Natural Spacing */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateTo('classes');
              }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2 group-hover:gap-3 transition-all transform hover:-translate-y-0.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Explore Classes & Admissions</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] sm:text-xs text-blue-100/90 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
              <span>100% Pass Rate • 24+ Yrs Teaching Legacy</span>
            </div>
          </div>
        </div>

        {/* Vertical Compressed Ribbon for Large Screens when unhovered */}
        <div
          className={`hidden lg:flex absolute inset-0 z-20 items-center justify-center p-2 bg-slate-950/85 backdrop-blur-sm pointer-events-none transition-split ${
            hoveredSide === 'printing' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="transform -rotate-90 whitespace-nowrap text-xs font-extrabold text-blue-300 tracking-widest uppercase flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Engineering Classes</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THICK DIFFERENTIATING DIVIDING LINE (PHYSICALLY ATTACHED TO RIGHT EDGE) */}
        {/* ========================================================================= */}
        <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-2.5 sm:w-3 bg-gradient-to-b from-blue-400 via-amber-300 to-orange-500 shadow-[0_0_25px_rgba(251,191,36,0.85)] z-40 pointer-events-none" />
      </div>

      {/* Horizontal thick divider for mobile screens */}
      <div className="lg:hidden w-full h-2 bg-gradient-to-r from-blue-500 via-amber-300 to-orange-500 shadow-md z-30" />

      {/* ========================================================================= */}
      {/* SIDE B: SHRI SIDDHIVINAYAK 3D PRINTING SERVICE (RIGHT) */}
      {/* ========================================================================= */}
      <div
        onMouseEnter={() => setHoveredSide('printing')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => navigateTo('printing')}
        className={`relative overflow-hidden cursor-pointer transition-split flex flex-col justify-between group w-full h-1/2 lg:h-full ${
          hoveredSide === 'printing'
            ? 'lg:w-[86%] xl:w-[88%] bg-[#1a0f07]'
            : hoveredSide === 'classes'
            ? 'lg:w-[14%] xl:w-[12%] bg-[#120a05] opacity-75 hover:opacity-100'
            : 'lg:w-1/2 bg-[#1a0f07]'
        }`}
      >
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=75&w=1200"
            alt="Precision Industrial 3D Printer and Prototypes"
            loading="eager"
            decoding="async"
            className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
              hoveredSide === 'printing'
                ? 'scale-105 filter brightness-[0.38]'
                : 'filter brightness-[0.25] group-hover:scale-102'
            }`}
          />
          {/* Deep Saffron & Ember Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#451a03]/95 via-[#7c2d12]/90 to-[#ea580c]/85 mix-blend-multiply" />
          {/* Additive 3D Slicing Lines Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* Ambient Corner Flare */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Main Content Area */}
        <div className="relative z-10 p-5 sm:p-10 lg:p-14 flex flex-col justify-between h-full pt-14 sm:pt-16 lg:pt-20 pb-5 sm:pb-8 lg:pb-10">
          {/* Top Tag */}
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-950/70 border border-orange-500/40 text-orange-100 text-[11px] sm:text-xs font-bold tracking-wide backdrop-blur-md">
              <Printer3DIcon className="w-3.5 h-3.5 text-orange-400" />
              <span>{siteConfig.brand.printingName}</span>
            </div>
          </div>

          {/* Core Hook & Headings - Restored Natural Layout */}
          <div
            className={`space-y-3 sm:space-y-4 transition-split max-w-2xl ${
              hoveredSide === 'classes' ? 'lg:opacity-10 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="space-y-1">
              <span className="text-orange-300 font-extrabold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase block font-heading">
                Custom 3D Printing & Prototyping
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight drop-shadow-sm">
                Precision 3D printing for prototypes, parts, and passion projects
              </h2>
            </div>

            <p className="text-slate-200 text-xs sm:text-sm lg:text-base leading-relaxed">
              Bring your ideas to life with high-precision 3D printing services tailored for rapid prototyping, custom parts, and creative models.
            </p>

            {/* 3D Highlights Cards: Materials & Restored Instant STL Quote */}
            {hoveredSide === 'printing' && (
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 animate-fadeIn hidden sm:grid max-w-md">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-sm">
                  <div className="text-xs font-bold text-white">Supported Materials</div>
                  <div className="text-[11px] text-orange-200">PLA, PETG, TPU, PVA</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-sm">
                  <div className="text-xs font-bold text-white">Instant STL Quote</div>
                  <div className="text-[11px] text-orange-200">Real-Time Volume & Price</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Strip - Restored Natural Spacing */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateTo('printing');
              }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/30 flex items-center gap-2 group-hover:gap-3 transition-all transform hover:-translate-y-0.5"
            >
              <Printer3DIcon className="w-4 h-4" />
              <span>Explore 3D Printing Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] sm:text-xs text-orange-100/90 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>0.3 mm Precision • No Minimum Order</span>
            </div>
          </div>
        </div>

        {/* Vertical Compressed Ribbon for Large Screens when unhovered */}
        <div
          className={`hidden lg:flex absolute inset-0 z-20 items-center justify-center p-2 bg-slate-950/85 backdrop-blur-sm pointer-events-none transition-split ${
            hoveredSide === 'classes' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="transform -rotate-90 whitespace-nowrap text-xs font-extrabold text-orange-300 tracking-widest uppercase flex items-center gap-2">
            <Printer3DIcon className="w-4 h-4 text-orange-400" />
            <span>3D Printing Service</span>
          </div>
        </div>
      </div>
    </div>
  );
}
