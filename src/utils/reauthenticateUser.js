import { auth } from "@/utils/firebase";

const reauthenticateUser = async () => {
  if (!auth.currentUser) {
    throw new Error("User is not authenticated. Please log in again.");
  }

  try {
    // Refresh the current user's state and retrieve a new token
    await auth.currentUser.reload(); 
    const token = await auth.currentUser.getIdToken(true); // Force refresh token
    return token;
  } catch (error) {
    console.error("Reauthentication failed:", error);
    throw new Error("Session expired. Please log in again.");
  }
};

export default reauthenticateUser