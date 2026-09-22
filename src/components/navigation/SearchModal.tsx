import React, { useState } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { LUXURY_PRODUCTS } from '../../data/products';
import type { Product } from '../../types/product';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? LUXURY_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.specs.some(
            (s) =>
              s.label.toLowerCase().includes(query.toLowerCase()) ||
              s.value.toLowerCase().includes(query.toLowerCase())
          )
      )
    : LUXURY_PRODUCTS;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal dialog */}
      <div className="relative w-full max-w-2xl bg-[#0d1017] border border-white/10 rounded-2xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.8)] z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-sky-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search acoustics, timepieces, materials..."
              className="bg-transparent text-white text-base sm:text-lg focus:outline-none w-full placeholder:text-neutral-500 font-display"
              autoFocus
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-sm text-neutral-400 font-mono-tech">
              No matching acoustic units or specifications located.
            </p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="group p-4 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest">
                      {item.category}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-xs font-mono-tech text-amber-200">
                      ₹{item.price.toLocaleString('en-IN')} INR
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display mt-0.5 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                    {item.fabric} • {item.craftOrigin}
                  </p>
                </div>

                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex justify-between text-[11px] text-neutral-400 font-mono-tech">
          <span>{filtered.length} ARCHITECTURAL UNITS</span>
          <span>ESC TO DISMISS</span>
        </div>
      </div>
    </div>
  );
};
