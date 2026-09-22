import React from 'react';
import { ChevronDown, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { Scene } from '../components/3d/Scene';
import { HeroContent } from '../components/hero/HeroContent';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { COUTURE_FINISHES } from '../data/products';
import { useWindowSize } from '../hooks/useWindowSize';
import type { ProductFinish, FinishOption } from '../types/product';

export interface HeroSectionProps {
  selectedFinish: ProductFinish;
  onSelectFinish: (finish: ProductFinish) => void;
  onExploreClick: () => void;
  onInspectClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedFinish,
  onSelectFinish,
  onExploreClick,
  onInspectClick,
}) => {
  const { isMobile } = useWindowSize();
  const currentFinish = COUTURE_FINISHES.find((f) => f.id === selectedFinish) || COUTURE_FINISHES[0];

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-28 pb-16"
    >
      {/* Layer 1 & 2: Deep Void Base + Atmospheric Gradients */}
      <div className="absolute inset-0 bg-[#060709]" />
      <div className="absolute inset-0 cinematic-radial-glow" />
      <div className="absolute inset-0 cinematic-vignette" />
      <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

      {/* Floating Diya Embers / Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-amber-400/60 blur-[1px] animate-float-gentle" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-amber-300/40 blur-[1px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-amber-200/50 animate-float-gentle" style={{ animationDelay: '1.5s' }} />
      </div>

      {isMobile ? (
        /* Mobile-First Layout: Dedicated 3D Interactive Stage + High-Impact Hierarchy */
        <div className="relative z-10 w-full px-5 py-6 flex flex-col text-left">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="accent" className="text-[9px] tracking-widest font-mono-tech border-amber-500/30 text-amber-300 bg-amber-500/10">
              AUTUMN FESTIVE COUTURE 2026
            </Badge>
            <span className="flex items-center gap-1 text-[10px] text-amber-400/80 font-mono-tech">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" /> ATELIER INDIA
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-display font-black text-3xl tracking-tight text-white leading-tight uppercase mb-4">
            WEAVING DREAMS <br />
            <span className="animate-gold-shimmer block text-amber-300">
              IN PURE GOLD.
            </span>
          </h1>

          {/* Dedicated Interactive 3D Jewel Stage */}
          <div className="relative w-full h-[320px] my-2 rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-black/60 border border-amber-500/25 gold-border-glow">
            {/* Celestial Concentric Mandala Aura */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-dashed border-amber-400/20 animate-spin-slow" />
              <div className="absolute w-48 h-48 rounded-full border border-amber-400/15 animate-spin-reverse-slow" />
              <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-amber-500/10 via-amber-300/15 to-transparent blur-xl animate-pulse-glow" />
            </div>

            {/* 3D Scene */}
            <div className="w-full h-full relative z-10">
              <Scene
                finish={selectedFinish}
                productPosition={[0, 0, 0]}
                productScale={0.52}
                className="w-full h-full"
              />
            </div>

            {/* Floating Touch Hint Pill */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-amber-400/30 text-[10px] font-mono-tech text-amber-200 backdrop-blur-md shadow-lg animate-float-gentle">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin-slow" />
              <span>TOUCH & DRAG TO SPIN 360°</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-neutral-300 text-xs leading-relaxed my-3 font-normal">
            Centuries of royal Indian textile mastery sculpted for the modern muse. Hand-tied Jaipuri bandhani, pure mulberry silk, bullion zardozi embroidery.
          </p>

          {/* Colorway Switcher */}
          <div className="p-3 my-2 rounded-2xl bg-white/[0.03] border border-amber-500/20 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400">
                ROYAL PALETTE:
              </span>
              <span className="text-[10px] font-mono-tech font-bold text-amber-400 uppercase">
                {currentFinish.name}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {COUTURE_FINISHES.map((finish: FinishOption) => {
                const isSelected = selectedFinish === finish.id;
                return (
                  <button
                    key={finish.id}
                    onClick={() => onSelectFinish(finish.id)}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all duration-200 border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)] scale-102'
                        : 'bg-transparent border-white/5 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center"
                      style={{ backgroundColor: finish.colorCode }}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#fff]" />
                      )}
                    </div>
                    <span className="text-[9px] font-mono-tech text-neutral-300 truncate w-full text-center">
                      {finish.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 my-3">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={onExploreClick}
              className="w-full justify-center bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 border-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.3)] text-xs font-bold"
            >
              EXPLORE COUTURE
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={<Eye className="w-4 h-4" />}
              onClick={onInspectClick}
              className="w-full justify-center border-amber-400/30 hover:border-amber-400/60 text-amber-100 text-xs"
            >
              360° ATELIER VIEW
            </Button>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.08] text-center">
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block text-[9px] text-neutral-400 font-mono-tech uppercase">Fabric</span>
              <span className="block text-xs font-bold text-amber-200 font-mono-tech mt-0.5">Mulberry Silk</span>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block text-[9px] text-neutral-400 font-mono-tech uppercase">Craft</span>
              <span className="block text-xs font-bold text-amber-200 font-mono-tech mt-0.5">Bullion Zardozi</span>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block text-[9px] text-neutral-400 font-mono-tech uppercase">Fitting</span>
              <span className="block text-xs font-bold text-amber-200 font-mono-tech mt-0.5">Bespoke Fit</span>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Layout: Cinematic Side-by-Side 3D Canvas Rig */
        <>
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
            <Scene
              finish={selectedFinish}
              productPosition={[1.4, -0.05, 0]}
              productScale={0.58}
              className="w-full h-full"
            />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-center min-h-[calc(100vh-140px)] pointer-events-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
              <div className="lg:col-span-6 xl:col-span-7">
                <HeroContent
                  selectedFinish={selectedFinish}
                  onSelectFinish={onSelectFinish}
                  onExploreClick={onExploreClick}
                  onInspectClick={onInspectClick}
                />
              </div>
              <div className="lg:col-span-6 xl:col-span-5 h-64 lg:h-[500px] pointer-events-none" />
            </div>
          </div>
        </>
      )}

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <a href="#featured" className="flex flex-col items-center gap-1 text-[10px] font-mono-tech tracking-widest text-neutral-400 uppercase">
          <span>DISCOVER COLLECTION</span>
          <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

