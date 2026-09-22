import { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { CartDrawer } from './components/navigation/CartDrawer';
import { SearchModal } from './components/navigation/SearchModal';
import { HeroSection } from './sections/HeroSection';
import { FeaturedProducts } from './sections/FeaturedProducts';
import { ProductShowcase } from './sections/ProductShowcase';
import { StorySection } from './sections/StorySection';
import { CTASection } from './sections/CTASection';
import { FooterSection } from './sections/FooterSection';
import { ProductViewerModal } from './components/products/ProductViewerModal';
import { MobileBottomDock } from './components/navigation/MobileBottomDock';
import { LUXURY_PRODUCTS } from './data/products';
import type { Product, ProductFinish } from './types/product';
import { initScrollAnimations } from './animations/gsapAnimations';
import { useReducedMotion } from './hooks/useReducedMotion';

export function App() {
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>('emerald');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const reducedMotion = useReducedMotion();

  // Initialize GSAP scroll animations
  useEffect(() => {
    const cleanup = initScrollAnimations(reducedMotion);
    return cleanup;
  }, [reducedMotion]);

  // Toast notification helper
  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3500);
  };

  const handleInspectProduct = (product: Product) => {
    setActiveModalProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product, _finish?: ProductFinish, size?: string) => {
    setCartCount((prev) => prev + 1);
    const chosenSize = size || 'M (38)';
    showToast(`Reserved 1x ${product.name} (${chosenSize}) • ₹${product.price.toLocaleString('en-IN')}`);
  };

  const handleExploreClick = () => {
    const el = document.getElementById('featured');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInspectFlagship = () => {
    handleInspectProduct(LUXURY_PRODUCTS[0]);
  };

  return (
    <div className="relative min-h-screen bg-[#06070a] text-white selection:bg-amber-400 selection:text-black">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#121520]/95 border border-amber-400/40 text-amber-200 text-xs font-mono-tech shadow-[0_8px_32px_rgba(0,0,0,0.85)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          ✦ {toastMessage}
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        cartCount={cartCount}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Fullscreen Cinematic 3D Hero */}
        <HeroSection
          selectedFinish={selectedFinish}
          onSelectFinish={setSelectedFinish}
          onExploreClick={handleExploreClick}
          onInspectClick={handleInspectFlagship}
        />

        {/* 2. Featured Products (5 Real Outfit Images with 3D Tilt Cards) */}
        <FeaturedProducts
          products={LUXURY_PRODUCTS}
          onInspect={handleInspectProduct}
          onAddToCart={(p) => handleAddToCart(p, p.defaultFinish)}
        />

        {/* 3. Royal Craft / Artisan Metier Showcase */}
        <ProductShowcase onInspectFlagship={handleInspectFlagship} />

        {/* 4. Brand Heritage & Artisan Guilds */}
        <StorySection />

        {/* 5. Bespoke Consultation & Festive Appointment CTA */}
        <CTASection />
      </main>

      {/* 6. Minimalist Luxury Footer */}
      <FooterSection />

      {/* 360° Interactive Orbit Viewer & Lookbook Modal */}
      <ProductViewerModal
        product={activeModalProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Reserved Allocation Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedFinish={selectedFinish}
      />

      {/* Luxury Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleInspectProduct}
      />

      {/* Mobile Floating Action Dock */}
      <MobileBottomDock
        onOpenCart={() => setIsCartOpen(true)}
        onOpenInspect={handleInspectFlagship}
        cartCount={cartCount}
      />
    </div>
  );
}

export default App;
