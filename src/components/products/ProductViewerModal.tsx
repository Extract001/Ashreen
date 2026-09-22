import React, { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { X, ShieldCheck, Check, Sparkles, Image as ImageIcon, Box } from 'lucide-react';
import type { Product, ProductFinish } from '../../types/product';
import { RoyalMandala3D, ROYAL_FINISH_SPECS } from '../3d/RoyalMandala3D';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export interface ProductViewerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, finish: ProductFinish, size?: string) => void;
}

export const ProductViewerModal: React.FC<ProductViewerModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>('emerald');
  const [selectedSize, setSelectedSize] = useState<string>('M (38)');
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');

  useEffect(() => {
    if (product) {
      setSelectedFinish(product.defaultFinish);
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[2] || product.sizes[0]);
      }
    }
  }, [product]);

  useEffect(() => {
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

  if (!isOpen || !product) return null;

  const currentFinishSpec = ROYAL_FINISH_SPECS[selectedFinish] || ROYAL_FINISH_SPECS.emerald;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#080a0f] border border-amber-500/20 rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.95)] z-10 flex flex-col lg:flex-row animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Dual Mode (High-Fashion Model Photo or 360° Royal 3D Jewel Orbit) */}
        <div className="relative w-full lg:w-3/5 h-1/2 lg:h-full bg-gradient-to-b from-[#0e121a] to-[#050608] flex items-center justify-center overflow-hidden">
          {/* Mode Switcher Buttons */}
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2 p-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md">
            <button
              onClick={() => setViewMode('photo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech transition-all ${
                viewMode === 'photo'
                  ? 'bg-amber-400 text-black font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> EDITORIAL LOOK
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech transition-all ${
                viewMode === '3d'
                  ? 'bg-amber-400 text-black font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" /> 3D KUNDAN JEWEL
            </button>
          </div>

          {viewMode === 'photo' ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black/90">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain max-h-full transition-transform duration-500"
              />
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[11px] font-mono-tech text-amber-200/80 pointer-events-none">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-amber-400" /> {product.craftOrigin}
                </span>
                <span className="hidden sm:inline">AUTHENTIC ARTISAN HANDWEAVE</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {/* Subtle Ambient Radial Glow */}
              <div
                className="absolute inset-0 opacity-25 blur-3xl pointer-events-none transition-colors duration-700"
                style={{
                  background: `radial-gradient(circle at center, ${currentFinishSpec.glowColor} 0%, transparent 70%)`,
                }}
              />

              <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
              >
                <ambientLight intensity={0.6} color="#fef3c7" />
                <directionalLight position={[5, 5, 5]} intensity={2.0} color="#fffbeb" />
                <directionalLight
                  position={[-5, 2, -3]}
                  intensity={1.5}
                  color={currentFinishSpec.glowColor}
                />
                <pointLight position={[0, -2, 2]} intensity={0.8} color="#f59e0b" />

                <Suspense fallback={null}>
                  <RoyalMandala3D
                    finish={selectedFinish}
                    scale={0.72}
                    floatingEnabled={false}
                    interactiveRotation={false}
                  />
                  <ContactShadows
                    position={[0, -2.2, 0]}
                    opacity={0.6}
                    scale={7}
                    blur={2.2}
                    far={4}
                    color="#000000"
                  />
                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={3.2}
                    maxDistance={7.5}
                    autoRotate
                    autoRotateSpeed={0.8}
                  />
                </Suspense>
              </Canvas>

              {/* Interactive Hint */}
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[11px] font-mono-tech text-amber-200/80 pointer-events-none">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-amber-400" /> DRAG TO ROTATE // SCROLL TO ZOOM
                </span>
                <span className="hidden sm:inline">24K GOLD FILIGREE REAL-TIME SHADER</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Specifications, Sizing & Configuration */}
        <div className="w-full lg:w-2/5 h-1/2 lg:h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-amber-500/15 bg-[#080a0f]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="accent" className="text-[10px] font-mono-tech bg-amber-500/10 border-amber-500/30 text-amber-300">
                {product.category}
              </Badge>
              {product.designNumber && (
                <span className="text-xs text-amber-400 font-mono-tech font-bold">
                  {product.designNumber}
                </span>
              )}
            </div>

            <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase mb-2">
              {product.name}
            </h2>

            <p className="text-2xl font-mono-tech font-bold text-amber-300 mb-4">
              ₹{product.price.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-neutral-400 font-normal">INR (Taxes Included)</span>
            </p>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
              {product.longDescription || product.description}
            </p>

            {/* Bespoke Sizing Selector */}
            {product.sizes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono-tech uppercase tracking-widest text-neutral-400">
                    Bespoke Size / Fit
                  </label>
                  <span className="text-[11px] text-amber-400 font-mono-tech">
                    Size Guide (India/UK)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-mono-tech transition-all ${
                        selectedSize === sz
                          ? 'bg-amber-400 text-black font-bold border-amber-300 shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-neutral-300 hover:border-amber-400/40'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Finish Colorway Selector */}
            <div className="mb-6">
              <label className="block text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-2">
                Royal Colorway Palette
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.finishes.map((f) => {
                  const isSelected = selectedFinish === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFinish(f.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400/60 text-white'
                          : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: f.colorCode }}
                      />
                      <span className="text-xs font-mono-tech truncate">{f.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Craft & Textile Specifications */}
            <div className="mb-6">
              <label className="block text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-2">
                Textile & Handcraft Details
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech">
                {product.specs.map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="block text-[10px] text-neutral-400 uppercase">{spec.label}</span>
                    <span className="block text-amber-200 font-medium mt-0.5">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-white/[0.08] space-y-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 font-bold"
              onClick={() => {
                onAddToCart(product, selectedFinish, selectedSize);
                onClose();
              }}
            >
              RESERVE ATELIER PIECE (₹{product.price.toLocaleString('en-IN')})
            </Button>
            <div className="flex items-center justify-center gap-2 text-[11px] text-amber-300/80 font-mono-tech">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Complimentary Pan-India Insured Express Courier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
