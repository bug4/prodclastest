import Link from "next/link";

type Props = {
  variant?: "default" | "light";
};

export function Logo({ variant = "default" }: Props) {
  const textColor = variant === "light" ? "text-bg-paper" : "text-ink";
  const subColor = variant === "light" ? "text-brass" : "text-brass-deep";

  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 group" aria-label="Prodclas">
      <svg className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0" viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9a76b" />
            <stop offset="100%" stopColor="#8c6a3a" />
          </linearGradient>
        </defs>
        <path d="M20 4 L36 20 L20 36 L4 20 Z" fill="none" stroke="url(#logoGrad)" strokeWidth="1.4" />
        <path d="M20 11 L29 20 L20 29 L11 20 Z" fill="url(#logoGrad)" opacity="0.9" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-medium text-[15px] sm:text-[18px] tracking-[0.15em] sm:tracking-[0.18em] ${textColor}`}>PRODCLAS</span>
        <span className={`font-serif italic text-[9px] sm:text-[10px] mt-1 tracking-[0.04em] ${subColor}`}>
          Maison de Ceramică
        </span>
      </span>
    </Link>
  );
}
