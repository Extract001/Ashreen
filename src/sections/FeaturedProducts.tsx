import React, { useRef, useState } from 'react';
import type { Product } from '../types/product';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductCard } from '../components/products/ProductCard';
import { Badge } from '../components/ui/Badge';
import { Sparkles, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { useWindowSize } from '../hooks/useWindowSize';

export interface FeaturedProductsProps {
  products: Product[];
  onInspect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onInspect,
  onAddToCart,
}) => {
  const { isMobile } = useWindowSize();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileView, setMobileView] = useState<'swipe' | 'grid'>('swipe');

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const cardWidth = offsetWidth * 0.82;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(products.length - 1, Math.max(0, index)));
  };

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth * 0.82;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section id="featured" className="relative py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="subtle" className="text-[10px] font-mono-tech border-amber-500/20 text-amber-300 bg-amber-500/10">
              FESTIVE PRET & COUTURE // RELEASE 01
            </Badge>
            <span className="text-xs text-amber-400 font-mono-tech flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin-slow" /> ALLOCATION OPEN
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
            ROYAL ATELIER PIECES.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md leading-relaxed font-mono-tech">
            From hand-set zirkin stone velvet shararas to authentic Jaipuri bandhani silks, each silhouette is crafted for Indian festive celebrations.
          </p>

          {/* Mobile View Toggle */}
          {isMobile && (
            <div className="flex items-center self-start gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setMobileView('swipe')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono-tech uppercase transition-all ${
                  mobileView === 'swipe'
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" /> Runway Swipe
              </button>
              <button
                onClick={() => setMobileView('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono-tech uppercase transition-all ${
                  mobileView === 'grid'
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3 h-3" /> Full Grid
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Render Mobile Swipe or Desktop Grid */}
      {isMobile && mobileView === 'swipe' ? (
        <div className="relative">
          {/* Horizontal Swipe Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1 px-1 -mx-5 px-5"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[82vw] max-w-[320px] flex-shrink-0 snap-center transition-transform duration-300"
              >
                <ProductCard
                  product={product}
                  onInspect={onInspect}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>

          {/* Swipe Controls & Dot Indicators */}
          <div className="flex items-center justify-between mt-4 px-2">
            <span className="text-[11px] font-mono-tech text-amber-300/80">
              OUTFIT 0{activeIndex + 1} // 0{products.length}
            </span>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? 'w-6 bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                      : 'w-1.5 bg-white/20'
                  }`}
                  aria-label={`Go to outfit ${i + 1}`}
                />
              ))}
            </div>

            {/* Chevrons */}
            <div className="flex items-center gap-1.5">
              <button
                disabled={activeIndex === 0}
                onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                className="p-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none active:scale-90"
                aria-label="Previous Outfit"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={activeIndex === products.length - 1}
                onClick={() => scrollToCard(Math.min(products.length - 1, activeIndex + 1))}
                className="p-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none active:scale-90"
                aria-label="Next Outfit"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ProductGrid
          products={products}
          onInspect={onInspect}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
};
