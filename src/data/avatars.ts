// Avatar image pool — URL-based (no local downloads)
// 40 avatars across 6 categories

// --- Pokémon (10) — PokeAPI official artwork ---
const pokemon: string[] = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',   // Pikachu
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',    // Charizard
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',  // Mewtwo
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',    // Bulbasaur
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',    // Charmander
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',    // Squirtle
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png',  // Lapras
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',  // Eevee
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png',  // Tyranitar
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png',  // Rayquaza
];

// --- Anime characters (5) — MyAnimeList CDN ---
const anime: string[] = [
  'https://myanimelist.net/images/characters/6/386735.jpg',   // Tanjiro Kamado (Demon Slayer)
  'https://myanimelist.net/images/characters/15/422168.jpg',  // Satoru Gojo (Jujutsu Kaisen)
  'https://myanimelist.net/images/characters/7/299404.jpg',   // Izuku Midoriya (BnHA)
  'https://myanimelist.net/images/characters/2/378254.jpg',   // Nezuko Kamado (Demon Slayer)
  'https://myanimelist.net/images/characters/6/467646.jpg',   // Yuji Itadori (Jujutsu Kaisen)
];

// --- Metal band logos (5) — logos-world.net ---
const metalBands: string[] = [
  'https://logos-world.net/wp-content/uploads/2020/09/Metallica-Logo.png',
  'https://logos-world.net/wp-content/uploads/2023/05/Iron-Maiden-Logo.png',
  'https://logos-world.net/wp-content/uploads/2022/04/Black-Sabbath-Logo.png',
  'https://logos-world.net/wp-content/uploads/2022/02/Slayer-Logo.png',
  'https://logos-world.net/wp-content/uploads/2020/12/Megadeth-Logo.png',
];

// --- Nature / environment (5) — Lorem Picsum (stable, seed-based) ---
const nature: string[] = [
  'https://picsum.photos/seed/forest/300/300',
  'https://picsum.photos/seed/ocean/300/300',
  'https://picsum.photos/seed/waterfall/300/300',
  'https://picsum.photos/seed/volcano/300/300',
  'https://picsum.photos/seed/savanna/300/300',
];

// --- Landscape (5) — Lorem Picsum (stable, seed-based) ---
const landscape: string[] = [
  'https://picsum.photos/seed/mountain/300/300',
  'https://picsum.photos/seed/glacier/300/300',
  'https://picsum.photos/seed/canyon/300/300',
  'https://picsum.photos/seed/aurora/300/300',
  'https://picsum.photos/seed/desert/300/300',
];

// --- Software / tech logos (10) — devicons via jsDelivr CDN ---
const tech: string[] = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
];

export const AVATAR_POOL: string[] = [
  ...pokemon,
  ...anime,
  ...metalBands,
  ...nature,
  ...landscape,
  ...tech,
];

export const DEFAULT_AVATAR = AVATAR_POOL[0];
