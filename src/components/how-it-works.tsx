import { HOW_IT_WORKS_STEPS, ZALO_GROUP_LINK } from "@/lib/constants";
import {
  FiUsers, FiLink, FiShoppingCart, FiDollarSign,
  FiChevronRight, FiChevronLeft, FiChevronDown,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { ScrollReveal, ScrollRevealItem } from "@/components/scroll-reveal";
import { linkifyText } from "@/lib/linkify-text";

const STEP_ICONS: IconType[] = [FiUsers, FiLink, FiShoppingCart, FiDollarSign];

// Desktop connector geometry: derived from the 4-col grid (gap-6 = 1.5rem) and the
// step circle size (h-20 → 2.5rem radius), so each dash segment spans exactly
// circle-edge to circle-edge.
const CONNECTOR_SEGMENTS = [
  { left: "calc(12.5% + 1.9375rem)", width: "calc(25% - 4.625rem)" },
  { left: "calc(37.5% + 2.3125rem)", width: "calc(25% - 4.625rem)" },
  { left: "calc(62.5% + 2.6875rem)", width: "calc(25% - 4.625rem)" },
];

function StepCard({
  step,
  title,
  description,
  Icon,
  compact = false,
}: {
  step: number;
  title: string;
  description: string;
  Icon: IconType;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-white shadow-lg">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-bold text-brand-orange dark:text-brand-yellow uppercase tracking-widest mb-1">
          Bước {step}
        </span>
        <h3 className="text-sm font-bold mb-1 dark:text-white leading-snug">{title}</h3>
        <p className="text-xs text-text-secondary dark:text-gray-400 leading-snug">
          {linkifyText(description, "nhóm Zalo", ZALO_GROUP_LINK)}
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Step circle */}
      <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-brand text-white shadow-lg">
        <Icon className="h-8 w-8" />
      </div>

      {/* Step number */}
      <span className="text-xs font-bold text-brand-orange dark:text-brand-yellow uppercase tracking-widest mb-2">
        Bước {step}
      </span>

      <h3 className="text-lg font-bold mb-2 dark:text-white">{title}</h3>
      <p className="text-sm text-text-secondary dark:text-gray-400 max-w-[220px] leading-relaxed">
        {linkifyText(description, "nhóm Zalo", ZALO_GROUP_LINK)}
      </p>
    </div>
  );
}

function MobileStepRow({
  pair,
  direction,
}: {
  pair: [number, number];
  direction: "right" | "left";
}) {
  const ArrowIcon = direction === "right" ? FiChevronRight : FiChevronLeft;
  return (
    <div className="relative grid grid-cols-2 gap-3">
      <ArrowIcon
        className="absolute left-1/2 top-10 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-brand-orange dark:text-brand-yellow"
      />
      {pair.map((index) => {
        const step = HOW_IT_WORKS_STEPS[index];
        return (
          <div
            key={step.step}
            className="rounded-2xl bg-surface-secondary dark:bg-dark-secondary p-4"
          >
            <StepCard
              step={step.step}
              title={step.title}
              description={step.description}
              Icon={STEP_ICONS[index]}
              compact
            />
          </div>
        );
      })}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Chỉ <span className="text-gradient">4 bước</span> để nhận hoàn tiền
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400 max-w-lg mx-auto">
            Đơn giản đến mức ai cũng làm được
          </p>
        </ScrollReveal>

        {/* Mobile: compact 2x2 grid, clockwise flow (1 → 2 → 3 → 4), no scrolling/swiping */}
        <div className="flex flex-col gap-2 md:hidden">
          <MobileStepRow pair={[0, 1]} direction="right" />
          <div className="grid grid-cols-2 gap-3">
            <div />
            <div className="flex justify-center">
              <FiChevronDown className="h-4 w-4 text-brand-orange dark:text-brand-yellow" />
            </div>
          </div>
          <MobileStepRow pair={[3, 2]} direction="left" />
        </div>

        {/* Desktop: grid with connector segments interleaved between steps so each
            dash + arrow reveals in lockstep with the stagger, right as its source
            step appears and just before its destination step does */}
        <ScrollReveal stagger staggerDelay={0.15} className="hidden md:block">
          <div className="relative grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.flatMap((step, index) => {
              const nodes = [
                <ScrollRevealItem key={`step-${step.step}`}>
                  <StepCard
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    Icon={STEP_ICONS[index]}
                  />
                </ScrollRevealItem>,
              ];

              const segment = CONNECTOR_SEGMENTS[index];
              if (segment) {
                nodes.push(
                  <ScrollRevealItem
                    key={`connector-${step.step}`}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div
                      className="step-connector-line absolute top-10 -translate-y-1/2 text-brand-orange/30 dark:text-brand-yellow/25"
                      style={{ left: segment.left, width: segment.width }}
                    />
                  </ScrollRevealItem>
                );
              }

              return nodes;
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
