"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLotCounters } from "@/data/villages";

const DISMISS_KEY = "vbDismissUntil";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function VillageTicker() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Hidden on village pages
  const isVillagePage = pathname.startsWith("/volzhsky-bereg");

  useEffect(() => {
    if (isVillagePage) {
      setVisible(false);
      return;
    }
    try {
      const until = localStorage.getItem(DISMISS_KEY);
      if (until && Date.now() < Number(until)) {
        setVisible(false);
        return;
      }
    } catch {
      // SSR / localStorage not available
    }
    setVisible(true);
  }, [isVillagePage, pathname]);

  if (!visible || isVillagePage) return null;

  const { available } = getLotCounters();

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION_MS));
    } catch {
      // ignore
    }
    setVisible(false);
    window.dispatchEvent(new Event("vb-ticker-closed"));
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-9 bg-accent flex items-center"
      role="banner"
      aria-label="Акция Волжский Берег"
    >
      <div className="flex-1 flex items-center justify-center gap-3 px-10">
        {/* House icon */}
        <svg
          className="w-4 h-4 text-white shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span className="text-white text-xs font-semibold">
          Волжский Берег · осталось{" "}
          <strong>{available} дома</strong>
        </span>
        <Link
          href="/volzhsky-bereg#plan"
          className="text-white/90 text-xs font-semibold underline underline-offset-2 hover:text-white transition-colors whitespace-nowrap"
        >
          Смотреть →
        </Link>
      </div>

      {/* Dismiss */}
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 text-white/70 hover:text-white transition-colors p-1"
        aria-label="Закрыть"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
