import { auth } from '@/utils/firebase';

const getToken = async () => {
  if (!auth.currentUser) {
    throw new Error('User is not authenticated.');
  }
  const token = await auth.currentUser.getIdToken(true); // Force refresh
  return token;
};

const fetchCapturedPokemon = async () => {
    const token = await getToken();
    const response = await fetch('http://localhost:8080/api/capture', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch captured Pokémon');
    }
  
    const pokemons = await response.json();
  
    // Add imageUrl to each Pokémon
    return pokemons.map((pokemon) => ({
      ...pokemon,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    }));
  };
  
  export default fetchCapturedPokemon;
  
  