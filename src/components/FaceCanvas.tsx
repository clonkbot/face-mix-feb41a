import { FaceData } from './faceData';

interface FaceCanvasProps {
  face: FaceData;
}

export default function FaceCanvas({ face }: FaceCanvasProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      style={{ background: '#FAF6F0' }}
    >
      {/* Background pattern */}
      <defs>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
          <circle cx="10" cy="10" r="1" fill="#1A1A2E" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#dots)" />

      {/* Hair back layer (for some styles) */}
      <HairBack style={face.hairStyle} color={face.hairColor} />

      {/* Head shape */}
      <HeadShape shape={face.headShape} color={face.skinColor} />

      {/* Ears */}
      <Ears color={face.skinColor} headShape={face.headShape} />

      {/* Blush */}
      {face.blush && <Blush skinColor={face.skinColor} />}

      {/* Freckles */}
      {face.freckles && <Freckles />}

      {/* Eyes */}
      <Eyes style={face.eyeStyle} color={face.eyeColor} />

      {/* Nose */}
      <Nose style={face.noseStyle} skinColor={face.skinColor} />

      {/* Mouth */}
      <Mouth style={face.mouthStyle} />

      {/* Hair front layer */}
      <HairFront style={face.hairStyle} color={face.hairColor} />

      {/* Accessories */}
      <Accessory style={face.accessory} />
    </svg>
  );
}

function HeadShape({ shape, color }: { shape: number; color: string }) {
  const shapes = [
    // Oval
    <ellipse key="oval" cx="200" cy="220" rx="110" ry="130" fill={color} stroke="#1A1A2E" strokeWidth="4" />,
    // Round
    <circle key="round" cx="200" cy="220" r="120" fill={color} stroke="#1A1A2E" strokeWidth="4" />,
    // Square-ish
    <rect key="square" x="85" y="95" width="230" height="250" rx="40" fill={color} stroke="#1A1A2E" strokeWidth="4" />,
    // Heart
    <path key="heart" d="M200 350 C100 280 70 180 100 140 C140 90 200 120 200 160 C200 120 260 90 300 140 C330 180 300 280 200 350Z" fill={color} stroke="#1A1A2E" strokeWidth="4" />,
    // Long oval
    <ellipse key="long" cx="200" cy="230" rx="95" ry="140" fill={color} stroke="#1A1A2E" strokeWidth="4" />,
  ];
  return shapes[shape];
}

function Ears({ color, headShape }: { color: string; headShape: number }) {
  // Adjust ear position based on head shape
  const yOffset = headShape === 3 ? 20 : 0;
  return (
    <g>
      <ellipse cx="85" cy={200 + yOffset} rx="15" ry="25" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <ellipse cx="315" cy={200 + yOffset} rx="15" ry="25" fill={color} stroke="#1A1A2E" strokeWidth="3" />
    </g>
  );
}

function Blush({ skinColor }: { skinColor: string }) {
  // Darken the skin color slightly for blush
  return (
    <g opacity="0.5">
      <ellipse cx="120" cy="250" rx="25" ry="15" fill="#FF6B6B" />
      <ellipse cx="280" cy="250" rx="25" ry="15" fill="#FF6B6B" />
    </g>
  );
}

function Freckles() {
  return (
    <g fill="#8B4513" opacity="0.4">
      <circle cx="140" cy="230" r="3" />
      <circle cx="155" cy="245" r="2" />
      <circle cx="130" cy="250" r="2.5" />
      <circle cx="150" cy="260" r="2" />
      <circle cx="260" cy="230" r="3" />
      <circle cx="245" cy="245" r="2" />
      <circle cx="270" cy="250" r="2.5" />
      <circle cx="250" cy="260" r="2" />
      <circle cx="190" cy="270" r="2" />
      <circle cx="210" cy="265" r="2.5" />
    </g>
  );
}

