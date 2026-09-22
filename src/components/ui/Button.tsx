import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 select-none cursor-pointer rounded-full overflow-hidden group active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-2 tracking-widest',
    md: 'text-xs sm:text-sm px-6 py-3.5 gap-2.5 tracking-wider',
    lg: 'text-sm sm:text-base px-8 py-4 gap-3 tracking-widest',
  };

  const variantStyles = {
    primary:
      'bg-white text-black font-semibold hover:bg-neutral-200 shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:shadow-[0_0_32px_rgba(255,255,255,0.4)] border border-white',
    secondary:
      'bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
    glass:
      'bg-slate-900/60 hover:bg-slate-800/80 text-white border border-white/10 hover:border-sky-400/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
    ghost:
      'bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white border border-transparent hover:border-white/10',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </button>
  );
};
