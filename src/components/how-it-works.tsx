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
            Cách hoạt động{" "}
            <span className="text-gradient">đơn giản</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400 max-w-lg mx-auto">
            Chỉ 3 bước để bắt đầu tiết kiệm với Vn Ting Ting
          </p>
        </ScrollReveal>

        <ScrollReveal stagger staggerDelay={0.15}>
          <div className="relative grid md:grid-cols-3 gap-10 md:gap-8">
            {/* Connector dashed line — desktop only, aligns with center of step circles */}
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] border-t-2 border-dashed border-brand-orange/30 dark:border-brand-yellow/20" />

            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];
              return (
                <ScrollRevealItem
                  key={step.step}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number — z-10 to sit above connector line */}
                  <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand text-white text-xl font-bold shadow-lg">
                    {String(step.step).padStart(2, "0")}
                  </div>

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 dark:bg-brand-orange/20">
                    <Icon className="h-7 w-7 text-brand-orange" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-gray-400 max-w-[200px]">
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
