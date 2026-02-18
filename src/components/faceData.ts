// Face data types and generation logic

export interface FaceData {
  headShape: number;
  skinColor: string;
  eyeStyle: number;
  eyeColor: string;
  noseStyle: number;
  mouthStyle: number;
  hairStyle: number;
  hairColor: string;
  accessory: number;
  blush: boolean;
  freckles: boolean;
}

export const skinColors = [
  '#FFDBB4', // Light peach
  '#EDB98A', // Warm beige
  '#D08B5B', // Tan
  '#8D5524', // Brown
  '#4A2C0A', // Deep brown
  '#FFE0BD', // Pale
  '#C68642', // Golden brown
];

export const hairColors = [
  '#1A1A2E', // Black
  '#4A3728', // Dark brown
  '#8B4513', // Auburn
  '#FFD700', // Blonde
  '#FF6B6B', // Coral/Pink
  '#4ECDC4', // Teal
  '#C44CFF', // Purple
  '#FF8C42', // Orange
];

export const eyeColors = [
  '#4A3728', // Brown
  '#1A1A2E', // Black
  '#4ECDC4', // Teal
  '#7CB9E8', // Sky blue
  '#6B8E23', // Olive green
  '#C44CFF', // Purple
];

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomFace(): FaceData {
  return {
    headShape: randomInt(0, 4),
    skinColor: randomPick(skinColors),
    eyeStyle: randomInt(0, 5),
    eyeColor: randomPick(eyeColors),
    noseStyle: randomInt(0, 3),
    mouthStyle: randomInt(0, 4),
    hairStyle: randomInt(0, 5),
    hairColor: randomPick(hairColors),
    accessory: randomInt(0, 4),
    blush: Math.random() > 0.5,
    freckles: Math.random() > 0.7,
  };
}
