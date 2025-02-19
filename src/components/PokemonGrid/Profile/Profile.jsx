// import React, { useState, useEffect } from "react";
// import {
//   Avatar,
//   IconButton,
//   Tooltip,
//   Menu,
//   MenuItem,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Box,
//   Grid
// } from "@mui/material";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "@/utils/firebase"; 
// import Link from "next/link";
// import fetchCapturedPokemon from "@/services/fetchCapturedPokemon";
// import fetchPokemonData from "@/services/fetchPokemonData";
// import PokemonCard from "../PokemonCard/PokemonCard";
// import filters from "@/app/Params/filters";
// import deleteCapturedPokemon from "@/services/deleteCapturedPokemon";

// const ProfileIcon = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [capturedPokemons, setCapturedPokemons] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false); // Modal state
//   const open = Boolean(anchorEl);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setIsLoggedIn(true);
//         setUser(currentUser);
//       } else {
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     setIsLoggedIn(false);
//     setUser(null);
//     handleClose();
//   };

//   const handleCollectionsClick = async () => {
//     if (user) {
//       try {
//         //const token = await user.getIdToken(); // Retrieve Firebase token for authentication
//         const pokemons = await fetchCapturedPokemon(token); // Fetch detailed Pokémon data
//         setCapturedPokemons(pokemons); // Set captured Pokémon in state
//         setDialogOpen(true); // Open modal
//       } catch (error) {
//         console.error("Error fetching captured Pokémon:", error);
//       }
//     }
//     handleClose();
//   };

//   // const handleRemoveCapturedPokemon = async (pokemonId) => {
//   //   try {
//   //     const result = await deleteCapturedPokemon(pokemonId); // Call the delete service
//   //     alert(`Successfully removed Pokémon with ID ${id}`);

//   //     // Update the UI to remove the deleted Pokémon
//   //     setCapturedPokemons((prevPokemons) =>
//   //       prevPokemons.filter((pokemon) => pokemon.id !== id)
//   //     );
//   //   } catch (error) {
//   //     console.error("Error removing captured Pokémon:", error);
//   //     alert("Failed to remove Pokémon. Please try again.");
//   //   }
//   // };



//   return (
//     <div>
//       <Tooltip title={isLoggedIn ? "Menu" : "Login"} arrow>
//         {isLoggedIn ? (
//           <IconButton
//             onClick={handleClick}
//             size="large"
//             sx={{ ml: 2}}
//             aria-controls={open ? "profile-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//           >
//             <Avatar
//               alt={user?.displayName || "Profile Icon"}
//               src={user?.photoURL || "/JohnDoe.jpeg"}
//               sx={{
//                 bgcolor: "#fff",
//                 border: "5px solid White",
//                 "&:hover": {
//                   boxShadow: "0 0 10px rgba(146, 204, 229, 0.6)",
//                 },
//                 height: 60,
//                 width: 60,
//               }}
//             />
//           </IconButton>
//         ) : (
//           <Link href="/login" passHref>
//             <IconButton size="large" sx={{ ml: 2 }}>
//               <Avatar
//                 alt="Profile Icon"
//                 src="/profileIcon.png"
//                 sx={{
//                   bgcolor: "#fff",
//                   border: "5px solid white",
//                   "&:hover": {
//                     boxShadow: "0 0 10px rgba(146, 204, 229, 0.6)",
//                   },
//                   height: 50,
//                   width: 50,
//                 }}
//               />
//             </IconButton>
//           </Link>
//         )}
//       </Tooltip>

//       {isLoggedIn && (
//         <Menu
//           id="profile-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           MenuListProps={{
//             "aria-labelledby": "profile-icon",
//           }}
//           sx={{
//             "& .MuiPaper-root": {
//               borderRadius: "12px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             },
//           }}
//         >
//           {user?.displayName && (
//             <MenuItem disabled sx={{ pointerEvents: "none" }}>
//               <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//                 {user.displayName}
//               </Typography>
//             </MenuItem>
//           )}
//           <MenuItem onClick={handleCollectionsClick}>
//             <Typography>Collections</Typography>
//           </MenuItem>
//           <MenuItem onClick={handleLogout}>
//             <Typography>Logout</Typography>
//           </MenuItem>
//         </Menu>
//       )}

