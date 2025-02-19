// 'use client';
// import React, { useState } from "react";
// import { IconButton, TextField, Box, InputAdornment, CircularProgress } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';

// const Filters = ({ onSearch }) => {
//   const [searchName, setSearchName] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSuggestions = async (input) => {
//     if (!input) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost:8080/api/pokemon/findByName?name=${input}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch suggestions");
//       }
//       const data = await response.json();
//       setSuggestions(data.map((pokemon) => pokemon.name)); // Assuming response returns Pokémon objects with a `name` field
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchName(value);
//     fetchSuggestions(value);
//   };

//   const handleSearch = () => {
//     onSearch(searchName);
//   };

//   const handleKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       handleSearch();
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-evenly', marginLeft: '10px', marginTop: '25px', marginBottom: '25px' }}>
//       <Box sx={{ width: 600, maxWidth: '100%', display: 'flex', justifyContent: 'space-around', position: 'relative' }}>
//         <TextField
//           value={searchName}
//           onChange={handleInputChange}
//           fullWidth
//           label="Search for Pokemons"
//           id="fullWidth"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleSearch} type="button" sx={{ p: '10px' }} aria-label="search">
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//             sx: {
//               backgroundColor: '#fff', // White background inside the field
//               borderRadius: '16px', // Rounded corners
//             },
//           }}
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               borderRadius: '16px',
//               backgroundColor: '#fff',
//               borderColor: 'transparent',
//               '& fieldset': {
//                 borderColor: 'transparent',
//               },
//               '&:hover fieldset': {
//                 borderColor: '#92CCE5',
//                 boxShadow: '0 4px 6px rgba(146, 204, 229, 0.3)', // Subtle shadow on hover
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: '#92CCE5',
//                 boxShadow: '0 0 8px rgba(146, 204, 229, 0.6)', // Prominent shadow when focused
//               },
//             },
//             '& .MuiInputLabel-root': {
//               color: '#aaa', // Lighter label color
//             },
//             '& .MuiInputLabel-root.Mui-focused': {
//               color: '#92CCE5', // Label color matches border color when focused
//             },
//           }}
//           onKeyDown={handleKeyDown}
//         />
//         {suggestions.length > 0 && (
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '100%',
//               left: 0,
//               right: 0,
//               maxHeight: '200px',
//               overflowY: 'auto',
//               backgroundColor: '#fff',
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//               zIndex: 1000,
//             }}
//           >
//             {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
//                 <CircularProgress size={20} />
//               </Box>
//             ) : (
//               suggestions.map((suggestion, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     padding: '10px',
//                     cursor: 'pointer',
//                     '&:hover': {
//                       backgroundColor: '#f0f0f0',
//                     },
//                   }}
//                   onClick={() => {
//                     setSearchName(suggestion);
//                     handleSearch();
//                     setSuggestions([]); // Clear suggestions on selection
//                   }}
//                 >
//                   {suggestion}
//                 </Box>
//               ))
//             )}
//           </Box>
//         )}
//       </Box>
//     </div>
//   );
// };

// export default Filters;
'use client';
import React, { useState } from "react";
import { IconButton, TextField, Box, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Filters = ({ onSearch }) => {
  const [searchName, setSearchName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/pokemon/findByName?name=${input}`);
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      setSuggestions(data.map((pokemon) => pokemon.name)); // Assuming response returns Pokémon objects with a `name` field
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchName(value);
    fetchSuggestions(value);
  };

  const handleSearch = () => {
    onSearch(searchName);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchName(suggestion);
    onSearch(suggestion); // Trigger the search directly when a suggestion is clicked
    setSuggestions([]); // Clear suggestions on selection
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginLeft: '10px', marginTop: '25px', marginBottom: '25px' }}>
      <Box sx={{ width: 600, maxWidth: '100%', display: 'flex', justifyContent: 'space-around', position: 'relative' }}>
        <TextField
          value={searchName}
          onChange={handleInputChange}
          fullWidth
          label="Search for Pokemons"
          id="fullWidth"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              backgroundColor: '#fff', // White background inside the field
              borderRadius: '16px', // Rounded corners
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
              backgroundColor: '#fff',
              borderColor: 'transparent',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: '#92CCE5',
                boxShadow: '0 4px 6px rgba(146, 204, 229, 0.3)', // Subtle shadow on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#92CCE5',
                boxShadow: '0 0 8px rgba(146, 204, 229, 0.6)', // Prominent shadow when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#aaa', // Lighter label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#92CCE5', // Label color matches border color when focused
            },
          }}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: '200px',
              overflowY: 'auto',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              zIndex: 1000,
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              suggestions.map((suggestion, index) => (
                <Box
                  key={index}
                  sx={{
                    padding: '10px',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                  onClick={() => handleSuggestionClick(suggestion)} // Handle suggestion click
                >
                  {suggestion}
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Filters;

