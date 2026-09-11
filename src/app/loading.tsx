import { CapitolIcon } from "@/components/BrandLogo";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated capitol icon */}
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent animate-pulse">
          <CapitolIcon size={44} />
        </div>

        {/* Loading bar */}
        <div className="w-32 h-px bg-border relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-accent animate-loading-bar" />
        </div>

        <p className="text-xs text-muted tracking-[0.2em] uppercase">Loading</p>
      </div>
    </div>
  );
}
