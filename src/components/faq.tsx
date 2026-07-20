"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";
import { useCtv } from "@/lib/ctv-context";
import { FiChevronDown } from "react-icons/fi";
import { ScrollReveal } from "@/components/scroll-reveal";

function renderAnswerLine(line: string, link?: { text: string; href: string }) {
  if (!link) return line;
  const idx = line.indexOf(link.text);
  if (idx === -1) return line;
  return (
    <>
      {line.slice(0, idx)}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-orange dark:text-brand-yellow underline underline-offset-2"
      >
        {link.text}
      </a>
      {line.slice(idx + link.text.length)}
    </>
  );
}

function FAQItem({
  question,
  answer,
  link,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  link?: { text: string; href: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const lines = answer.split("\n");

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
          isOpen ? "max-h-64 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">
          {lines.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {renderAnswerLine(line, link)}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const { zaloGroupLink, shareRate } = useCtv();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Câu hỏi <span className="text-gradient">thường gặp</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400">
            Giải đáp nhanh những thắc mắc phổ biến
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="rounded-2xl bg-surface-secondary dark:bg-dark-secondary p-4 sm:p-6">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question.replace("{rate}%", `${shareRate}%`)}
              answer={item.answer}
              link={"link" in item ? { ...item.link, href: zaloGroupLink } : undefined}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
