import React from 'react';
import logoImage from '../Logo/logo.png';

interface ChurchLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const ChurchLogo: React.FC<ChurchLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        id="hcc-official-church-logo"
        src={logoImage}
        alt="Hope Christian Centre Inc. Official Logo"
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="shrink-0 object-contain drop-shadow-md select-none"
        referrerPolicy="no-referrer"
      />

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
            Hope Christian Centre
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-amber-400 font-semibold">
            Sacred Hymnal
          </span>
        </div>
      )}
    </div>
  );
};
