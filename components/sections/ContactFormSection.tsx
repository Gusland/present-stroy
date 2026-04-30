"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Container from "@/components/ui/Container";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v, "Необходимо согласие на обработку данных"),
});

type FormData = z.infer<typeof schema>;

export default function ContactFormSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-20 bg-primary" id="contact">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Получите бесплатную консультацию
            </h2>
            <p className="text-white/70 text-lg">
              Оставьте заявку — свяжемся в течение 30 минут и ответим на все вопросы
            </p>
            <div className="mt-4 h-1 w-16 bg-accent mx-auto" />
          </div>

          {status === "success" ? (
            <div className="bg-white/10 border border-white/20 p-8 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-white font-bold text-xl mb-2">Заявка отправлена!</h3>
              <p className="text-white/70">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Ваше имя *"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:border-accent focus:bg-white/15 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("phone")}
                    placeholder="Телефон *"
                    type="tel"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:border-accent focus:bg-white/15 transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <input
                  {...register("email")}
                  placeholder="Email (необязательно)"
                  type="email"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:border-accent focus:bg-white/15 transition-colors"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-5">
                <textarea
                  {...register("message")}
                  placeholder="Ваш вопрос или пожелание (необязательно)"
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:border-accent focus:bg-white/15 transition-colors resize-none"
                />
              </div>

              <div className="flex items-start gap-3 mb-6">
                <input
                  {...register("consent")}
                  type="checkbox"
                  id="consent"
                  className="mt-1 accent-accent"
                />
                <label htmlFor="consent" className="text-white/60 text-sm cursor-pointer">
                  Я согласен(а) на обработку персональных данных в соответствии с{" "}
                  <a href="/privacy" className="text-accent hover:underline">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>
              {errors.consent && (
                <p className="text-red-400 text-xs -mt-4 mb-4">{errors.consent.message}</p>
              )}

              {status === "error" && (
                <p className="text-red-400 text-sm mb-4">
                  Ошибка отправки. Позвоните нам напрямую или попробуйте ещё раз.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-accent text-white py-4 font-bold text-lg hover:bg-accent-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Отправляем..." : "Отправить заявку"}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
