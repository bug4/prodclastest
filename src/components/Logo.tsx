import Link from "next/link";
import Image from "next/image";

type Props = {
  variant?: "default" | "light";
  href?: string;
};

export function Logo({ variant = "default", href = "/" }: Props) {
  const textColor = variant === "light" ? "text-bg-paper" : "text-ink";

  return (
    <Link href={href} className="flex items-center gap-2 sm:gap-3 group" aria-label="Prodclas">
      <Image
        src="/logo.svg"
        alt="Prodclas"
        width={40}
        height={40}
        className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0"
        priority
      />
      <span
        className={`font-serif font-medium text-[16px] sm:text-[20px] tracking-[0.2em] ${textColor}`}
      >
        PRODCLAS
      </span>
    </Link>
  );
}
