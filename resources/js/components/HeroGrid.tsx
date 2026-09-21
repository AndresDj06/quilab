export function HeroGrid() {
    return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="80%">
                    <stop offset="0%" stopColor="#E8C56A" />
                    <stop offset="55%" stopColor="#D4A017" />
                    <stop offset="100%" stopColor="#2EC4B6" />
                </linearGradient>
                <radialGradient id="heroGlow" cx="70%" cy="35%" r="45%">
                    <stop offset="0%" stopColor="#E8C56A" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#09070F" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="1440" height="900" fill="#09070F" />
            <rect width="1440" height="900" fill="url(#heroGlow)" />
            <g stroke="#FFFBF5" strokeOpacity="0.055" fill="none">
                {Array.from({ length: 18 }).map((_, i) => (
                    <line key={`v${i}`} x1={80 * i} y1="0" x2={80 * i} y2="900" />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={80 * i} x2="1440" y2={80 * i} />
                ))}
            </g>
            <g fill="none" stroke="url(#heroGold)" strokeWidth="1.35">
                <circle cx="980" cy="280" r="110" className="opacity-80" />
                <circle cx="1180" cy="470" r="46" stroke="#2EC4B6" />
                <path className="draw-path" d="M220 620 L480 340 L760 520 L980 280 L1180 470" />
            </g>
            <g fill="#FFFBF5">
                <circle cx="220" cy="620" r="3.5" />
                <circle cx="480" cy="340" r="3.5" />
                <circle cx="760" cy="520" r="3.5" />
                <circle cx="980" cy="280" r="4.5" fill="#E8C56A" />
                <circle cx="1180" cy="470" r="3.5" fill="#2EC4B6" />
            </g>
        </svg>
    );
}
