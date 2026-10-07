import React from 'react';

interface RoyalEmblemProps {
  className?: string;
  size?: number;
  showTextLabel?: boolean;
}

export const RoyalEmblem: React.FC<RoyalEmblemProps> = ({
  className = '',
  size = 64,
  showTextLabel = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md select-none transition-transform duration-300 hover:scale-105"
        role="img"
        aria-label="Royal Marigold Emblem"
      >
        <defs>
          {/* Radial royal purple gradient */}
          <radialGradient
            id="royalBackground"
            cx="40%"
            cy="35%"
            r="60%"
            fx="40%"
            fy="35%"
          >
            <stop offset="0%" stopColor="#4A1272" />
            <stop offset="45%" stopColor="#350058" />
            <stop offset="85%" stopColor="#25003E" />
            <stop offset="100%" stopColor="#1B002D" />
          </radialGradient>

          {/* Golden text gradient */}
          <linearGradient id="canaryGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="35%" stopColor="#FED01B" />
            <stop offset="90%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>

          {/* Plumeria flower center gradient */}
          <radialGradient id="plumeriaCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="80%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Soft drop shadow for calligraphy */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#180026" floodOpacity="0.75" />
          </filter>

          {/* Flower shadow */}
          <filter id="flowerDrop" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#1A002C" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Outer Circular Disk */}
        <circle cx="250" cy="250" r="248" fill="url(#royalBackground)" />

        {/* Intricate Watermarked Script Pattern (Subtle Thai/Burmese Glyph Silhouettes) */}
        <g opacity="0.14" fill="#E9D5FF" fontSize="34" fontFamily="Sarabun, Padauk, sans-serif" fontWeight="bold">
          <text x="40" y="80">ก</text>
          <text x="110" y="60">ข</text>
          <text x="180" y="85">ค</text>
          <text x="245" y="65">ง</text>
          <text x="320" y="75">จ</text>
          <text x="390" y="85">ฉ</text>
          <text x="440" y="140">ช</text>

          <text x="50" y="150">က</text>
          <text x="120" y="130">ခ</text>
          <text x="330" y="145">ည</text>
          <text x="410" y="180">တ</text>

          <text x="35" y="220">ဆ</text>
          <text x="80" y="280">ဒ</text>
          <text x="40" y="340">ဘ</text>
          <text x="70" y="410">မ</text>
          <text x="130" y="450">လ</text>
          <text x="200" y="470">ဝ</text>
          <text x="280" y="465">သ</text>
          <text x="360" y="440">ဟ</text>
          <text x="420" y="380">အ</text>

          <text x="430" y="260">ฐ</text>
          <text x="435" y="320">ณ</text>
          <text x="360" y="240">ธ</text>
          <text x="390" y="300">ภ</text>
          <text x="250" y="400">ย</text>
          <text x="170" y="390">ร</text>
          <text x="320" y="370">ศ</text>
        </g>

        {/* Calligraphy Group with Golden Gradient & Shadow */}
        <g filter="url(#goldGlow)" fill="url(#canaryGold)">
          {/* Main Character 1 (Left loop) */}
          <path
            d="M 120 220 
               C 105 200, 75 220, 75 250
               C 75 295, 125 315, 155 260
               C 165 240, 155 220, 140 225
               C 125 230, 115 265, 95 255
               C 85 250, 95 230, 110 230
               Z"
          />
          {/* Character 1 Body curve & descender attachment */}
          <path
            d="M 115 225
               C 130 205, 175 210, 160 250
               C 150 280, 130 290, 120 280
               C 110 270, 125 240, 145 240
               C 155 240, 160 260, 140 270
               C 125 275, 115 260, 125 240
               Z"
          />
          {/* Bottom tail / descender hook */}
          <path
            d="M 124 290
               L 124 350
               C 124 358, 132 360, 145 352
               C 155 345, 160 350, 150 358
               C 135 370, 120 365, 120 348
               L 120 290
               Z"
          />

          {/* Middle Character with Elegant Upward Ascender Flourish */}
          <path
            d="M 230 235
               C 210 205, 180 200, 170 230
               C 160 265, 205 295, 225 270
               C 235 255, 215 240, 200 255
               C 190 265, 178 250, 182 235
               C 188 215, 215 215, 220 235
               C 225 255, 215 275, 195 285
               C 165 300, 150 250, 175 220
               C 190 200, 215 190, 225 180
               C 238 168, 252 145, 254 135
               C 255 148, 245 168, 235 180
               C 215 205, 235 215, 240 235
               Z"
          />

          {/* Twin Curving Accents (ะ style loops) */}
          {/* Left loop */}
          <path
            d="M 245 235
               C 240 220, 255 210, 265 215
               C 278 220, 280 240, 265 250
               C 250 260, 240 250, 248 238
               C 255 228, 268 235, 262 242
               Z"
          />
          {/* Right loop */}
          <path
            d="M 275 235
               C 270 220, 285 210, 295 215
               C 308 220, 310 240, 295 250
               C 280 260, 270 250, 278 238
               C 285 228, 298 235, 292 242
               Z"
          />

          {/* Right Main Glyph 1 (Circular Loop with Right Teardrop Curve) */}
          <path
            d="M 335 205
               C 380 205, 395 240, 390 270
               C 385 300, 340 310, 315 285
               C 295 265, 305 230, 335 220
               C 360 210, 375 235, 365 260
               C 355 285, 325 280, 320 265
               C 315 250, 340 240, 350 250
               C 355 255, 350 265, 340 265
               C 330 265, 330 250, 340 245
               C 355 235, 365 250, 355 265
               Z"
          />

          {/* Far Right Final Flourish Loop */}
          <path
            d="M 405 215
               C 440 215, 455 245, 445 275
               C 435 305, 410 300, 400 280
               C 390 260, 410 240, 425 240
               C 435 240, 435 255, 425 265
               C 415 275, 405 265, 410 255
               C 415 245, 430 250, 425 260
               Z"
          />
        </g>

        {/* Realistic White Plumeria / Frangipani Blossom on Upper Left */}
        <g filter="url(#flowerDrop)">
          {/* Petal 1 - Top Left */}
          <path
            d="M 125 185
               C 105 160, 70 145, 75 125
               C 80 105, 115 105, 135 130
               C 145 145, 140 170, 125 185
               Z"
            fill="#FFFFFF"
            stroke="#F1F5F9"
            strokeWidth="0.5"
          />

          {/* Petal 2 - Top Right */}
          <path
            d="M 135 180
               C 135 150, 145 110, 168 115
               C 188 120, 185 155, 165 175
               C 155 185, 140 185, 135 180
               Z"
            fill="#FFFFFF"
            stroke="#F1F5F9"
            strokeWidth="0.5"
          />

          {/* Petal 3 - Right */}
          <path
            d="M 140 190
               C 165 180, 195 185, 192 205
               C 190 225, 160 225, 140 205
               C 132 198, 135 192, 140 190
               Z"
            fill="#FEFDF9"
            stroke="#F1F5F9"
            strokeWidth="0.5"
          />

          {/* Petal 4 - Bottom */}
          <path
            d="M 130 195
               C 140 215, 140 250, 122 250
               C 105 250, 105 220, 120 198
               C 124 194, 128 194, 130 195
               Z"
            fill="#FFFFFF"
            stroke="#F1F5F9"
            strokeWidth="0.5"
          />

          {/* Petal 5 - Left */}
          <path
            d="M 122 188
               C 100 195, 65 190, 68 170
               C 70 150, 100 155, 120 180
               C 123 184, 123 186, 122 188
               Z"
            fill="#FCFCFC"
            stroke="#F1F5F9"
            strokeWidth="0.5"
          />

          {/* Golden Center Sunburst & Core Glow */}
          <circle cx="130" cy="188" r="22" fill="url(#plumeriaCenter)" />
          <circle cx="130" cy="188" r="8" fill="#F59E0B" opacity="0.85" />
          {/* Subtle petal vein highlights */}
          <path d="M 130 188 Q 110 145 95 130" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 130 188 Q 155 145 165 130" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 130 188 Q 165 195 180 205" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 130 188 Q 125 225 120 238" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 130 188 Q 95 185 80 175" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </g>
      </svg>

      {showTextLabel && (
        <div className="flex flex-col text-left">
          <span className="font-thai font-extrabold text-lg leading-tight tracking-tight text-[#2F0050] dark:text-[#E9D5FF]">
            ထိုင်းစာ · Thai Vocab
          </span>
          <span className="font-burmese text-xs text-[#64748B] dark:text-[#94A3B8] leading-normal">
            တော်ဝင် မယ်ရီဂိုးလ် ဝေါဟာရ စနစ်
          </span>
        </div>
      )}
    </div>
  );
};
