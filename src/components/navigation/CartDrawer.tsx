import React from 'react';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ProductFinish } from '../../types/product';
import { LUXURY_PRODUCTS, COUTURE_FINISHES } from '../../data/products';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFinish: ProductFinish;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  selectedFinish,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const flagship = LUXURY_PRODUCTS[0];
  const finishInfo = COUTURE_FINISHES.find((f) => f.id === selectedFinish) || COUTURE_FINISHES[0];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer content */}
      <aside className="relative w-full max-w-md bg-[#08090e] border-l border-amber-500/20 h-full flex flex-col z-10 shadow-[0_0_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-amber-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold tracking-widest uppercase font-display text-white">
              RESERVED ATELIER BAG
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-amber-500/15 flex gap-4">
            <div className="w-20 h-24 rounded-xl bg-neutral-900 border border-white/10 overflow-hidden shrink-0">
              <img
                src={flagship.image}
                alt={flagship.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono-tech text-amber-400 block font-bold">
                    {flagship.designNumber}
                  </span>
                  <h3 className="text-sm font-bold text-white font-display tracking-wide truncate">
                    {flagship.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono-tech mt-0.5">
                    Palette: <span className="text-amber-200">{finishInfo.name}</span>
                  </p>
                </div>
                <span className="text-sm font-mono-tech font-bold text-amber-300 ml-2">
                  ₹{flagship.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 font-mono-tech">
                  Size: Bespoke M (38)
                </span>
                <span className="text-[11px] text-emerald-400 font-mono-tech flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Handcrafted
                </span>
              </div>
            </div>
          </div>

          {/* Complimentary Perks */}
          <div className="p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Complimentary Pan-India Express Delivery</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Dispatched with bespoke garment bag, hanger, and personalized artisan authenticity card.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-amber-500/15 bg-[#050608] space-y-4">
          <div className="space-y-2 text-xs font-mono-tech">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span className="text-white">₹{flagship.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Express Insured Shipping</span>
              <span className="text-emerald-400">COMPLIMENTARY</span>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex justify-between text-sm font-bold text-white font-mono-tech">
              <span>Total Investment</span>
              <span className="text-amber-300">₹{flagship.price.toLocaleString('en-IN')} INR</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 font-bold"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => {
              alert('Phase 1 Prototype: Checkout and payment integration (Razorpay / UPI) will arrive in Phase 2.');
            }}
          >
            PROCEED TO BESPOKE ORDER
          </Button>

          <p className="text-[10px] text-center text-neutral-400 font-mono-tech">
            PROTOTYPE PREVIEW ONLY // ZERO CHARGES DEDUCTED
          </p>
        </div>
      </aside>
    </div>
  );
};
