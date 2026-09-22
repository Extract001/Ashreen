import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initializes luxury scroll animations across sections.
 * Returns a cleanup function.
 */
export function initScrollAnimations(reducedMotion: boolean = false): () => void {
  if (reducedMotion || typeof window === 'undefined') {
    return () => {};
  }

  const ctx = gsap.context(() => {
    // 1. Featured Products section entrance
    gsap.from('#featured .group', {
      scrollTrigger: {
        trigger: '#featured',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // 2. Showcase section deconstructed reveal
    gsap.from('#showcase h2, #showcase p', {
      scrollTrigger: {
        trigger: '#showcase',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // 3. Story Section metrics count-up / fade
    gsap.from('#story h2, #story p', {
      scrollTrigger: {
        trigger: '#story',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    });
  });

  return () => ctx.revert();
}
