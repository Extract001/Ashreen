import React from 'react';
import { Globe, MapPin } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative border-t border-amber-500/15 bg-[#050608] pt-16 pb-12 px-6 sm:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                <span className="font-display font-black text-sm text-amber-300">अ</span>
              </div>
              <span className="font-display font-bold text-lg tracking-[0.25em] text-white">
                ASHREEN
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono-tech leading-relaxed max-w-sm">
              Haute couture house celebrating Indian textile heritage. Hand-tied Bandhani, pure Mulberry silk, bullion Zardozi, and bespoke royal craftsmanship.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono-tech text-amber-300 uppercase tracking-widest mb-4">
              Couture Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-mono-tech">
              <li><a href="#featured" className="hover:text-amber-200 transition-colors">Emerald Velvet Sharara</a></li>
              <li><a href="#featured" className="hover:text-amber-200 transition-colors">Chartreuse Bandhani</a></li>
              <li><a href="#featured" className="hover:text-amber-200 transition-colors">Gulabi Chanderi Co-Ord</a></li>
              <li><a href="#featured" className="hover:text-amber-200 transition-colors">Royal Indigo Sharara</a></li>
              <li><a href="#featured" className="hover:text-amber-200 transition-colors">Kashmiri Ochre Tunic</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-mono-tech text-amber-300 uppercase tracking-widest mb-4">
              Artisan Ateliers
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-mono-tech">
              <li><a href="#showcase" className="hover:text-amber-200 transition-colors">Lucknow Zardozi Guild</a></li>
              <li><a href="#showcase" className="hover:text-amber-200 transition-colors">Jaipur Bandhani Clusters</a></li>
              <li><a href="#showcase" className="hover:text-amber-200 transition-colors">Varanasi Handloom Silk</a></li>
              <li><a href="#story" className="hover:text-amber-200 transition-colors">Bespoke Fit Studio</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-mono-tech text-amber-300 uppercase tracking-widest mb-4">
              Flagship Salons
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-mono-tech">
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-amber-400" /> New Delhi — Mehrauli</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-amber-400" /> Mumbai — Kala Ghoda</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-amber-400" /> Jaipur — C-Scheme</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-amber-400" /> London // Dubai Suites</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-mono-tech text-amber-300 uppercase tracking-widest mb-4">
              Client Region
            </h4>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-amber-500/20 text-xs font-mono-tech text-amber-200">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>INDIA // INR (₹)</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono-tech mt-2">
              Pan-India insured express transit via Blue Dart Apex.
            </p>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-mono-tech">
          <p>© 2026 ASHREEN HAUTE COUTURE ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-amber-200 transition-colors">BESPOKE POLICY</a>
            <a href="#hero" className="hover:text-amber-200 transition-colors">PAN-INDIA SHIPPING</a>
            <a href="#hero" className="hover:text-amber-200 transition-colors">AUTHENTICITY LEDGER</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
