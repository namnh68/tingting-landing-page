import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { FiLink, FiMessageCircle, FiDollarSign } from "react-icons/fi";
import type { IconType } from "react-icons";
import { ScrollReveal, ScrollRevealItem } from "@/components/scroll-reveal";

const STEP_ICONS: IconType[] = [FiLink, FiMessageCircle, FiDollarSign];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Chỉ <span className="text-gradient">3 bước</span> để nhận hoàn tiền
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400 max-w-lg mx-auto">
            Đơn giản đến mức ai cũng làm được
          </p>
        </ScrollReveal>

        <ScrollReveal stagger staggerDelay={0.15}>
          <div className="relative grid md:grid-cols-3 gap-10 md:gap-6">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] border-t-2 border-dashed border-brand-orange/20 dark:border-brand-yellow/15" />

            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];
              return (
                <ScrollRevealItem
                  key={step.step}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-brand text-white shadow-lg">
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Step number */}
                  <span className="text-xs font-bold text-brand-orange dark:text-brand-yellow uppercase tracking-widest mb-2">
                    Bước {step.step}
                  </span>

                  <h3 className="text-lg font-bold mb-2 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-gray-400 max-w-[220px] leading-relaxed">
                    {step.description}
                  </p>
                </ScrollRevealItem>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