function Eyes({ style, color }: { style: number; color: string }) {
  const eyeStyles = [
    // Normal round
    <g key="normal">
      <ellipse cx="150" cy="200" rx="25" ry="20" fill="white" stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="155" cy="200" r="12" fill={color} />
      <circle cx="158" cy="196" r="5" fill="white" />
      <ellipse cx="250" cy="200" rx="25" ry="20" fill="white" stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="245" cy="200" r="12" fill={color} />
      <circle cx="242" cy="196" r="5" fill="white" />
    </g>,
    // Sleepy/happy
    <g key="sleepy">
      <path d="M125 200 Q150 215 175 200" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
      <path d="M225 200 Q250 215 275 200" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
    </g>,
    // Wide surprised
    <g key="wide">
      <circle cx="150" cy="200" r="28" fill="white" stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="150" cy="200" r="16" fill={color} />
      <circle cx="155" cy="194" r="6" fill="white" />
      <circle cx="250" cy="200" r="28" fill="white" stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="250" cy="200" r="16" fill={color} />
      <circle cx="245" cy="194" r="6" fill="white" />
    </g>,
    // Winking
    <g key="wink">
      <ellipse cx="150" cy="200" rx="25" ry="20" fill="white" stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="155" cy="200" r="12" fill={color} />
      <circle cx="158" cy="196" r="5" fill="white" />
      <path d="M225 200 Q250 185 275 200" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
      <path d="M235 195 L245 188 L255 195" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
    </g>,
    // X eyes (dizzy)
    <g key="dizzy">
      <path d="M135 185 L165 215 M135 215 L165 185" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
      <path d="M235 185 L265 215 M235 215 L265 185" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
    </g>,
    // Star eyes
    <g key="stars">
      <polygon points="150,180 156,195 172,195 159,205 164,220 150,210 136,220 141,205 128,195 144,195" fill="#FFE66D" stroke="#1A1A2E" strokeWidth="2" />
      <polygon points="250,180 256,195 272,195 259,205 264,220 250,210 236,220 241,205 228,195 244,195" fill="#FFE66D" stroke="#1A1A2E" strokeWidth="2" />
    </g>,
  ];
  return eyeStyles[style];
}

function Nose({ style, skinColor }: { style: number; skinColor: string }) {
  // Create a darker version of skin color for nose shadow
  const noseStyles = [
    // Simple triangle
    <polygon key="triangle" points="200,220 190,260 210,260" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />,
    // Round button
    <circle key="button" cx="200" cy="250" r="12" fill="none" stroke="#1A1A2E" strokeWidth="3" />,
    // Line
    <path key="line" d="M200 225 L200 260" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />,
    // Cute little nose
    <path key="cute" d="M195 250 Q200 260 205 250" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />,
  ];
  return noseStyles[style];
}

function Mouth({ style }: { style: number }) {
  const mouthStyles = [
    // Smile
    <path key="smile" d="M160 290 Q200 330 240 290" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />,
    // Big grin
    <g key="grin">
      <path d="M150 290 Q200 350 250 290" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="4" />
      <path d="M160 290 L240 290" fill="none" stroke="white" strokeWidth="8" />
    </g>,
    // O mouth surprised
    <ellipse key="o" cx="200" cy="300" rx="25" ry="30" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="4" />,
    // Flat line
    <path key="flat" d="M165 295 L235 295" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />,
    // Tongue out
    <g key="tongue">
      <path d="M160 290 Q200 320 240 290" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="200" cy="315" rx="15" ry="20" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="3" />
    </g>,
  ];
  return mouthStyles[style];
}

function HairBack({ style, color }: { style: number; color: string }) {
  const hairStyles = [
    null, // Bald - no back hair
    null, // Short spiky - no back
    // Long straight - back layer
    <path key="longback" d="M70 180 L70 320 Q70 380 130 380 L270 380 Q330 380 330 320 L330 180" fill={color} stroke="#1A1A2E" strokeWidth="3" />,
    null, // Curly - no back
    // Ponytail back
    <g key="ponyback">
      <path d="M200 100 Q320 150 300 280 Q280 350 260 380" fill={color} stroke="#1A1A2E" strokeWidth="3" />
    </g>,
    null, // Mohawk - no back
  ];
  return hairStyles[style];
}

