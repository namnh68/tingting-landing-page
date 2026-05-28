"use client";

import { useCounter } from "@/hooks/use-counter";
import { STATS } from "@/lib/constants";
import { FiUsers, FiShoppingBag, FiDollarSign } from "react-icons/fi";

const STAT_CONFIG = [
  { key: "members" as const, icon: FiUsers, gradient: "from-pink-500 to-rose-600" },
  { key: "orders" as const, icon: FiShoppingBag, gradient: "from-purple-500 to-indigo-600" },
  { key: "refunded" as const, icon: FiDollarSign, gradient: "from-amber-500 to-orange-600" },
];

function StatItem({
  value,
  suffix,
  label,
  icon: Icon,
  gradient,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}) {
  const { count, ref } = useCounter({ end: value });

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl bg-surface-primary dark:bg-dark-primary">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-md`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="text-2xl sm:text-4xl font-extrabold text-text-primary dark:text-white tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm text-text-secondary dark:text-gray-400 text-center">
        {label}
      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section className="py-14 bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {STAT_CONFIG.map(({ key, icon, gradient }) => (
            <StatItem
              key={key}
              value={STATS[key].value}
              suffix={STATS[key].suffix}
              label={STATS[key].label}
              icon={icon}
              gradient={gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
