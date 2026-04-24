"use client";

import { useCounter } from "@/hooks/use-counter";
import { STATS } from "@/lib/constants";
import { FiUsers, FiShoppingBag, FiDollarSign } from "react-icons/fi";

const STAT_CONFIG = [
  { key: "members" as const, icon: FiUsers, color: "text-brand-orange" },
  { key: "orders" as const, icon: FiShoppingBag, color: "text-brand-yellow" },
  { key: "refunded" as const, icon: FiDollarSign, color: "text-brand-red" },
];

function StatItem({
  value,
  suffix,
  label,
  icon: Icon,
  color,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  const { count, ref } = useCounter({ end: value });

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 p-4">
      <Icon className={`h-8 w-8 ${color}`} />
      <div className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-white">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-text-secondary dark:text-gray-400 text-center">
        {label}
      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section className="py-12 bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STAT_CONFIG.map(({ key, icon, color }) => (
            <StatItem
              key={key}
              value={STATS[key].value}
              suffix={STATS[key].suffix}
              label={STATS[key].label}
              icon={icon}
              color={color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
