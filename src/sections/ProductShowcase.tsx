import React, { useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Gem, Layers, Scissors, ArrowRight, ShieldCheck } from 'lucide-react';

export interface ProductShowcaseProps {
  onInspectFlagship: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onInspectFlagship,
}) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'zardozi',
      icon: <Gem className="w-5 h-5 text-amber-400" />,
      tag: 'IMPERIAL EMBROIDERY',
      title: 'Hand-Cut Zirkin Stone & Bullion Zardozi',
      description:
        'D.No-7223 features over 72 hours of meticulous needlework by master Lucknowi artisans. Genuine gold-plated metallic coils (zari) are hand-twisted with faceted zirkin stones to create dimensional floral crests that shimmer under banquet chandeliers.',
      specs: [
        { label: 'Technique', value: 'Bullion Zari & Zirkin' },
        { label: 'Artisan Hours', value: '72+ Dedicated Hours' },
        { label: 'Origin Guild', value: 'Lucknow Atelier' },
      ],
    },
    {
      id: 'bandhani',
      icon: <Layers className="w-5 h-5 text-lime-400" />,
      tag: 'HERITAGE TEXTILE',
      title: 'Jaipur Hand-Tied Resist Bandhani',
      description:
        'A centuries-old textile craft of Rajasthan. Thousands of microscopic knots are pinched and tightly bound by hand using cotton thread before immersion in bespoke botanical dye baths, revealing luminous constellation dots upon pure mulberry silk.',
      specs: [
        { label: 'Craft Cluster', value: 'Jaipur, Rajasthan' },
        { label: 'Silk Base', value: '100% Mulberry Silk' },
        { label: 'Dye Method', value: 'Resist Dip Dye' },
      ],
    },
    {
      id: 'tailoring',
      icon: <Scissors className="w-5 h-5 text-rose-400" />,
      tag: 'ROYAL PATTERN DRAFTING',
      title: 'Bespoke Indian Silhouette & Flares',
      description:
        'Every peplum kurti, collared shirt-tunic, and flared sharara is drafted with precision proportioning to celebrate feminine grace. Designed with hidden pockets, breathable lining, and custom made-to-measure sizing.',
      specs: [
        { label: 'Sizing Scope', value: 'XS to Custom Fit' },
        { label: 'Lining Fabric', value: 'Mulmul & Pure Crepe' },
        { label: 'Finishing', value: 'Concealed Seams' },
      ],
    },
  ];

  const current = features[activeFeature];

  return (
    <section id="showcase" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Background warm amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <Badge variant="accent" className="text-[10px] font-mono-tech mb-4 border-amber-500/30 text-amber-300 bg-amber-500/10">
          ATELIER METIER // CRAFTSMANSHIP
        </Badge>
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight mb-4">
          THE ARTISAN MASTERY OF INDIA.
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm font-mono-tech max-w-xl mx-auto leading-relaxed">
          Preserving centuries-old Indian handloom traditions through contemporary royal aesthetics and zero-compromise textile selection.
        </p>
      </div>

      {/* Feature Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {features.map((feat, idx) => {
          const isSelected = activeFeature === idx;
          return (
            <button
              key={feat.id}
              onClick={() => setActiveFeature(idx)}
              className={`p-6 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#121520] border-amber-500/40 shadow-[0_8px_32px_rgba(245,158,11,0.15)] scale-[1.02]'
                  : 'bg-white/[0.02] border-white/5 hover:border-amber-500/20 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  {feat.icon}
                </div>
                <span className="text-xs font-mono-tech text-amber-400 font-bold">
                  0{idx + 1}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-amber-300 block mb-1">
                  {feat.tag}
                </span>
                <h4 className="font-display font-bold text-sm sm:text-base text-white line-clamp-1">
                  {feat.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Feature Deep Dive Display */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0b0d14]/95 border border-amber-500/20 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[0_24px_64px_rgba(0,0,0,0.85)]">
        <div className="lg:col-span-7 space-y-6">
          <Badge variant="subtle" className="text-[10px] font-mono-tech text-amber-300 border-amber-500/30">
            {current.tag}
          </Badge>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase leading-snug">
            {current.title}
          </h3>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
            {current.description}
          </p>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.08]">
            {current.specs.map((spec, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-amber-500/15">
                <span className="block text-[10px] text-neutral-400 font-mono-tech uppercase">
                  {spec.label}
                </span>
                <span className="block text-sm font-bold text-amber-200 font-mono-tech mt-1">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={onInspectFlagship}
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 font-bold"
            >
              EXPLORE SIGNATURE PIECE
            </Button>
          </div>
        </div>

        {/* Technical Schematic / Artisan Certification Graphic */}
        <div className="lg:col-span-5 flex items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-amber-500/[0.05] to-transparent border border-amber-500/20 min-h-[280px] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
            <div className="w-64 h-64 border border-dashed border-amber-300 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-44 h-44 border border-amber-400 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </div>

          <div className="text-center relative z-10 space-y-3">
            <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-300 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="font-display font-bold text-lg text-white uppercase">
              AUTHENTIC INDIAN HANDCRAFT
            </div>
            <p className="text-xs font-mono-tech text-neutral-400 max-w-xs mx-auto">
              Certified pure silk and hand-embroidered by multigenerational artisan families.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
