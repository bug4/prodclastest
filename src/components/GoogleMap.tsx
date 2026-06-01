type Props = {
  className?: string;
  rounded?: string;
  title?: string;
  directionsLabel?: string;
};

const SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.547!2d28.7409021!3d47.0751792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cbd71d79f9b569%3A0xf569542b2cd17ce6!2sProdclass!5e0!3m2!1sro!2smd!4v1717000000000";
const DIRECTIONS_LINK =
  "https://www.google.com/maps/place/Prodclass/@47.0751792,28.7409021,1059m/data=!3m1!1e3!4m6!3m5!1s0x40cbd71d79f9b569:0xf569542b2cd17ce6!8m2!3d47.0751792!4d28.7409021!16s%2Fg%2F11npf4xls4";

export function GoogleMap({
  className = "",
  rounded = "rounded-2xl",
  title = "Prodclas Showroom",
  directionsLabel = "Direcții",
}: Props) {
  return (
    <div className={`relative overflow-hidden ${rounded} border border-line bg-bg-deep ${className}`}>
      <iframe
        src={SRC}
        title={title}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
      />

      {/* Buton "Direcții" suprapus dreapta jos */}
      <a
        href={DIRECTIONS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-4 py-2.5 bg-bg-paper/95 hover:bg-bg-paper backdrop-blur-md border border-line rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase text-ink shadow-lg transition-colors"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {directionsLabel}
      </a>
    </div>
  );
}
