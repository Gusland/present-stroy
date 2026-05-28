"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(6, "Введите телефон"),
  message: z.string().optional(),
  honeypot: z.string().max(0, "").optional(),
});

type FormValues = z.infer<typeof schema>;

export type LeadType = "viewing" | "booking" | "callback" | "mortgage" | "info";

type Props = {
  type?: LeadType;
  lotId?: string;
  source?: string;
  utm?: Record<string, string>;
  messagePlaceholder?: string;
  ctaLabel?: string;
  className?: string;
  onSuccess?: () => void;
  dark?: boolean;
};

export default function LeadForm({
  type = "callback",
  lotId,
  source,
  utm,
  messagePlaceholder = "Комментарий (необязательно)",
  ctaLabel = "Отправить заявку",
  className = "",
  onSuccess,
  dark = false,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type, lotId, source, utm }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setError("Ошибка при отправке. Позвоните напрямую.");
    }
  };

  const inputCls = `w-full border px-4 py-3 text-sm transition-colors ${
    dark
      ? "bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-accent"
      : "border-border focus:border-accent focus:ring-1 focus:ring-accent"
  }`;

  if (submitted) {
    return (
      <div className={`text-center py-6 ${className}`}>
        <svg
          className="w-12 h-12 mx-auto mb-3 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p
          className={`text-lg font-semibold ${dark ? "text-white" : "text-primary"}`}
        >
          Спасибо, свяжемся в течение 15 минут
        </p>
        <p className={`text-sm mt-1 ${dark ? "text-white/70" : "text-muted"}`}>
          Или позвоните прямо сейчас:{" "}
          <a
            href="tel:+79812021261"
            className="text-accent font-medium hover:underline"
          >
            +7 (981) 202-12-61
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-3 ${className}`}
      noValidate
    >
      {/* Honeypot — скрытое поле для ботов */}
      <input
        {...register("honeypot")}
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />

      <div>
        <input
          {...register("name")}
          type="text"
          placeholder="Ваше имя *"
          className={inputCls}
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("phone")}
          type="tel"
          placeholder="Телефон *"
          className={inputCls}
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder={messagePlaceholder}
          rows={2}
          className={`${inputCls} resize-none`}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white font-semibold py-3 text-sm hover:bg-accent-dark transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? "Отправляем..." : ctaLabel}
      </button>

      <p
        className={`text-xs text-center ${dark ? "text-white/50" : "text-muted"}`}
      >
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
}
