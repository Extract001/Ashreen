import React, { useEffect, useState } from 'react';
import { ShoppingBag, ArrowUp, PhoneCall, Gem } from 'lucide-react';
import { useWindowSize } from '../../hooks/useWindowSize';

export interface MobileBottomDockProps {
  onOpenCart: () => void;
  onOpenInspect: () => void;
  cartCount: number;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  onOpenCart,
  onOpenInspect,
  cartCount,
}) => {
  const { isMobile } = useWindowSize();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMobile || !visible) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBespoke = () => {
    const el = document.getElementById('cta');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 inset-x-4 z-40 flex items-center justify-center pointer-events-none md:hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-[#0a0c12]/90 border border-amber-400/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.2)]">
        {/* 360 Jewel Quick Orbit */}
        <button
          onClick={onOpenInspect}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-400/10 hover:bg-amber-400/20 text-amber-200 border border-amber-400/20 active:scale-95 transition-all text-xs font-mono-tech"
          aria-label="Open 360 Jewel View"
        >
          <Gem className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider">360° JEWEL</span>
        </button>

        {/* Bag with count badge */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-white border border-white/15 active:scale-95 transition-all text-xs font-mono-tech"
          aria-label="Open Bag"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-[11px] font-bold">BAG</span>
          {cartCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-400 text-black text-[9px] font-bold flex items-center justify-center font-mono-tech">
              {cartCount}
            </span>
          )}
        </button>

        {/* Bespoke Inquiry */}
        <button
          onClick={scrollToBespoke}
          className="p-2 rounded-full bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 active:scale-90 transition-all"
          title="Atelier Concierge"
          aria-label="Atelier Concierge"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
        </button>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="p-2 rounded-full bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 active:scale-90 transition-all"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
