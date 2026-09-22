import React from 'react';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { ProductFinish, FinishOption } from '../../types/product';
import { COUTURE_FINISHES } from '../../data/products';

export interface HeroContentProps {
  selectedFinish: ProductFinish;
  onSelectFinish: (finish: ProductFinish) => void;
  onExploreClick: () => void;
  onInspectClick: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  selectedFinish,
  onSelectFinish,
  onExploreClick,
  onInspectClick,
}) => {
  const currentFinish = COUTURE_FINISHES.find((f) => f.id === selectedFinish) || COUTURE_FINISHES[0];

  return (
    <div className="relative z-10 max-w-xl text-left pointer-events-auto">
      {/* Eyebrow Label */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="accent" className="text-[10px] tracking-widest font-mono-tech border-amber-500/30 text-amber-300 bg-amber-500/10">
          AUTUMN FESTIVE COUTURE 2026
        </Badge>
        <span className="flex items-center gap-1 text-[11px] text-amber-400/80 font-mono-tech">
          <Sparkles className="w-3 h-3 text-amber-400" /> ATELIER INDIA
        </span>
      </div>

      {/* Hero Headline */}
      <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-6xl tracking-tight text-white leading-[1.12] mb-6 uppercase">
        WEAVING DREAMS <br />
        <span className="animate-gold-shimmer block">
          IN PURE GOLD.
        </span>
      </h1>

      {/* Description */}
      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-normal">
        Centuries of royal Indian textile mastery sculpted for the modern muse. Hand-tied Jaipuri bandhani, pure mulberry silk, bullion zardozi embroidery, and bespoke silhouettes crafted across Jaipur and Varanasi.
      </p>

      {/* Interactive Royal Gemstone Finish Switcher */}
      <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-amber-500/20 backdrop-blur-xl max-w-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400">
            Royal Palette Colorway:
          </span>
          <span className="text-xs font-mono-tech font-bold text-amber-400 uppercase">
            {currentFinish.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {COUTURE_FINISHES.map((finish: FinishOption) => {
            const isSelected = selectedFinish === finish.id;
            return (
              <button
                key={finish.id}
                onClick={() => onSelectFinish(finish.id)}
                className={`flex-1 flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-300 border ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400/60 shadow-[0_0_16px_rgba(245,158,11,0.25)] scale-105'
                    : 'bg-transparent border-white/5 hover:border-amber-500/20 hover:bg-white/[0.03]'
                }`}
                title={finish.name}
              >
                <div
                  className="w-5 h-5 rounded-full border border-white/30 shadow-inner flex items-center justify-center transition-transform duration-300"
                  style={{ backgroundColor: finish.colorCode }}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_6px_#fde68a]" />
                  )}
                </div>
                <span className="text-[10px] font-mono-tech text-neutral-300 truncate w-full text-center">
                  {finish.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <Button
          variant="primary"
          size="lg"
          icon={<ArrowRight className="w-4 h-4" />}
          onClick={onExploreClick}
          className="bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 border-amber-300 shadow-[0_0_28px_rgba(245,158,11,0.35)]"
        >
          EXPLORE COUTURE
        </Button>

        <Button
          variant="secondary"
          size="lg"
          icon={<Eye className="w-4 h-4" />}
          onClick={onInspectClick}
          className="border-amber-400/30 hover:border-amber-400/60 text-amber-100"
        >
          360° ATELIER VIEW
        </Button>
      </div>

      {/* Key Specifications Grid */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] max-w-lg">
        <div>
          <span className="block text-xs text-neutral-400 font-mono-tech uppercase">Fabric</span>
          <span className="block text-sm font-bold text-amber-200 font-mono-tech mt-0.5">Mulberry Silk</span>
        </div>
        <div>
          <span className="block text-xs text-neutral-400 font-mono-tech uppercase">Craft</span>
          <span className="block text-sm font-bold text-amber-200 font-mono-tech mt-0.5">Bullion Zardozi</span>
        </div>
        <div>
          <span className="block text-xs text-neutral-400 font-mono-tech uppercase">Fitting</span>
          <span className="block text-sm font-bold text-amber-200 font-mono-tech mt-0.5">Bespoke Fit</span>
        </div>
      </div>
    </div>
  );
};
