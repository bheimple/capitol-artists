export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated capitol icon */}
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent animate-pulse">
          <svg
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="22" y="2" width="4" height="14" rx="0.5" fill="currentColor" />
            <rect x="16.5" y="5" width="15" height="4" rx="0.5" fill="currentColor" />
            <rect x="6" y="42" width="36" height="3" rx="0.5" fill="currentColor" />
            <rect x="8" y="38" width="32" height="3" rx="0.5" fill="currentColor" />
            <rect x="12" y="26" width="3" height="11" fill="currentColor" />
            <rect x="18" y="26" width="3" height="11" fill="currentColor" />
            <rect x="27" y="26" width="3" height="11" fill="currentColor" />
            <rect x="33" y="26" width="3" height="11" fill="currentColor" />
            <rect x="10" y="23" width="28" height="3" rx="0.5" fill="currentColor" />
            <path d="M10 23 L24 16 L38 23 Z" fill="currentColor" />
          </svg>
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
