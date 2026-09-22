import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const CTASection: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [reserved, setReserved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setReserved(true);
    }
  };

  return (
    <section id="cta" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#14101b]/95 via-[#0c0912]/95 to-[#06070a] border border-amber-500/25 p-8 sm:p-14 lg:p-20 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.9)] text-center">
        {/* Ambient Top Warm Amber Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="accent" className="text-[10px] font-mono-tech border-amber-500/30 text-amber-300 bg-amber-500/10">
              BRIDAL & FESTIVE COUTURE 2026
            </Badge>
            <span className="text-xs text-amber-400 font-mono-tech flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> BESPOKE ATELIER SLOTS
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            BOOK YOUR BESPOKE <br />
            STYLING CONSULTATION.
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Connect directly with our master couturiers in New Delhi or Mumbai for personalized bridal fittings, custom colorway weaves, and expedited festive delivery.
          </p>

          {reserved ? (
            <div className="p-6 rounded-2xl bg-amber-500/15 border border-amber-500/30 max-w-md mx-auto flex items-center justify-center gap-3 text-white font-mono-tech text-sm animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>CONSULTATION SCHEDULED: OUR ATELIER CONCIERGE WILL CONTACT YOU</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter WhatsApp / Mobile (+91)..."
                className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.05] border border-amber-500/20 text-white placeholder:text-neutral-500 text-xs sm:text-sm font-mono-tech focus:outline-none focus:border-amber-400/50 backdrop-blur-xl transition-all"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="whitespace-nowrap bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                REQUEST APPOINTMENT
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 pt-4 text-[11px] text-neutral-400 font-mono-tech">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Pan-India Express Delivery
            </span>
            <span>•</span>
            <span>Worldwide Insured Shipping</span>
          </div>
        </div>
      </div>
    </section>
  );
};
