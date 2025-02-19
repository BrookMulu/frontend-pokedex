const fetchPokemonDetails = async (pokemonId) => {
  try {
    // Fetch Pokémon details from your backend
    const response = await fetch(`http://localhost:8080/api/pokemon/findByID/${pokemonId}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }

    const data = await response.json();

    // Fetch color data for each Pokémon from PokeAPI
    const totalData = await Promise.all(
      data.map(async (pokemon) => {
        try {
          const colorResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
          if (!colorResponse.ok) {
            throw new Error(`Failed to fetch color for Pokémon ID ${pokemon.id}`);
          }
          const colorData = await colorResponse.json();

          return {
            ...pokemon,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
            backImageUrL: `https://play.pokemonshowdown.com/sprites/xyani-back/${pokemon.name.toLowerCase()}.gif`,
            gifImageUrl: `https://play.pokemonshowdown.com/sprites/ani/${pokemon.name.toLowerCase()}.gif`,
            colorUrl: `https://pokeapi.co/api/v2/pokemon-color/${colorData.color.name}`, // Add Pokémon color URL
            color: colorData.color.name, // Add Pokémon color name for direct use
          };
        } catch (colorError) {
          console.error(`Error fetching Pokémon color: ${colorError.message}`);
          return {
            ...pokemon,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
            backImageUrL: `https://play.pokemonshowdown.com/sprites/xyani-back/${pokemon.name.toLowerCase()}.gif`,
            gifImageUrl: `https://play.pokemonshowdown.com/sprites/ani/${pokemon.name.toLowerCase()}.gif`,
            colorUrl: null, // Default to null if color fetch fails
            color: null, // Default to null if color fetch fails
          };
        }
      })
    );

    return totalData;
  } catch (error) {
    throw new Error(`Error fetching Pokémon details: ${error.message}`);
  }
};

export default fetchPokemonDetails;

  