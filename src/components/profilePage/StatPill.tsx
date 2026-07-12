import { LucideIcon } from "lucide-react";

interface StatPillProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function StatPill({ icon: Icon, label, value }: StatPillProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faf3ea] text-[#c8632a]">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-[#a68a72]">{label}</p>
        <p className="text-sm font-bold text-[#3a2418]">{value}</p>
      </div>
    </div>
  );
}