import { auth } from '@/utils/firebase';
import reauthenticateUser from '@/utils/reauthenticateUser';

const getToken = async () => {
  if (!auth.currentUser) {
    console.error("No user authenticated.");
    throw new Error("User is not authenticated.");
  }
  try {
    const token = await auth.currentUser.getIdToken(true); // Force refresh
    //console.log("Retrieved token:", token);
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw new Error("Failed to fetch token.");
  }
};

const capturePokemon = async (pokemonId) => {
    try {
      const token = await getToken();
      //const token = await reauthenticateUser();
      
      //console.log("Token sent in request:", token); // Log token for debugging 

      const response = await fetch(
        `http://localhost:8080/api/capture?pokemonId=${pokemonId}`, // Replace with the correct API endpoint
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to capture the Pokémon.");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error capturing Pokémon:", error.message);
      throw new Error(error.message);
    }
  };
  
  export default capturePokemon;
  