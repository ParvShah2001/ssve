import React from 'react';
import {
  Layers,
  ArrowRight,
  Zap,
  Box,
  Cpu,
  ChevronRight,
  Calculator,
  MessageSquare,
  Building,
  Wrench,
  Phone,
  Mail,
  GraduationCap,
  Sparkles,
  PackageCheck,
} from 'lucide-react';
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

export default function PrintingPage({ setActivePage }) {
  const capabilities = [
    {
      title: 'College & University Projects',
      tag: 'Academic',
      desc: 'Final year engineering capstone models, diploma mechanisms, and robotics parts printed accurately at student-friendly rates.',
      icon: GraduationCap,
    },
    {
      title: 'School & Science Models',
      tag: 'STEM Learning',
      desc: 'Physical science fair exhibits, atomic models, biology diagrams, and STEM demonstration apparatus for students.',
      icon: Sparkles,
    },
    {
      title: 'Hobbyist & Maker Builds',
      tag: 'DIY & Inventors',
      desc: 'Custom project enclosures, wearable gadgets, creative figurines, and personal experimental designs brought to life.',
      icon: Box,
    },
    {
      title: 'Custom Electronic Enclosures',
      tag: 'Precision Housing',
      desc: 'Custom snap-fit cases for Arduino, Raspberry Pi, sensors, PCB mounts, and IoT devices with cable cutouts.',
      icon: Cpu,
    },
    {
      title: 'Rapid Concept Prototypes',
      tag: 'Design Fit-Check',
      desc: 'Fast, affordable physical test prints to verify ergonomics, size, and assembly fit before final production.',
      icon: Zap,
    },
    {
      title: 'Spare & Replacement Parts',
      tag: 'Practical Fixes',
      desc: 'Hard-to-find plastic knobs, clips, brackets, and replacement gears to repair home equipment and tools.',
      icon: Wrench,
    },
  ];

  const navigateToQuote = () => {
    setActivePage('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const printingPhone = siteConfig.contact.printingPhone || '+91 9773842944';
  const printingPhoneRaw = siteConfig.contact.printingPhoneRaw || '919773842944';
  const printingWhatsapp = siteConfig.contact.printingWhatsapp || '919773842944';

  return (
    <div className="min-h-screen bg-[#0c0806] text-slate-100 selection:bg-orange-500 selection:text-white relative overflow-hidden pb-12">
      {/* Additive Manufacturing Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (COMPACT & PUNCHY) */}
        {/* ========================================================================= */}
        <section className="pt-8 sm:pt-12 pb-10 sm:pb-12 border-b border-orange-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4 sm:space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Printer3DIcon className="w-4 h-4 text-orange-400" />
                <span>3D Printing & Prototyping (Online Service)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
                Precision 3D Printing for Prototypes, Projects &{' '}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent block mt-0.5">
                  Makers.
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Affordable on-demand 3D printing designed for college projects, school models, hobbyist builds, and functional prototypes. Upload your STL file for instant geometry calculation and transparent pricing.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={navigateToQuote}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/30 flex items-center gap-2 transition transform hover:-translate-y-0.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Instant 3D STL Quote Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${printingWhatsapp}?text=${encodeURIComponent(
                    'Hello Shri Siddhivinayak 3D Printing, I have a 3D model file and would like a quote.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: {printingPhone}</span>
                </a>
              </div>

              {/* Key Trust Metrics (No Express Dispatch) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
                <div className="bg-white/5 border border-orange-500/20 backdrop-blur-md p-3 rounded-xl text-center">
                  <div className="text-lg sm:text-xl font-black text-white font-heading">0.3 mm</div>
                  <div className="text-[11px] text-orange-300 font-medium">Layer Precision</div>
                </div>
                <div className="bg-white/5 border border-orange-500/20 backdrop-blur-md p-3 rounded-xl text-center">
                  <div className="text-lg sm:text-xl font-black text-white font-heading">1 Unit</div>
                  <div className="text-[11px] text-orange-300 font-medium">No Minimum Order</div>
                </div>
                <div className="bg-white/5 border border-orange-500/20 backdrop-blur-md p-3 rounded-xl text-center">
                  <div className="text-lg sm:text-xl font-black text-white font-heading">4 Filaments</div>
                  <div className="text-[11px] text-orange-300 font-medium">PLA, PETG, TPU, PVA</div>
                </div>
                <div className="bg-white/5 border border-orange-500/20 backdrop-blur-md p-3 rounded-xl text-center">
                  <div className="text-lg sm:text-xl font-black text-white font-heading">100% Online</div>
                  <div className="text-[11px] text-orange-300 font-medium">Doorstep Delivery</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SUPPORTED FILAMENTS (4 ONLY: PLA, PETG, TPU, PVA) */}
        {/* ========================================================================= */}
        <section id="materials" className="py-10 sm:py-12 border-b border-orange-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-orange-400 tracking-wider uppercase">
                  Filament Catalog
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  Supported Materials
                </h2>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                Verified technical specifications taken from standard technical datasheets (TDS).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {siteConfig.printing.materials.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-[#180f0a]/90 border border-orange-500/20 hover:border-orange-500/50 rounded-2xl p-5 backdrop-blur-md shadow-lg transition flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-orange-950/70 border border-orange-500/30 text-orange-300">
                        {mat.finish}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {mat.density} g/cm³
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white font-heading">
                        {mat.name}
                      </h3>
                      <div className="text-[11px] text-orange-300 font-medium space-y-0.5 mt-1">
                        <div>Tensile Strength: <strong>{mat.tensileStrength}</strong></div>
                        <div>Heat Deflection: <strong>{mat.heatResistance}</strong></div>
                        <div>Print Temp: <strong>{mat.printTemp}</strong></div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {mat.description}
                    </p>

                    <div className="text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                      <strong className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        Best Used For:
                      </strong>
                      <p className="text-slate-200 text-xs leading-snug">{mat.bestFor}</p>
                    </div>

                    <div className="text-[11px] text-slate-300 pt-1.5">
                      <strong className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Available Colors:
                      </strong>
                      <div className="flex flex-wrap gap-1">
                        {mat.colorOptions.map((c, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">
                      ₹{mat.ratePerCm3} / cm³
                    </span>
                    <button
                      type="button"
                      onClick={navigateToQuote}
                      className="px-3 py-1.5 rounded-lg bg-orange-600/30 hover:bg-orange-600 text-orange-200 hover:text-white font-bold text-xs border border-orange-500/40 transition flex items-center gap-1"
                    >
                      <span>Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CAPABILITIES / APPLICATIONS (REASONABLE FOR HOBBYISTS & STUDENTS) */}
        {/* ========================================================================= */}
        <section id="capabilities" className="py-10 sm:py-12 border-b border-orange-950/60 bg-[#120803]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-orange-400 tracking-wider uppercase">
                  Practical Applications
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  What We Build
                </h2>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                Honest, accessible 3D printing designed specifically for makers, students, and prototypes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities.map((cap, idx) => {
                const IconComponent = cap.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#180f0a]/80 border border-orange-500/20 rounded-2xl p-4.5 backdrop-blur-md space-y-2 hover:border-orange-500/40 transition shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-orange-950/70 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-orange-400 uppercase px-2 py-0.5 rounded-full bg-orange-950/50 border border-orange-500/20">
                        {cap.tag}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white font-heading">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ONLINE CONTACT ONLY (NO PHYSICAL ADDRESS, NO MAPS) */}
        {/* ========================================================================= */}
        <section id="contact" className="pt-10 sm:pt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#261005] via-[#1a0c05] to-[#0c0806] border border-orange-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Col: Instant Quote CTA Box (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-200 text-xs font-bold">
                    <Calculator className="w-3.5 h-3.5 text-orange-400" />
                    <span>Instant Slicing Calculation</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight">
                    Have an STL File? Get Live Pricing in Seconds.
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Upload your 3D CAD model directly into our interactive 3D studio. Inspect geometry in 360°, calculate volume, select materials, and submit for fast fabrication with direct courier dispatch to your doorstep.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={navigateToQuote}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition"
                    >
                      <Printer3DIcon className="w-4 h-4" />
                      <span>Launch 3D Quote Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/${printingWhatsapp}?text=${encodeURIComponent(
                        'Hello Shri Siddhivinayak 3D Printing, I have a 3D design file and would like a quote.'
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp: {printingPhone}</span>
                    </a>
                  </div>
                </div>

                {/* Right Col: Online Support & Contacts Only (5 cols) */}
                <div className="lg:col-span-5 bg-[#180f0a]/90 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-md space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-400 tracking-wider uppercase">
                      Online Print Lab
                    </span>
                    <h4 className="text-lg font-bold text-white font-heading mt-0.5">
                      Direct Online Support
                    </h4>
                  </div>

                  <div className="space-y-3.5 text-xs text-slate-300">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-950/80 border border-orange-800 text-orange-400 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block font-semibold">Phone / WhatsApp Support</strong>
                        <a href={`tel:${printingPhoneRaw}`} className="text-orange-300 hover:text-white font-medium text-sm">
                          {printingPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-950/80 border border-orange-800 text-orange-400 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block font-semibold">Email Quotations</strong>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-orange-300 hover:text-white text-sm">
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-950/80 border border-orange-800 text-orange-400 flex items-center justify-center shrink-0">
                        <PackageCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block font-semibold">Order Fulfillment</strong>
                        <p className="text-slate-300 leading-snug">100% Online Service • Direct Courier Dispatch Across India</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
