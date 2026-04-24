"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";
import { FiChevronDown } from "react-icons/fi";
import { ScrollReveal } from "@/components/scroll-reveal";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-surface-tertiary dark:border-dark-tertiary last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-semibold pr-4 dark:text-white">
          {question}
        </span>
        <FiChevronDown
          className={`h-5 w-5 flex-shrink-0 text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Câu hỏi{" "}
            <span className="text-gradient">thường gặp</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="rounded-2xl bg-surface-secondary dark:bg-dark-secondary p-4 sm:p-6">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
