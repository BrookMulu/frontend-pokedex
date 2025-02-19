const fetchPokemonData = async (currentPage, filters, sortOrder, setPokemonData, setTotalPages) => {
  console.log('Filters received in fetchPokemonData:', filters); 
  const queryParams = new URLSearchParams();


   Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      queryParams.append(key, filters[key]); // Append non-empty filters
    }
  });

   queryParams.append('page', currentPage);
   queryParams.append('size', 8);
   try {
    const url = `http://localhost:8080/api/pokemon/filter?${queryParams.toString()}`;
    const pokemonInfo = await fetch(url);
    if (!pokemonInfo.ok) {
      throw new Error('Failed to fetch data');
    }

    const pokemonData = await pokemonInfo.json();
    const totalData = pokemonData.content.map(pokemon => ({
      ...pokemon,
      imageUrl:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    }));

    if (!sortOrder || sortOrder === 'idAsc') {
      totalData.sort((a, b) => a.id - b.id); // Default to idAsc if sortOrder is undefined or empty
    } else if (sortOrder === 'idDsc') {
      totalData.sort((a, b) => b.id - a.id);
    } else if (sortOrder === 'nameAsc') {
      totalData.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    } else if (sortOrder === 'nameDsc') {
      totalData.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));

    }

    setPokemonData(totalData);
    setTotalPages(pokemonData.totalPages);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
  }
};


export default fetchPokemonData;


