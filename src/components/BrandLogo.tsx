import Image from "next/image";

export function CapitolIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/brand/capitol-cross.png"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={`object-contain shrink-0 ${className}`}
      unoptimized
    />
  );
}

export default function BrandLogo() {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Capitol Artists">
      <CapitolIcon size={48} />
      <span className="flex flex-col font-serif font-bold leading-none" aria-hidden="true">
        <span className="text-[23px] tracking-[-0.04em] text-[#062653]">CAPITOL</span>
        <span className="mt-1 text-[15px] tracking-[0.19em] text-[#a7770c]">ARTISTS</span>
      </span>
    </span>
  );
}
