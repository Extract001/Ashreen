import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

export interface NavbarProps {
  onOpenCart: () => void;
  onOpenSearch: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenSearch,
  cartCount = 1,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Collection', href: '#featured' },
    { label: 'Royal Craft', href: '#showcase' },
    { label: 'Heritage & Artisans', href: '#story' },
    { label: 'Bespoke Order', href: '#cta' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 bg-[#06070a]/85 backdrop-blur-2xl border-b border-amber-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Identity */}
          <a
            href="#hero"
            className="flex items-center gap-3 group select-none text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <span className="font-display font-black text-sm tracking-tighter text-amber-200">अ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-base sm:text-lg tracking-[0.25em] text-white">
                  ASHREEN
                </span>
                <span className="hidden sm:inline-block">
                  <Badge variant="subtle" className="text-[9px] py-0 px-1.5 border-amber-400/20 text-amber-300">
                    COUTURE
                  </Badge>
                </span>
              </div>
              <p className="text-[9px] tracking-widest text-neutral-400 font-mono-tech uppercase">
                Atelier India // Mumbai • Delhi
              </p>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-5 py-1.5 bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-neutral-300 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-4 right-4 h-px bg-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full text-neutral-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 transition-all duration-200 hover:scale-105 active:scale-95 group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-neutral-300 group-hover:text-white transition-colors" />
              <span className="hidden sm:inline-block text-xs font-mono-tech tracking-wider">
                BAG
              </span>
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-sky-400 text-black text-[10px] font-bold flex items-center justify-center font-mono-tech">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-neutral-300 hover:text-white bg-white/[0.03] border border-white/[0.08]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Luxury Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pt-5 pb-8 bg-[#06070a]/98 backdrop-blur-3xl border-b border-amber-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium tracking-widest uppercase text-neutral-200 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-amber-500/20 transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[11px] font-mono-tech text-amber-400/70 group-hover:text-amber-300">
                      0{idx + 1}.
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </span>
                  <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </a>
              ))}

              {/* Mobile Concierge CTA */}
              <div className="mt-3 pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                <a
                  href="#cta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-center text-xs tracking-widest font-mono-tech uppercase shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95 transition-transform"
                >
                  BOOK BESPOKE FITTING
                </a>

                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono-tech px-2">
                  <span className="text-amber-300/80">₹ INR // PAN-INDIA COURIER</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Sparkles className="w-3 h-3 animate-spin-slow" /> HAUTE COUTURE 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
