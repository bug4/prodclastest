// Decorative SVG interiors — folosite ca background-uri pentru hero si split sections
// (NU sunt poze produse — pentru poze produse, clientul le incarca prin admin)

export const INTERIORS = {
  bath: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='bw' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#fbf6ea'/>
      <stop offset='50%' stop-color='#ede2c9'/>
      <stop offset='100%' stop-color='#c8b594'/>
    </linearGradient>
    <linearGradient id='bf' x1='0' y1='0' x2='0.5' y2='1'>
      <stop offset='0%' stop-color='#e8ddc4'/>
      <stop offset='100%' stop-color='#8c7c5a'/>
    </linearGradient>
    <radialGradient id='bWindow' cx='0.5' cy='0.4' r='0.5'>
      <stop offset='0%' stop-color='#fff5e0'/>
      <stop offset='60%' stop-color='#e8d5a8'/>
      <stop offset='100%' stop-color='#b89568'/>
    </radialGradient>
    <linearGradient id='bMarble' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#fffaf0'/>
      <stop offset='50%' stop-color='#f0e6d0'/>
      <stop offset='100%' stop-color='#c4b294'/>
    </linearGradient>
    <filter id='bnz'>
      <feTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3'/>
      <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0'/>
    </filter>
  </defs>
  <rect width='800' height='720' fill='url(#bw)'/>
  <g opacity='0.5'>
    <path d='M0,80 Q150,40 350,100 T780,70' stroke='#8c7250' stroke-width='1.2' fill='none'/>
    <path d='M50,200 Q200,170 400,220 T780,200' stroke='#8c7250' stroke-width='0.7' fill='none'/>
    <path d='M0,350 Q180,310 380,380 T780,340' stroke='#8c7250' stroke-width='0.9' fill='none'/>
    <path d='M100,500 Q280,470 460,530 T780,500' stroke='#8c7250' stroke-width='0.5' fill='none'/>
    <path d='M0,620 Q200,580 400,640 T780,610' stroke='#8c7250' stroke-width='0.8' fill='none'/>
  </g>
  <rect y='720' width='800' height='280' fill='url(#bf)'/>
  <path d='M0,720 L800,720 L800,725 L0,725 Z' fill='#c9a76b' opacity='0.6'/>
  <rect x='270' y='110' width='260' height='480' fill='url(#bWindow)' stroke='#8c6a3a' stroke-width='3'/>
  <line x1='400' y1='110' x2='400' y2='590' stroke='#8c6a3a' stroke-width='2'/>
  <line x1='270' y1='350' x2='530' y2='350' stroke='#8c6a3a' stroke-width='2'/>
  <g opacity='0.35'>
    <rect x='290' y='420' width='30' height='160' fill='#7c5c38'/>
    <rect x='325' y='380' width='40' height='200' fill='#6a4f30'/>
    <rect x='370' y='400' width='28' height='180' fill='#7c5c38'/>
    <rect x='410' y='370' width='35' height='210' fill='#6a4f30'/>
    <rect x='450' y='410' width='30' height='170' fill='#7c5c38'/>
    <rect x='485' y='390' width='40' height='190' fill='#6a4f30'/>
  </g>
  <ellipse cx='400' cy='850' rx='240' ry='75' fill='#fbf8f2' opacity='0.95'/>
  <ellipse cx='400' cy='810' rx='225' ry='55' fill='#fff' opacity='0.7'/>
  <ellipse cx='400' cy='800' rx='210' ry='42' fill='#f4ede0' opacity='0.5'/>
  <rect x='220' y='905' width='12' height='45' fill='#c9a76b' opacity='0.8'/>
  <rect x='568' y='905' width='12' height='45' fill='#c9a76b' opacity='0.8'/>
  <circle cx='400' cy='140' r='38' fill='#c9a76b' opacity='0.85'/>
  <circle cx='400' cy='140' r='25' fill='#f8e4b0' opacity='0.9'/>
  <line x1='400' y1='102' x2='400' y2='0' stroke='#8c6a3a' stroke-width='1.5'/>
  <rect x='90' y='150' width='110' height='440' fill='url(#bMarble)' stroke='#c9a76b' stroke-width='1.5' opacity='0.85'/>
  <rect x='600' y='150' width='110' height='440' fill='url(#bMarble)' stroke='#c9a76b' stroke-width='1.5' opacity='0.85'/>
  <rect width='800' height='1000' filter='url(#bnz)' opacity='0.55'/>
</svg>
`)}`,

  kitchen: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='kw' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#1c1814'/>
      <stop offset='100%' stop-color='#2a2520'/>
    </linearGradient>
    <radialGradient id='kGlow' cx='0.5' cy='0.3' r='0.6'>
      <stop offset='0%' stop-color='#e8b878' stop-opacity='0.5'/>
      <stop offset='100%' stop-color='#c9a76b' stop-opacity='0'/>
    </radialGradient>
    <filter id='knz'>
      <feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3'/>
      <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.1 0'/>
    </filter>
  </defs>
  <rect width='600' height='800' fill='url(#kw)'/>
  <rect width='600' height='800' fill='url(#kGlow)'/>
  <g opacity='0.5'>
    <path d='M0,150 Q200,120 400,180 T600,160' stroke='#c9a76b' stroke-width='1.5' fill='none'/>
    <path d='M50,300 Q200,270 380,330 T600,300' stroke='#c9a76b' stroke-width='0.8' fill='none'/>
    <path d='M0,470 Q180,440 380,490 T600,470' stroke='#a88554' stroke-width='1' fill='none'/>
    <path d='M100,620 Q280,590 460,640 T600,610' stroke='#c9a76b' stroke-width='0.6' fill='none'/>
  </g>
  <rect x='100' y='220' width='400' height='3' fill='#e8b878' opacity='0.9'/>
  <rect x='100' y='220' width='400' height='30' fill='#e8b878' opacity='0.2'/>
  <rect x='0' y='480' width='600' height='50' fill='#e8ddc4' opacity='0.95'/>
  <line x1='0' y1='480' x2='600' y2='480' stroke='#c9a76b' stroke-width='1.5'/>
  <rect x='0' y='530' width='600' height='270' fill='#0d0c0a' opacity='0.8'/>
  <line x1='200' y1='530' x2='200' y2='800' stroke='#c9a76b' stroke-width='0.5' opacity='0.6'/>
  <line x1='400' y1='530' x2='400' y2='800' stroke='#c9a76b' stroke-width='0.5' opacity='0.6'/>
  <circle cx='300' cy='80' r='3' fill='#c9a76b'/>
  <ellipse cx='300' cy='130' rx='28' ry='14' fill='#e8b878' opacity='0.8'/>
  <line x1='300' y1='0' x2='300' y2='80' stroke='#8c6a3a' stroke-width='0.5'/>
  <rect width='600' height='800' filter='url(#knz)' opacity='0.6'/>
</svg>
`)}`,

  living: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='lw' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#fbf6ea'/>
      <stop offset='100%' stop-color='#d8c8a4'/>
    </linearGradient>
    <linearGradient id='lf' x1='0' y1='0' x2='0.5' y2='1'>
      <stop offset='0%' stop-color='#e8ddc4'/>
      <stop offset='100%' stop-color='#9c8c6c'/>
    </linearGradient>
    <radialGradient id='lWindow' cx='0.5' cy='0.5' r='0.7'>
      <stop offset='0%' stop-color='#fff5e0'/>
      <stop offset='100%' stop-color='#c8a878'/>
    </radialGradient>
    <filter id='lnz'>
      <feTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2'/>
      <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0'/>
    </filter>
  </defs>
  <rect width='600' height='580' fill='url(#lw)'/>
  <polygon points='0,580 600,580 500,800 100,800' fill='url(#lf)'/>
  <path d='M180,120 L180,440 L420,440 L420,120 Q420,80 300,80 Q180,80 180,120 Z'
    fill='url(#lWindow)' stroke='#8c6a3a' stroke-width='2.5'/>
  <line x1='300' y1='80' x2='300' y2='440' stroke='#8c6a3a' stroke-width='1.5'/>
  <line x1='180' y1='260' x2='420' y2='260' stroke='#8c6a3a' stroke-width='1.5'/>
  <g opacity='0.4'>
    <rect x='250' y='260' width='35' height='180' fill='#6a4f30'/>
    <rect x='320' y='270' width='45' height='170' fill='#7c5c38'/>
  </g>
  <circle cx='90' cy='300' r='8' fill='#c9a76b' opacity='0.9'/>
  <ellipse cx='90' cy='320' rx='18' ry='6' fill='#e8b878' opacity='0.3'/>
  <circle cx='510' cy='300' r='8' fill='#c9a76b' opacity='0.9'/>
  <ellipse cx='510' cy='320' rx='18' ry='6' fill='#e8b878' opacity='0.3'/>
  <rect width='600' height='800' filter='url(#lnz)' opacity='0.5'/>
</svg>
`)}`,

  spa: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='sw' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#2a2a2a'/><stop offset='50%' stop-color='#3a3530'/><stop offset='100%' stop-color='#1a1814'/>
    </linearGradient>
    <filter id='snz'><feTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.1 0'/></filter>
  </defs>
  <rect width='600' height='800' fill='url(#sw)'/>
  <path d='M50,80 Q200,40 400,100 T600,70' stroke='#c9a76b' stroke-width='1.2' fill='none' opacity='0.5'/>
  <path d='M0,250 Q200,220 400,280 T600,260' stroke='#c9a76b' stroke-width='0.8' fill='none' opacity='0.4'/>
  <path d='M100,500 Q300,470 500,520 T600,500' stroke='#c9a76b' stroke-width='0.6' fill='none' opacity='0.3'/>
  <rect x='100' y='200' width='4' height='400' fill='#c9a76b' opacity='0.7'/>
  <rect x='496' y='200' width='4' height='400' fill='#c9a76b' opacity='0.7'/>
  <ellipse cx='300' cy='680' rx='180' ry='40' fill='#fbf8f2' opacity='0.9'/>
  <rect width='600' height='800' filter='url(#snz)' opacity='0.6'/>
</svg>
`)}`,
};
