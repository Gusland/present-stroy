import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <section className="py-20 bg-primary">
      <Container>
        <SectionTitle
          title="Как мы работаем"
          subtitle="Прозрачный процесс от первого звонка до вручения ключей"
          light
        />

        <div className="relative">
          {/* Connector line - desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-white/20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative z-10 text-center">
                {/* Step number circle */}
                <div className="w-16 h-16 rounded-full bg-accent text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 border-4 border-primary shadow-lg">
                  {step.step}
                </div>
                <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