//       {/* Modal to Display Captured Pokémon */}
//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
//         <Box sx={{marginLeft:40, alignItems:'center'}}> 
//           <DialogTitle sx={{alignItems:'center'}}>Your Captured Pokémon</DialogTitle>
//         </Box>
//         <DialogContent>
//           {capturedPokemons.length > 0 ? (
//             <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
//             <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ width: '80%' }}>
//               {capturedPokemons.map((pokemon) => (
//                 <Grid key={pokemon.id} item xs={12} sm={6} md={4} lg={3}>
//                   <PokemonCard pokemon={pokemon} 
//                     showCancelIcon // Show the "X" icon only in this context
                    
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//           ) : (
//             <Typography>No Pokémon captured yet!</Typography>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ProfileIcon;
import React, { useState, useEffect } from "react";
import {
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
} from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Link from "next/link";
import fetchCapturedPokemon from "@/services/fetchCapturedPokemon";
import PokemonCard from "../PokemonCard/PokemonCard";
import deleteCapturedPokemon from "@/services/deleteCapturedPokemon";

const INACTIVITY_LIMIT = 60 * 60 * 1000; // 1 hour in milliseconds

const ProfileIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [capturedPokemons, setCapturedPokemons] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false); // Modal state
  const open = Boolean(anchorEl);
  const [inactivityTimeout, setInactivityTimeout] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
        resetInactivityTimer(); // Start tracking inactivity
      } else {
        setIsLoggedIn(false);
        setUser(null);
        clearInactivityTimer(); // Clear timer if logged out
      }
    });

    return () => {
      unsubscribe();
      clearInactivityTimer();
    };
  }, []);

  const resetInactivityTimer = () => {
    clearInactivityTimer();
    const timeout = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_LIMIT);
    setInactivityTimeout(timeout);
  };

  const clearInactivityTimer = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }
  };

  const handleUserActivity = () => {
    if (isLoggedIn) {
      resetInactivityTimer();
    }
  };

  useEffect(() => {
    // Add event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    return () => {
      // Cleanup event listeners on unmount
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
    };
  }, [isLoggedIn]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    clearInactivityTimer(); // Clear the timer on logout
    await signOut(auth);
    setIsLoggedIn(false);
    setUser(null);
    handleClose();
  };

  const handleCollectionsClick = async () => {
    if (user) {
      try {
        const token = await user.getIdToken(); // Retrieve Firebase token for authentication
        const pokemons = await fetchCapturedPokemon(token); // Fetch detailed Pokémon data
        setCapturedPokemons(pokemons); // Set captured Pokémon in state
        setDialogOpen(true); // Open modal
      } catch (error) {
        console.error("Error fetching captured Pokémon:", error);
      }
    }
    handleClose();
  };

  const handleRemoveCapturedPokemon = async (pokemonId, pokemonName) => {
    try {
      const result = await deleteCapturedPokemon(pokemonId); // Call the delete service
      alert(`Successfully removed ${pokemonName}`);

      setCapturedPokemons((prevPokemons) => prevPokemons.filter((pokemon) => pokemon.id !== pokemonId)
);
    } catch (error) {
      console.error("Error removing captured Pokémon:", error);
      alert("Failed to remove Pokémon. Please try again.");
    }
};

  return (
    <div>
      <Tooltip title={isLoggedIn ? "Menu" : "Login"} arrow>
        {isLoggedIn ? (
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{ ml: 2 }}
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt={user?.displayName || "Profile Icon"}
              src={user?.photoURL || "/JohnDoe.jpeg"}
              sx={{
                bgcolor: "#fff",
                border: "5px solid White",
                "&:hover": {
                  boxShadow: "0 0 10px rgba(146, 204, 229, 0.6)",
                },
                height: 60,
                width: 60,
              }}
            />
          </IconButton>
        ) : (
          <Link href="/login" passHref>
            <IconButton size="large" sx={{ ml: 2 }}>
              <Avatar
                alt="Profile Icon"
                src="/profileIcon.png"
                sx={{
                  bgcolor: "#fff",
                  border: "5px solid white",
                  "&:hover": {
                    boxShadow: "0 0 10px rgba(146, 204, 229, 0.6)",
                  },
                  height: 50,
                  width: 50,
                }}
              />
            </IconButton>
          </Link>
        )}
      </Tooltip>

      {isLoggedIn && (
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "profile-icon",
          }}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {user?.displayName && (
            <MenuItem disabled sx={{ pointerEvents: "none" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {user.displayName}
              </Typography>
            </MenuItem>
          )}
          <MenuItem onClick={handleCollectionsClick}>
            <Typography>Collections</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      )}

      {/* Modal to Display Captured Pokémon */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
        <Box sx={{ marginLeft: 40, alignItems: "center" }}>
          <DialogTitle sx={{ alignItems: "center" }}>Your Captured Pokémon</DialogTitle>
        </Box>
        <DialogContent>
          {capturedPokemons.length > 0 ? (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ width: "80%" }}>
                {capturedPokemons.map((pokemon) => (
                  <Grid key={pokemon.id} item xs={12} sm={6} md={4} lg={3}>
                    <PokemonCard pokemon={pokemon} showCancelIcon onRemove={handleRemoveCapturedPokemon} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Typography>No Pokémon captured yet!</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileIcon;


