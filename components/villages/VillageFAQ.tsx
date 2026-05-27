"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { village } from "@/data/villages";

export default function VillageFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 bg-warm" id="faq">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">
              Вопросы и ответы
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Частые вопросы
            </h2>
          </div>

          <div className="space-y-2">
            {village.faq.map((item, i) => (
              <div key={i} className="border border-border bg-white">
                <button
                  type="button"
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:text-accent transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-primary text-sm leading-snug">
                    {item.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-accent shrink-0 transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-muted text-sm leading-relaxed border-t border-border">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
