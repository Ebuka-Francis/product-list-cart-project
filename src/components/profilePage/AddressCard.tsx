import { MapPin } from "lucide-react";
import { Address } from "@/types/types";

export default function AddressCard({ address }: { address: Address }) {
  const lineTwo = [address.street, address.city, address.country].filter(Boolean).join(", ");

  return (
    <div className="flex items-start gap-3 border-b border-[#f0e6d8] py-3 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#faf3ea] text-[#c8632a]">
        <MapPin size={16} />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#3a2418]">{address.label || "Address"}</p>
        {lineTwo && <p className="text-xs text-[#a68a72]">{lineTwo}</p>}
      </div>
    </div>
  );
}