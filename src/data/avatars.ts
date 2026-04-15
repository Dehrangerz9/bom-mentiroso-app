// Avatar image pool — URL-based (no local downloads)
// ~95 avatars across multiple categories

// --- Pokémon: original 10 ---
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

// --- Pokémon: Eeveelutions (8) ---
const eeveelutions: string[] = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png',  // Vaporeon
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png',  // Jolteon
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png',  // Flareon
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png',  // Espeon
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png',  // Umbreon
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/470.png',  // Leafeon
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/471.png',  // Glaceon
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png',  // Sylveon
];

// --- Demon Slayer / Kimetsu no Yaiba (7) — MyAnimeList CDN ---
const demonSlayer: string[] = [
  'https://myanimelist.net/images/characters/6/386735.jpg',   // Tanjiro Kamado
  'https://myanimelist.net/images/characters/2/378254.jpg',   // Nezuko Kamado
  'https://myanimelist.net/images/characters/10/459689.jpg',  // Zenitsu Agatsuma
  'https://myanimelist.net/images/characters/3/329560.jpg',   // Inosuke Hashibira
  'https://myanimelist.net/images/characters/10/423443.jpg',   // Kyojuro Rengoku
  'https://myanimelist.net/images/characters/16/387706.jpg',  // Tengen Uzui
  'https://myanimelist.net/images/characters/3/386591.jpg',   // Shinobu Kochou
];

// --- Jujutsu Kaisen (8) — MyAnimeList CDN ---
const jjk: string[] = [
  'https://myanimelist.net/images/characters/15/422168.jpg',  // Satoru Gojo
  'https://myanimelist.net/images/characters/6/467646.jpg',   // Yuji Itadori
  'https://myanimelist.net/images/characters/12/621887.jpg',  // Megumi Fushiguro
  'https://myanimelist.net/images/characters/12/422313.jpg',  // Nobara Kugisaki
  'https://myanimelist.net/images/characters/16/581424.jpg',  // Kento Nanami
  'https://myanimelist.net/images/characters/6/431152.jpg',   // Sukuna
  'https://myanimelist.net/images/characters/10/461503.jpg',  // Yuuta Okkotsu
  'https://myanimelist.net/images/characters/15/423949.jpg',  // Maki Zenin
];

// --- Boku no Hero Academia (3) — MyAnimeList CDN ---
const bnha: string[] = [
  'https://myanimelist.net/images/characters/7/299404.jpg',   // Izuku Midoriya
];

// --- Dragon Ball (5) — MyAnimeList CDN ---
const dragonBall: string[] = [
  'https://myanimelist.net/images/characters/15/357229.jpg',  // Son Goku
  'https://myanimelist.net/images/characters/14/86185.jpg',   // Vegeta
  'https://myanimelist.net/images/characters/12/110722.jpg',  // Son Gohan
  'https://myanimelist.net/images/characters/8/45628.jpg',    // Piccolo
  'https://myanimelist.net/images/characters/7/359258.jpg',   // Freeza
];

// --- Naruto (5) — MyAnimeList CDN ---
const naruto: string[] = [
  'https://myanimelist.net/images/characters/2/284121.jpg',   // Naruto Uzumaki
  'https://myanimelist.net/images/characters/9/131317.jpg',   // Sasuke Uchiha
  'https://myanimelist.net/images/characters/7/284129.jpg',   // Kakashi Hatake
  'https://myanimelist.net/images/characters/9/284122.jpg',   // Itachi Uchiha
  'https://myanimelist.net/images/characters/8/314717.jpg',   // Sakura Haruno
];

// --- Sailor Moon (5) — MyAnimeList CDN ---
const sailorMoon: string[] = [
  'https://myanimelist.net/images/characters/4/312776.jpg',   // Usagi Tsukino / Sailor Moon
  'https://myanimelist.net/images/characters/2/324042.jpg',   // Rei Hino / Sailor Mars
  'https://myanimelist.net/images/characters/16/501610.jpg',  // Ami Mizuno / Sailor Mercury
  'https://myanimelist.net/images/characters/2/324032.jpg',   // Makoto Kino / Sailor Jupiter
  'https://myanimelist.net/images/characters/14/324034.jpg',  // Minako Aino / Sailor Venus
];

// --- Metal band logos (5) — logos-world.net ---
const metalBands: string[] = [
  'https://logos-world.net/wp-content/uploads/2020/09/Metallica-Logo.png',
  'https://logos-world.net/wp-content/uploads/2023/05/Iron-Maiden-Logo.png',
  'https://logos-world.net/wp-content/uploads/2022/04/Black-Sabbath-Logo.png',
  'https://logos-world.net/wp-content/uploads/2022/02/Slayer-Logo.png',
  'https://logos-world.net/wp-content/uploads/2020/12/Megadeth-Logo.png',
];

// --- Nature / environment (5) — Lorem Picsum ---
const nature: string[] = [
  'https://picsum.photos/seed/forest/300/300',
  'https://picsum.photos/seed/ocean/300/300',
  'https://picsum.photos/seed/waterfall/300/300',
  'https://picsum.photos/seed/volcano/300/300',
  'https://picsum.photos/seed/savanna/300/300',
];

// --- Landscape (5) — Lorem Picsum ---
const landscape: string[] = [
  'https://picsum.photos/seed/mountain/300/300',
  'https://picsum.photos/seed/glacier/300/300',
  'https://picsum.photos/seed/canyon/300/300',
  'https://picsum.photos/seed/aurora/300/300',
  'https://picsum.photos/seed/desert/300/300',
];

// --- Minerals (5) — Unsplash ---
const minerals: string[] = [
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&q=80',  // amethyst
  'https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=300&q=80',  // quartz crystal
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&q=80',  // gems
  'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80',  // mineral specimen
  'https://images.unsplash.com/photo-1632789395770-20e6f63be806?w=300&q=80',  // tourmaline
];

// --- Games (2) — Steam CDN + Minecraft Wiki ---
const games: string[] = [
  'https://cdn.cloudflare.steamstatic.com/steam/apps/612390/header.jpg',            // Dandara: Trials of Fear
  'https://minecraft.wiki/images/thumb/Grass_Block_JE7_BE6.png/150px-Grass_Block_JE7_BE6.png', // Minecraft
];

// --- Hollow Knight characters (3) — fextralife wiki CDN ---
const hollowKnight: string[] = [
  'https://hollowknight.wiki.fextralife.com/file/Hollow-Knight/char_hollow_knight_wiki_infobox.png',           // The Knight
  'https://hollowknight.wiki.fextralife.com/file/Hollow-Knight/hornet_npc_icon_hollow_knight_wiki.png',        // Hornet
  'https://hollowknight.wiki.fextralife.com/file/Hollow-Knight/the-grimm-troupe-small-infobox-hollow-knight-wiki-guide.jpg', // Grimm
];

// --- Western animation / film characters (1) ---
const westernChars: string[] = [
  'https://static.wikia.nocookie.net/disney/images/6/66/Profile_-_Scar.jpeg',  // Scar (The Lion King)
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
  ...eeveelutions,
  ...demonSlayer,
  ...jjk,
  ...bnha,
  ...dragonBall,
  ...naruto,
  ...sailorMoon,
  ...metalBands,
  ...nature,
  ...landscape,
  ...minerals,
  ...games,
  ...hollowKnight,
  ...westernChars,
  ...tech,
];

export const DEFAULT_AVATAR = AVATAR_POOL[0];
