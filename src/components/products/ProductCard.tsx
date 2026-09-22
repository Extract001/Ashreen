import React, { useRef, useState } from 'react';
import { Eye, Plus, Check, Star, Sparkles } from 'lucide-react';
import type { Product } from '../../types/product';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

export interface ProductCardProps {
  product: Product;
  onInspect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onInspect,
  onAddToCart,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? -8 : 0}px)`,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.3s ease'
          : 'transform 0.5s ease-out, box-shadow 0.5s ease',
      }}
      className={cn(
        'group relative rounded-3xl bg-[#0c0e14]/90 border border-amber-500/15 backdrop-blur-2xl p-5 flex flex-col justify-between overflow-hidden cursor-pointer select-none',
        'hover:border-amber-400/40 hover:shadow-[0_24px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.15)]'
      )}
    >
      {/* Dynamic Ambient Gold Mesh */}
      <div
        className={cn(
          'absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-15 transition-opacity duration-700 pointer-events-none group-hover:opacity-35',
          `bg-gradient-to-br ${product.accentGradient}`
        )}
      />

      {/* Top Meta Bar */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="subtle" className="text-[10px] font-mono-tech tracking-wider text-amber-200 border-amber-500/20 bg-amber-500/10">
            {product.category}
          </Badge>
          {product.designNumber && (
            <span className="text-[10px] font-mono-tech text-amber-400 font-bold px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/30">
              {product.designNumber}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs font-mono-tech text-amber-400">
          <Star className="w-3 h-3 fill-amber-400" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Outfit High-Fashion Model Image Preview */}
      <div
        onClick={() => onInspect(product)}
        className="relative z-10 rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-white/10 group-hover:border-amber-400/30 transition-all duration-500"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Ambient Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Floating Atelier Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono-tech text-amber-200">
          <Sparkles className="w-2.5 h-2.5 text-amber-400" /> {product.craftOrigin.split(',')[0]}
        </div>

        {/* Hover Inspect Trigger Overlay */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-4 py-1.5 rounded-full bg-black/80 border border-amber-400/50 text-amber-200 text-xs font-mono-tech tracking-wider flex items-center gap-2 backdrop-blur-md shadow-lg">
            <Eye className="w-3.5 h-3.5 text-amber-400" /> VIEW ATELIER DETAILS
          </span>
        </div>
      </div>

      {/* Product Details & Pricing in INR (₹) */}
      <div className="relative z-10 mt-4 pt-3 border-t border-white/[0.08]">
        <div className="flex items-baseline justify-between mb-1.5">
          <h3 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors truncate mr-2">
            {product.name}
          </h3>
          <span className="text-base font-mono-tech font-bold text-amber-300 tracking-wider whitespace-nowrap">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4 font-normal">
          {product.description}
        </p>

        {/* Bottom Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="glass"
            size="sm"
            className="flex-1 text-[11px] border-amber-500/20 hover:border-amber-400/50 text-amber-200"
            icon={<Eye className="w-3.5 h-3.5 text-amber-400" />}
            onClick={(e) => {
              e.stopPropagation();
              onInspect(product);
            }}
          >
            INSPECT COUTURE
          </Button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
              setIsAdded(true);
              setTimeout(() => setIsAdded(false), 1600);
            }}
            className={cn(
              "p-2.5 rounded-full transition-all duration-300 active:scale-90 border",
              isAdded
                ? "bg-amber-400 text-black border-amber-300 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                : "bg-amber-400/15 hover:bg-amber-400 text-amber-300 hover:text-black border-amber-400/30 hover:scale-105"
            )}
            aria-label="Add to Bag"
          >
            {isAdded ? (
              <Check className="w-4 h-4 text-black animate-in zoom-in duration-200" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
