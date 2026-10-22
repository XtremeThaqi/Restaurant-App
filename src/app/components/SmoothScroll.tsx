"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const root = useRef<LenisRef>(null);
  useEffect(() => {
    const positionOf = (target: HTMLElement) => scrollY + target.getBoundingClientRect().top
      - (parseFloat(getComputedStyle(target).scrollMarginTop) || 0)
      - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
    const scrollTo = (position: number, immediate = false) => {
      const lenis = root.current?.lenis;
      if (!lenis) return;
      // Native focus, scrollbar dragging or browser history can move before the
      // scroll event reaches Lenis. Synchronize first, including its target position.
      lenis.scrollTo(window.scrollY, { immediate: true });
      lenis.scrollTo(position, { immediate });
    };
    // Lenis handles the animation; preserve URL history and target focus without
    // the browser's simultaneous default anchor jump interrupting that animation.
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target || !root.current?.lenis) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      target.focus({ preventScroll: true });
      scrollTo(positionOf(target));
    };
    const restoreHash = () => {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      // Hash navigation may already have moved the native scroll position before
      // Lenis receives its scroll event. Use document coordinates, not stale animation state.
      const position = target ? positionOf(target) : 0;
      scrollTo(position, true);
    };
    const revealHeroFocus = (event: FocusEvent) => {
      const target = event.target;
      // Sticky elements can be geometrically in view but occluded by the Menu.
      // Reverse keyboard navigation must reveal the control receiving focus.
      if (target instanceof HTMLElement && target.closest(".hero-scroll")) {
        const rect = target.getBoundingClientRect();
        const foreground = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        if (!target.contains(foreground)) scrollTo(0);
      }
    };
    document.addEventListener("click", navigate);
    document.addEventListener("focusin", revealHeroFocus);
    window.addEventListener("popstate", restoreHash);
    window.addEventListener("hashchange", restoreHash);
    return () => {
      document.removeEventListener("click", navigate);
      document.removeEventListener("focusin", revealHeroFocus);
      window.removeEventListener("popstate", restoreHash);
      window.removeEventListener("hashchange", restoreHash);
    };
  }, []);
  return <ReactLenis ref={root} root options={{ autoRaf: true, anchors: false, lerp: 0.12, smoothWheel: true, syncTouch: false, respectReducedMotion: true }}>{children}</ReactLenis>;
}
