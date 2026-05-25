// Generator placeholder pentru produse fara imagine
// Folosit doar in primul render; cand clientul incarca poze prin admin, asta dispare

const PALETTES: Record<string, [string, string, string, string]> = {
  marble: ["#fbf8f2", "#ece5d6", "#d8cfb8", "#a89b7d"],
  stone: ["#7e7d78", "#5a5854", "#3a3834", "#d6b890"],
  stormy: ["#3a3530", "#1c1a17", "#0a0908", "#8a7f6d"],
  natural: ["#c4a888", "#8a6e52", "#5a4636", "#d8c4a4"],
  mineral: ["#e8e2d4", "#d4cdbb", "#b6ad97", "#8c8474"],
  exotic: ["#cdbd97", "#a08a64", "#6c5a3a", "#3c2f1c"],
  terrazzo: ["#aca598", "#878072", "#5a544a", "#d4c4a8"],
};

// Pseudo-random deterministic din string
function seededRandom(seed: string) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) | 0;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function placeholderTile(collectionSlug: string | null, seed: string): string {
  const palette = PALETTES[collectionSlug ?? "marble"] ?? PALETTES.marble;
  const [c1, c2, c3, c4] = palette;
  const rnd = seededRandom(seed);
  const id = "g" + Math.abs(Math.floor(rnd() * 1e6));

  // 3-5 vene principale
  let veining = "";
  const numVeins = 3 + Math.floor(rnd() * 3);
  for (let i = 0; i < numVeins; i++) {
    const y1 = rnd() * 250;
    const y2 = rnd() * 250;
    const cx1 = rnd() * 200;
    const cx2 = rnd() * 200;
    const cy1 = y1 + (rnd() - 0.5) * 80;
    const cy2 = y2 + (rnd() - 0.5) * 80;
    const w = 0.3 + rnd() * 1.2;
    const op = 0.3 + rnd() * 0.5;
    veining += `<path d="M${rnd() * 40 - 20},${y1} C${cx1},${cy1} ${cx2},${cy2} ${200 + rnd() * 40 - 20},${y2}" stroke="${c4}" stroke-width="${w}" fill="none" opacity="${op}"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="${id}" x1="${rnd().toFixed(2)}" y1="0" x2="${(1 - rnd() * 0.5).toFixed(2)}" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="${(30 + rnd() * 30).toFixed(0)}%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>
    </defs>
    <rect width="200" height="250" fill="url(#${id})"/>
    ${veining}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
