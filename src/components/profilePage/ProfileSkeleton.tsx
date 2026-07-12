
"use client";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf3ea] pb-16">
      {/* Hero skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f120c] via-[#4a2c1a] to-[#c8632a] px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="shimmer h-20 w-20 shrink-0 rounded-full border-4 border-[#faf3ea] bg-white/20" />
          <div className="space-y-2 pt-">
            <div className="shimmer h-2.5 w-24 rounded-full bg-white/20" />
            <div className="shimmer h-6 w-40 rounded-full bg-white/20" />
            <div className="shimmer h-2.5 w-52 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* Stat pills skeleton */}
        <div className="-mt-6 mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
              <div className="shimmer h-10 w-10 shrink-0 rounded-full bg-[#f0e6d8]" />
              <div className="flex-1 space-y-2">
                <div className="shimmer h-2 w-14 rounded-full bg-[#f0e6d8]" />
                <div className="shimmer h-3 w-20 rounded-full bg-[#f0e6d8]" />
              </div>
            </div>
          ))}
        </div>

        {/* Card skeleton */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="shimmer mb-4 h-2.5 w-32 rounded-full bg-[#f0e6d8]" />
          {[0, 1].map((i) => (
            <div key={i} className="flex items-start gap-3 border-b border-[#f0e6d8] py-3 last:border-0">
              <div className="shimmer h-9 w-9 shrink-0 rounded-full bg-[#f0e6d8]" />
              <div className="flex-1 space-y-2 py-0.5">
                <div className="shimmer h-2.5 w-24 rounded-full bg-[#f0e6d8]" />
                <div className="shimmer h-2 w-40 rounded-full bg-[#f0e6d8]" />
              </div>
            </div>
          ))}
        </div>

        {/* Promo banner skeleton */}
        <div className="shimmer h-24 rounded-3xl bg-[#f0dcc4]" />
      </div>

      <style jsx global>{`
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.55),
            transparent
          );
          animation: shimmer-sweep 1.6s infinite;
        }
        @keyframes shimmer-sweep {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
