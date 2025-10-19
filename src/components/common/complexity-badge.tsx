"use client";

interface ComplexityBadgeProps {
  label: string;
  value: string;
}

export function ComplexityBadge({ label, value }: ComplexityBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
      <span className="uppercase tracking-wide text-slate-500">{label}</span>
      <span className="text-slate-900">{value}</span>
    </div>
  );
}
