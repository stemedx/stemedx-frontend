"use client";

import { useEffect, useState, useRef } from "react";

// Global variables to control proportions
const TRACK_HEIGHT_RATIO = 0.2;
const THUMB_HEIGHT_RATIO = 0.2;

type BarStyle = { height: number; top: number };

export function CustomScrollbar() {
  const [barStyle, setBarStyle] = useState<BarStyle>({ height: 0, top: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const updateScrollbar = () => {
      const doc = document.documentElement;
      const viewport = window.innerHeight;
      const content = doc.scrollHeight;
      
      // Track height based on global ratio
      const trackHeight = viewport * TRACK_HEIGHT_RATIO;
      
      // Thumb height based on global ratio
      const thumbHeight = trackHeight * THUMB_HEIGHT_RATIO;

      const scrollable = Math.max(0, content - viewport);
      const scrollY = Math.max(0, window.scrollY);
      const scrollPct = scrollable > 0 ? scrollY / scrollable : 0;

      // Thumb position within track
      const thumbTop = scrollPct * (trackHeight - thumbHeight);

      setBarStyle({ height: thumbHeight, top: thumbTop });
      setIsVisible(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setIsVisible(false), 5000);
    };

    // Listen for scroll + resize
    window.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar);

    // initial
    updateScrollbar();

    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const [trackHeight, setTrackHeight] = useState(200);

  useEffect(() => {
    const updateTrackHeight = () => {
      setTrackHeight(window.innerHeight * TRACK_HEIGHT_RATIO);
    };
    
    updateTrackHeight();
    window.addEventListener('resize', updateTrackHeight);
    
    return () => window.removeEventListener('resize', updateTrackHeight);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed w-[6px] right-4 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 bg-gray-400/30 rounded-full pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        height: `${trackHeight}px`,
      }}
    >
      <div
        className="w-full rounded-full transition-transform duration-100 ease-out bg-gray-600"
        style={{
          height: `${barStyle.height}px`,
          transform: `translateY(${barStyle.top}px)`,
        }}
      />
    </div>
  );
}
