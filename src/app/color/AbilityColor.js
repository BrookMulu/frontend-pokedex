const abilityColors = {
    chlorophyll: "#78C850", // Green for plant-based abilities
    "solar-power": "#F08030", // Orange for Solar Power
    "rain-dish": "#6890F0", // Blue for rain-related abilities
    "run-away": "#A8A878", // Gray for general abilities
    "shed-skin": "#C03028", // Red for defensive abilities
    "tinted-lens": "#A890F0", // Purple for vision-related abilities
    sniper: "#B8A038", // Brown for precision-based abilities
    "big-pecks": "#F8D030", // Yellow for bird-related abilities
    hustle: "#A8B820", // Lime for energy-related abilities
    unnervce: "#705848", // Brown for intimidation
    "lightning-rod": "#F8D030", // Yellow for Electric abilities
    "sand-rush": "#E0C068", // Sand color for Ground
    "sheer-force": "#C03028", // Red for aggressive abilities
    "friend-guard": "#F85888", // Pink for supportive abilities
    unaware: "#A8A878", // Gray for Neutral Abilities
    drought: "#F08030", // Orange for sun-related abilities
    frisk: "#A890F0", // Purple for sensory abilities
    infiltrator: "#705898", // Dark purple for stealth
    stench: "#705848", // Brown for smelly abilities
    "effect-spore": "#98D8D8", // Cyan for spore-related abilities
    damp: "#6890F0", // Blue for water-related abilities
    "wonder-skin": "#EE99AC", // Pink for magical abilities
    "sand-force": "#E0C068", // Sand for Ground
    "swift-swim": "#6890F0", // Blue for water/swimming abilities
    defiant: "#C03028", // Red for aggressive abilities
    justified: "#705848", // Brown for honor-related abilities
    "magic-guard": "#EE99AC", // Pink for magical protection
    steadfast: "#A8A878", // Gray for persistence
    gluttony: "#F8D030", // Yellow for food-related abilities
    "sand-veil": "#E0C068", // Sand for Ground
    "flame-body": "#F08030", // Orange for fire-related abilities
    regenerator: "#78C850", // Green for healing
    analytic: "#705898", // Purple for intelligence
    "tangled-feet": "#A890F0", // Purple for movement-related abilities
    "ice-body": "#98D8D8", // Cyan for ice
    "poison-touch": "#A040A0", // Purple for poison
    overcoat: "#A8A878", // Gray for protection
    levitate: "#A890F0", // Sky Blue for flying-related abilities
    drizzle: "#6890F0", // Blue for rain
    "skill-link": "#A8B820", // Lime for attack-related abilities
    "early-bird": "#F8D030", // Yellow for waking-related abilities
    prankster: "#A890F0", // Purple for trickster abilities
    telepathy: "#705898", // Violet for mental abilities
    immunity: "#78C850", // Green for health
    intimidate: "#705848", // Brown for intimidation
    "light-metal": "#B8B8D0", // Light Gray for Steel
    contrary: "#C03028", // Red for oppositional abilities
    pickpocket: "#705848", // Brown for theft
    "honey-gather": "#F8D030", // Yellow for honey-related abilities
    "thick-fat": "#A8A878", // Gray for defense
    moody: "#EE99AC", // Pink for mood-related abilities
    insomnia: "#A8A878", // Gray for sleep prevention
    "water-veil": "#6890F0", // Blue for water
    "natural-cure": "#78C850", // Green for healing
    "speed-boost": "#F85888", // Pink for speed
    rivalry: "#C03028", // Red for competition
    "compound-eyes": "#A8B820", // Lime for vision
    "own-tempo": "#A8A878", // Gray for focus
    scrappy: "#C03028", // Red for toughness
    truant: "#A8A878", // Gray for laziness
    "wonder-guard": "#EE99AC", // Pink for magical abilities
    "heavy-metal": "#B8B8D0", // Light Gray for Steel
    minus: "#A8A878", // Gray for neutrality
    "volt-absorb": "#F8D030", // Yellow for electricity
    pressure: "#705898", // Purple for force
    "anger-point": "#C03028", // Red for anger
    "shell-armor": "#B8B8D0", // Light Gray for defense
    "toxic-boost": "#A040A0", // Purple for poison
    adaptability: "#78C850", // Green for change
    "storm-drain": "#6890F0", // Blue for water
    "cute-charm": "#EE99AC", // Pink for charm
    forecast: "#F8D030", // Yellow for weather
    protean: "#78C850", // Green for adaptability
    oblivious: "#A8A878", // Gray for neutrality
    sturdy: "#B8B8D0", // Light Gray for defense
    "air-lock": "#A890F0", // Sky Blue for flying-related abilities
    "serene-grace": "#EE99AC", // Pink for grace
    soundproof: "#A8A878", // Gray for sound
    "flower-gift": "#F08030", // Orange for flowers
    "flare-boost": "#F08030", // Orange for fire
    limber: "#A8A878", // Gray for flexibility
    "keen-eye": "#A8B820", // Lime for vision
    "rough-skin": "#705848", // Brown for toughness
    "poison-heal": "#A040A0", // Purple for poison
    "slow-start": "#A8A878", // Gray for slow abilities
    "bad-dreams": "#705848", // Brown for sleep
    multitype: "#7038F8", // Purple for multi-type
    "victory-star": "#F8D030", // Yellow for victory
    overgrow: "#78C850", // Green for Grass
    blaze: "#F08030", // Orange for Fire
    torrent: "#6890F0", // Blue for Water
    simple: "#A8A878", // Gray for simple abilities
    "mold-breaker": "#C03028", // Red for breaking
    klutz: "#A8A878", // Gray for clumsiness
    "cursed-body": "#705898", // Purple for curse
    "weak-armor": "#B8B8D0", // Light Gray for defense
    "inner-focus": "#A8A878", // Gray for focus
    aftermath: "#705848", // Brown for aftermath
    harvest: "#78C850", // Green for plant-based abilities
    "battle-armor": "#B8B8D0", // Light Gray for defense
    unburden: "#F85888", // Pink for freedom
    "cloud-nine": "#A890F0", // Sky Blue for weather
    reckless: "#C03028", // Red for recklessness
    healer: "#78C850", // Green for healing
    technician: "#705848", // Brown for skill
    "dry-skin": "#705848", // Brown for dryness
    "vital-spirit": "#F85888", // Pink for energy
    moxie: "#C03028", // Red for toughness
    rattled: "#A890F0", // Sky Blue for nerves
    hydration: "#6890F0", // Blue for water
    imposter: "#F85888", // Pink for disguise
    anticipation: "#705898", // Purple for alertness
    "quick-feet": "#F85888", // Pink for speed
    guts: "#C03028", // Red for toughness
    "snow-cloak": "#98D8D8", // Cyan for ice
    static: "#F8D030", // Yellow for electricity
    "marvel-scale": "#A890F0", // Sky Blue for scale
    multiscale: "#705848", // Brown for toughness
    synchronize: "#705898", // Purple for connection
    "leaf-guard": "#78C850", // Green for plants
    "flash-fire": "#F08030", // Orange for fire
    "iron-fist": "#B8B8D0", // Light Gray for strength
    "water-absorb": "#6890F0", // Blue for water
    "super-luck": "#F8D030", // Yellow for luck
    "magic-bounce": "#EE99AC", // Pink for magic
    plus: "#F8D030", // Yellow for positivity
    "sap-sipper": "#78C850", // Green for plants
};
export default abilityColors;
   