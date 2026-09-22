import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'subtle' | 'accent' | 'outline' | 'pulse';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'subtle',
  className,
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-widest uppercase select-none';

  const variants = {
    subtle: 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] backdrop-blur-md',
    accent: 'bg-sky-500/10 text-sky-300 border border-sky-500/20 backdrop-blur-md',
    outline: 'bg-transparent text-neutral-400 border border-white/10',
    pulse: 'bg-white/[0.06] text-white border border-white/15 backdrop-blur-md',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {variant === 'pulse' && (
        <span className="relative flex h-1.5 w-1.5 mr-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-400"></span>
        </span>
      )}
      {children}
    </span>
  );
};
