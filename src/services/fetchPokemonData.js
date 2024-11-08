// const fetchPokemonData = async (currentPage, setPokemonData, setTotalPages) => {
//     try {
//       //get pokemon info
//       const pokemonInfo = await fetch(`http://localhost:8080/api/pokemon?page=${currentPage}&size=8`);
//       if (!pokemonInfo.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const pokemonData = await pokemonInfo.json();
//       const totalData = pokemonData.content.map(pokemon => ({
//         ...pokemon,
//         imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
//       }))
//       console.log('totalData: ', totalData)
//       setPokemonData(totalData);
//       setTotalPages(pokemonData.totalPages);
//     } 
//     catch (error) {
//       console.error('Error fetching Pokemon data:', error);
//     }
//   };
//   export default fetchPokemonData;
const fetchPokemonData = async (currentPage, searchName, sortOrder, setPokemonData, setTotalPages) => {
  try {
    let url = `http://localhost:8080/api/pokemon?page=${currentPage}&size=8`;
    if (searchName) {
      url = `http://localhost:8080/api/pokemon/findByName?name=${searchName}`;
      const pokemonInfo = await fetch(url);
      if (!pokemonInfo.ok) {
      throw new Error('Failed to fetch data');
      }
    
      const pokemonData = await pokemonInfo.json();
      const totalData = pokemonData.map(pokemon => ({
        ...pokemon,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
      }));
      setPokemonData(totalData);
      setTotalPages(pokemonData.totalPages);
    }
    else{
      const pokemonInfo = await fetch(url);
      if (!pokemonInfo.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const pokemonData = await pokemonInfo.json();
      const totalData = pokemonData.content.map(pokemon => ({
        ...pokemon,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
      }));
      
      if (sortOrder === 'nameAsc') {
        totalData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === 'nameDsc') {
        totalData.sort((a, b) => b.name.localeCompare(a.name));
      }
      //totalData.sort((a, b) => b.name.localeCompare(a.name));
      //totalData.sort((a, b) => sortOrder === 'nameAsc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
      console.log(totalData);
      //totalData.sort((a, b) => sortOrder === 'idAsc' ? a.id - b.id : b.id - a.id);

      setPokemonData(totalData);
      setTotalPages(pokemonData.totalPages);
    }
    
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
  }
};

export default fetchPokemonData;


