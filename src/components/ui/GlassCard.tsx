import React from 'react';
import { cn } from '../../utils/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glowColor?: string;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  hoverEffect = true,
  glowColor,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-slate-900/40 border border-white/[0.08] backdrop-blur-xl p-6 transition-all duration-500 overflow-hidden',
        hoverEffect &&
          'hover:bg-slate-900/60 hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {glowColor && (
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-40"
          style={{ backgroundColor: glowColor }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
