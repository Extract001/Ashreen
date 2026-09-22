import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Sparkles, ShieldCheck, Heart, Crown } from 'lucide-react';

export const StorySection: React.FC = () => {
  const pillars = [
    {
      icon: <Crown className="w-5 h-5 text-amber-400" />,
      title: 'Imperial Rajputana & Mughal Lineage',
      description:
        'Inspired by royal Indian court attire. We preserve regal silhouettes like flared peplums, layered shararas, and silk tunics adorned with authentic zirkin stones and bullion zari.',
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      title: 'Multigenerational Artisan Guilds',
      description:
        'Every knot of Bandhani and every strand of Zardozi is handcrafted by traditional master weavers in Jaipur, Varanasi, and Lucknow, ensuring livelihood and dignity for Indian artisan families.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Bespoke Couture Tailoring',
      description:
        'No mass manufacturing. Each piece is tailored to your exact measurements with customizable lengths, sleeve preferences, and lining adjustments for celebrations across the world.',
    },
  ];

  return (
    <section id="story" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story Editorial */}
        <div className="lg:col-span-6 space-y-6">
          <Badge variant="subtle" className="text-[10px] font-mono-tech border-amber-500/30 text-amber-300 bg-amber-500/10">
            <Sparkles className="w-3 h-3 mr-1 text-amber-400" /> ATELIER PHILOSOPHY
          </Badge>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            WHERE INDIAN HERITAGE <br />
            MEETS CINEMATIC COUTURE.
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Indian couture is a tapestry of living memory. From the royal palaces of Rajasthan to the ghats of Varanasi, each weave carries centuries of poetry, celebration, and architectural symmetry.
          </p>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            At ASHREEN, we bring this imperial heritage to the global stage through contemporary silhouettes, sculptural tailoring, and zero-compromise textile selection designed for the discerning Indian woman.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-amber-500/20">
            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-amber-300">
                72<span className="text-amber-400 text-lg">hrs</span>
              </span>
              <span className="block text-xs text-neutral-400 font-mono-tech uppercase mt-1">
                Hand-Zardozi Work
              </span>
            </div>
            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-amber-300">
                100<span className="text-amber-400 text-lg">%</span>
              </span>
              <span className="block text-xs text-neutral-400 font-mono-tech uppercase mt-1">
                Pure Indian Silk
              </span>
            </div>
            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-amber-300">
                19k<span className="text-amber-400 text-lg">+</span>
              </span>
              <span className="block text-xs text-neutral-400 font-mono-tech uppercase mt-1">
                India Pincodes
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Three Core Craftsmanship Pillars */}
        <div className="lg:col-span-6 space-y-4">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#0d0f16]/90 border border-amber-500/15 backdrop-blur-xl hover:border-amber-400/40 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
