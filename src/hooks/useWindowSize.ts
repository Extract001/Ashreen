import { useEffect, useState } from 'react';

export type DeviceTier = 'mobile' | 'tablet' | 'desktop';

export interface WindowMetrics {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceTier: DeviceTier;
  particleBudget: number;
  targetDpr: number;
}

export function useWindowSize(): WindowMetrics {
  const [metrics, setMetrics] = useState<WindowMetrics>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const height = typeof window !== 'undefined' ? window.innerHeight : 900;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;
    const deviceTier: DeviceTier = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    const particleBudget = isMobile ? 350 : isTablet ? 700 : 1600;
    const targetDpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1.5, 2);

    return {
      width,
      height,
      isMobile,
      isTablet,
      isDesktop,
      deviceTier,
      particleBudget,
      targetDpr,
    };
  });

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width < 640;
        const isTablet = width >= 640 && width < 1024;
        const isDesktop = width >= 1024;
        const deviceTier: DeviceTier = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
        const particleBudget = isMobile ? 350 : isTablet ? 700 : 1600;
        const targetDpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1.5, 2);

        setMetrics({
          width,
          height,
          isMobile,
          isTablet,
          isDesktop,
          deviceTier,
          particleBudget,
          targetDpr,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return metrics;
}
