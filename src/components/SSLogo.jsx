import React from 'react';

/**
 * Official Shri Siddhivinayak Brand Logo
 * Displays the Lord Ganesha within an Engineering Gear Cogwheel emblem.
 * Adapts contextually to Engineering Classes or 3D Printing Service.
 */
export default function SSLogo({
  size = 'md',
  showText = true,
  invert = true,
  vertical = 'generic', // 'classes' | 'printing' | 'generic'
  className = '',
}) {
  const sizeMap = {
    sm: { box: 'w-8 h-8', textTitle: 'text-xs sm:text-sm', textSub: 'text-[9px] sm:text-[10px]' },
    md: { box: 'w-10 h-10 sm:w-11 sm:h-11', textTitle: 'text-sm sm:text-base', textSub: 'text-[10px] sm:text-[11px]' },
    lg: { box: 'w-12 h-12 sm:w-14 sm:h-14', textTitle: 'text-base sm:text-xl', textSub: 'text-xs' },
    xl: { box: 'w-16 h-16 sm:w-20 sm:h-20', textTitle: 'text-xl sm:text-2xl', textSub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const getSubtitle = () => {
    if (vertical === 'classes') {
      return <span className="text-blue-400 font-semibold tracking-wide">Engineering Classes</span>;
    }
    if (vertical === 'printing') {
      return <span className="text-orange-400 font-semibold tracking-wide">3D Printing Service</span>;
    }
    return (
      <span className="flex items-center gap-1.5 font-medium text-slate-400">
        <span className="text-blue-400 font-semibold">Engineering Classes</span>
        <span className="text-slate-600">•</span>
        <span className="text-orange-400 font-semibold">3D Printing</span>
      </span>
    );
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Official Circular Ganesha-Gear Logo */}
      <div
        className={`${currentSize.box} relative flex items-center justify-center flex-shrink-0 group`}
      >
        <img
          src="/logo.png"
          alt="Shri Siddhivinayak Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span
            className={`font-extrabold tracking-tight font-heading ${currentSize.textTitle} ${
              invert ? 'text-white' : 'text-slate-900'
            }`}
          >
            Shri Siddhivinayak
          </span>
          <div className={`${currentSize.textSub} mt-0.5`}>
            {getSubtitle()}
          </div>
        </div>
      )}
    </div>
  );
}