function HairFront({ style, color }: { style: number; color: string }) {
  const hairStyles = [
    // Bald
    null,
    // Short spiky
    <g key="spiky">
      <path d="M100 160 L120 100 L140 140 L160 80 L180 130 L200 70 L220 130 L240 80 L260 140 L280 100 L300 160" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <path d="M100 160 Q200 180 300 160 Q320 200 300 220 L100 220 Q80 200 100 160" fill={color} stroke="#1A1A2E" strokeWidth="3" />
    </g>,
    // Long straight
    <g key="long">
      <path d="M90 180 Q90 100 200 90 Q310 100 310 180" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <path d="M100 180 L80 250" stroke={color} strokeWidth="30" />
      <path d="M300 180 L320 250" stroke={color} strokeWidth="30" />
      <path d="M100 180 L80 250 M300 180 L320 250" stroke="#1A1A2E" strokeWidth="3" />
    </g>,
    // Curly/Afro
    <g key="curly">
      <circle cx="130" cy="120" r="40" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="200" cy="100" r="45" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="270" cy="120" r="40" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="100" cy="170" r="35" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="300" cy="170" r="35" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="160" cy="90" r="30" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="240" cy="90" r="30" fill={color} stroke="#1A1A2E" strokeWidth="3" />
    </g>,
    // Ponytail
    <g key="ponytail">
      <path d="M90 180 Q90 100 200 90 Q310 100 310 180 Q250 160 200 170 Q150 160 90 180" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <ellipse cx="290" cy="280" rx="25" ry="60" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <circle cx="270" cy="130" r="15" fill="#FFE66D" stroke="#1A1A2E" strokeWidth="2" />
    </g>,
    // Mohawk
    <g key="mohawk">
      <path d="M180 170 L170 50 L200 80 L230 50 L220 170" fill={color} stroke="#1A1A2E" strokeWidth="3" />
      <path d="M120 180 Q200 150 280 180" fill={color} stroke="#1A1A2E" strokeWidth="3" />
    </g>,
  ];
  return hairStyles[style];
}

function Accessory({ style }: { style: number }) {
  const accessories = [
    // None
    null,
    // Glasses
    <g key="glasses">
      <circle cx="150" cy="200" r="35" fill="none" stroke="#1A1A2E" strokeWidth="4" />
      <circle cx="250" cy="200" r="35" fill="none" stroke="#1A1A2E" strokeWidth="4" />
      <path d="M185 200 L215 200" stroke="#1A1A2E" strokeWidth="4" />
      <path d="M115 200 L80 185" stroke="#1A1A2E" strokeWidth="4" />
      <path d="M285 200 L320 185" stroke="#1A1A2E" strokeWidth="4" />
    </g>,
    // Hat
    <g key="hat">
      <ellipse cx="200" cy="105" rx="120" ry="20" fill="#1A1A2E" />
      <path d="M120 105 L120 60 Q200 20 280 60 L280 105" fill="#1A1A2E" />
      <rect x="120" y="80" width="160" height="10" fill="#FF6B6B" />
    </g>,
    // Bow
    <g key="bow">
      <path d="M240 120 Q280 90 300 120 Q280 140 240 120" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="2" />
      <path d="M240 120 Q200 90 180 120 Q200 140 240 120" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="2" />
      <circle cx="240" cy="120" r="10" fill="#FFE66D" stroke="#1A1A2E" strokeWidth="2" />
    </g>,
    // Earrings
    <g key="earrings">
      <circle cx="75" cy="230" r="10" fill="#FFE66D" stroke="#1A1A2E" strokeWidth="2" />
      <circle cx="325" cy="230" r="10" fill="#FFE66D" stroke="#1A1A2E" strokeWidth="2" />
    </g>,
  ];
  return accessories[style];
}
