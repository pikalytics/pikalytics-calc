var ABILITIES_ADV = [
  "Air Lock",
  "Battle Armor",
  "Blaze",
  "Chlorophyll",
  "Clear Body",
  "Cloud Nine",
  "Drizzle",
  "Drought",
  "Flash Fire",
  "Flash Fire (activated)",
  "Forecast",
  "Guts",
  "Huge Power",
  "Hustle",
  "Hyper Cutter",
  "Intimidate",
  "Levitate",
  "Marvel Scale",
  "Overgrow",
  "Pure Power",
  "Rain Dish",
  "Sand Stream",
  "Sand Veil",
  "Shell Armor",
  "Soundproof",
  "Swarm",
  "Swift Swim",
  "Thick Fat",
  "Torrent",
  "Volt Absorb",
  "Water Absorb",
  "White Smoke",
  "Wonder Guard",
];

var ABILITIES_DPP = ABILITIES_ADV.concat([
  "Adaptability",
  "Bad Dreams",
  "Download",
  "Dry Skin",
  "Filter",
  "Flower Gift",
  "Gluttony",
  "Heatproof",
  "Ice Body",
  "Iron Fist",
  "Klutz",
  "Magic Guard",
  "Mold Breaker",
  "Motor Drive",
  "Normalize",
  "Poison Heal",
  "Reckless",
  "Scrappy",
  "Simple",
  "Skill Link",
  "Slow Start",
  "Sniper",
  "Snow Cloak",
  "Snow Warning",
  "Solar Power",
  "Solid Rock",
  "Technician",
  "Tinted Lens",
  "Unaware",
]);

var ABILITIES_BW = ABILITIES_DPP.concat([
  "Analytic",
  "Big Pecks",
  "Contrary",
  "Cursed Body",
  "Defeatist",
  "Defiant",
  "Flare Boost",
  "Friend Guard",
  "Harvest",
  "Healer",
  "Heavy Metal",
  "Illusion",
  "Imposter",
  "Infiltrator",
  "Iron Barbs",
  "Light Metal",
  "Justified",
  "Magic Bounce",
  "Moody",
  "Moxie",
  "Multiscale",
  "Mummy",
  "Overcoat",
  "Pickpocket",
  "Poison Touch",
  "Prankster",
  "Rattled",
  "Regenerator",
  "Sand Force",
  "Sand Rush",
  "Sap Sipper",
  "Sheer Force",
  "Telepathy",
  "Teravolt",
  "Toxic Boost",
  "Turboblaze",
  "Unnerve",
  "Victory Star",
  "Weak Armor",
  "Wonder Skin",
  "Zen Mode",
]);

var ABILITIES_XY = ABILITIES_BW.concat([
  "Aerilate",
  "Aura Break",
  "Aroma Veil",
  "Bulletproof",
  "Cheek Pouch",
  "Competitive",
  "Dark Aura",
  "Delta Stream",
  "Desolate Land",
  "Fairy Aura",
  "Flower Veil",
  "Fur Coat",
  "Gale Wings",
  "Gooey",
  "Grass Pelt",
  "Magician",
  "Mega Launcher",
  "Parental Bond",
  "Pixilate",
  "Primordial Sea",
  "Protean",
  "Refrigerate",
  "Stance Change",
  "Strong Jaw",
  "Sweet Veil",
  "Symbiosis",
  "Tough Claws",
]);

var ABILITIES_SM = ABILITIES_XY.concat([
  "Battery",
  "Battle Bond",
  "Beast Boost",
  "Berserk",
  "Comatose",
  "Corrosion",
  "Dancer",
  "Dazzling",
  "Disguise",
  "Electric Surge",
  "Emergency Exit",
  "Fluffy",
  "Full Metal Body",
  "Galvanize",
  "Grassy Surge",
  "Innards Out",
  "Liquid Voice",
  "Long Reach",
  "Merciless",
  "Misty Surge",
  "Neuroforce",
  "Power Construct",
  "Power of Alchemy",
  "Prism Armor",
  "Psychic Surge",
  "Queenly Majesty",
  "RKS System",
  "Receiver",
  "Schooling",
  "Shadow Shield",
  "Shields Down",
  "Slush Rush",
  "Stamina",
  "Stakeout",
  "Steelworker",
  "Soul-Heart",
  "Surge Surfer",
  "Tangling Hair",
  "Triage",
  "Water Bubble",
  "Water Compaction",
  "Wimp Out",
]);

var ABILITIES_SS = ABILITIES_SM.concat([
  "As One (Glastrier)",
  "As One (Spectrier)",
  "Ball Fetch",
  "Chilling Neigh",
  "Cotton Down",
  "Curious Medicine",
  "Dauntless Shield",
  "Dragon's Maw",
  "Gorilla Tactics",
  "Grim Neigh",
  "Gulp Missile",
  "Hunger Switch",
  "Ice Face",
  "Ice Scales",
  "Intrepid Sword",
  "Libero",
  "Mimicry",
  "Mirror Armor",
  "Neutralizing Gas",
  "Pastel Veil",
  "Perish Body",
  "Power Spot",
  "Propeller Tail",
  "Punk Rock",
  "Quick Draw",
  "Ripen",
  "Sand Spit",
  "Screen Cleaner",
  "Stalwart",
  "Steam Engine",
  "Steely Spirit",
  "Transistor",
  "Unseen Fist",
  "Wandering Spirit",
]);

var ABILITIES_SV = ABILITIES_SS.concat([
  "Anger Shell",
  "Armor Tail",
  "Beads of Ruin",
  "Commander",
  "Costar",
  "Cud Chew",
  "Earth Eater",
  "Electromorphosis",
  "Embody Aspect (Cornerstone)",
  "Embody Aspect (Hearthflame)",
  "Embody Aspect (Teal)",
  "Embody Aspect (Wellspring)",
  "Good as Gold",
  "Guard Dog",
  "Hadron Engine",
  "Hospitality",
  "Lingering Aroma",
  "Mind's Eye",
  "Mycelium Might",
  "Opportunist",
  "Orichalcum Pulse",
  "Protosynthesis",
  "Purifying Salt",
  "Quark Drive",
  "Rocky Payload",
  "Seed Sower",
  "Sharpness",
  "Supersweet Syrup",
  "Supreme Overlord",
  "Sword of Ruin",
  "Tablets of Ruin",
  "Thermal Exchange",
  "Toxic Chain",
  "Toxic Debris",
  "Vessel of Ruin",
  "Well-Baked Body",
  "Wind Power",
  "Wind Rider",
  "Zero to Hero",
]);

ABILITIES_XY.splice(ABILITIES_XY.indexOf("Lightning Rod"), 1, "Lightning Rod");
