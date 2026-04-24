import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { FiLink, FiMessageCircle, FiDollarSign } from "react-icons/fi";
import type { IconType } from "react-icons";
import { ScrollReveal, ScrollRevealItem } from "@/components/scroll-reveal";

const STEP_ICONS: IconType[] = [FiLink, FiMessageCircle, FiDollarSign];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Cách hoạt động{" "}
            <span className="text-gradient">đơn giản</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400 max-w-lg mx-auto">
            Chỉ 3 bước để bắt đầu tiết kiệm với Ting Ting
          </p>
        </ScrollReveal>

        <ScrollReveal stagger staggerDelay={0.15} className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            return (
              <ScrollRevealItem key={step.step} className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-surface-secondary dark:bg-dark-secondary">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {step.step}
                </div>
                <div className="mt-4 mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-orange/10 dark:bg-brand-orange/20">
                  <Icon className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-gray-400">
                  {step.description}
                </p>
              </ScrollRevealItem>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
