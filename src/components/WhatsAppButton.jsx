import React, { useState } from 'react';
import { MessageSquare, X, Send, GraduationCap } from 'lucide-react';
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

export default function WhatsAppButton({ activePage = 'classes' }) {
  const [isOpen, setIsOpen] = useState(false);
  const isClasses = activePage === 'classes';

  const getWhatsAppLink = (message) => {
    return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Quick Action Popover Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-88 max-w-sm bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700/80 p-4 transition-all duration-200 animate-fadeIn overflow-hidden backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {isClasses ? 'Shri Siddhivinayak Classes' : 'Shri Siddhivinayak 3D Print'}
                </h4>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Online • Quick WhatsApp Support
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Choice Buttons (Contextually Separated) */}
          <div className="py-3 space-y-2 text-xs">
            <p className="text-slate-400 font-medium">Select an inquiry to chat directly:</p>

            {isClasses ? (
              <>
                <a
                  href={getWhatsAppLink('Hello! I would like to enquire about Engineering Classes admissions & course details.')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-blue-950/80 hover:bg-blue-900/90 text-blue-100 border border-blue-800/60 transition group"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-xs text-white">Diploma / Degree Admission</div>
                    <div className="text-[10px] text-blue-300">Course details, fees, syllabus & guidance</div>
                  </div>
                  <Send className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition" />
                </a>

                <a
                  href={getWhatsAppLink('Hello! I want to enquire about Applied Mathematics (M1 to M4) coaching.')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition group"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                    <span className="font-bold text-xs">M</span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-xs text-white">Applied Maths (M1-M4) Coaching</div>
                    <div className="text-[10px] text-slate-400">Step-by-step calculus & algebra practice</div>
                  </div>
                  <Send className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition" />
                </a>
              </>
            ) : (
              <>
                <a
                  href={getWhatsAppLink('Hello! I have a 3D model (STL) and want an immediate print quote.')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-orange-950/80 hover:bg-orange-900/90 text-orange-100 border border-orange-800/60 transition group"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0">
                    <Printer3DIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-xs text-white">Instant 3D Print Quote</div>
                    <div className="text-[10px] text-orange-300">File inspection, pricing & lead time</div>
                  </div>
                  <Send className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-0.5 transition" />
                </a>

                <a
                  href={getWhatsAppLink('Hello! I need custom prototyping / CAD design support for my project.')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition group"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                    <span className="font-bold text-xs">3D</span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-xs text-white">Custom Prototype & Materials</div>
                    <div className="text-[10px] text-slate-400">PLA, PETG, TPU, PVA advice</div>
                  </div>
                  <Send className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition" />
                </a>
              </>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center">
            Replies typically within 15 minutes during working hours
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Shri Siddhivinayak on WhatsApp"
        className="relative group flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-200 border-2 border-white"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">WhatsApp</span>
      </button>
    </div>
  );
}
