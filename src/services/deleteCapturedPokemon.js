import { auth } from '@/utils/firebase';

const getToken = async () => {
  const token = await auth.currentUser.getIdToken(true); // Force refresh
  return token;
};

const deleteCapturedPokemon = async (pokemonId) => {
  try {
    const token = await getToken();

    const response = await fetch(`http://localhost:8080/api/capture?pokemonId=${pokemonId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Try to parse the error response as JSON, fallback to text
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete captured Pokémon.");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete captured Pokémon.");
      }
    }

    // Handle success response (JSON or text)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json(); // Parse JSON response
    } else {
      return await response.text(); // Return plain text response
    }
  } catch (error) {
    console.error("Error deleting captured Pokémon:", error.message);
    throw new Error(error.message);
  }
};

export default deleteCapturedPokemon;
