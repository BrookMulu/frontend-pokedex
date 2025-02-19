import React, { useEffect, useState } from 'react';
import fetchPokemonDetails from '@/services/fetchPokemonDetails';
import { Box, Card, CardMedia, CardContent, Typography, Stack, Button } from '@mui/material';
import Link from 'next/link';
import typeColors from '@/app/color/TypeColor';
import abilityColors from '@/app/color/AbilityColor';
import eggGroupColors from '@/app/color/EggGroup';
import AnimatedStat from './AnimatedStat';

const PokemonDetails = ({ initialPokemonId, setBackgroundColor }) => {
  const [pokemonId, setPokemonId] = useState(initialPokemonId); // Track current Pokemon ID
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonColor, setPokemonColor] = useState('#1976d2');

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const details = await fetchPokemonDetails(pokemonId); // Fetch by ID
        setPokemonDetails(details);

        if (details[0]?.color) {
          setBackgroundColor(details[0].color);
          setPokemonColor(details[0].color);
        }
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    getPokemonDetails();
    console.log('Initial Pokémon ID:', initialPokemonId);
    console.log('Current Pokémon ID:', pokemonId);
  }, [pokemonId]); // Re-fetch whenever pokemonId changes

  const handlePrevious = () => {
    if (pokemonId > 1) {
      setPokemonId((prev) => prev - 1); // Update to previous ID
    }
  };

  const handleNext = () => {
    setPokemonId((prev) => prev + 1); // Update to next ID
  };

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  const maxStatValue = 100;

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' }, minHeight: '100vh', }}>
      <div style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Card sx={{ maxWidth: 1000, justifyContent: 'center', alignItems: 'center', marginLeft:15, borderRadius: "12px", width: { xs: '40%', md: '800px', lg: '1000px' }, height:{xs: '40%', md: '800px', lg: '1000px'} }}>
          {pokemonDetails.map((pokemon) => (
            <div key={pokemon.id}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto', // Creates a grid with three columns
                  alignItems: 'center',
                  padding: '16px',
                  //width: '100%'
                }}
              >
                {/* Back Button */}
                <Button
                  variant="contained"
                  onClick={() => window.history.back()}
                  sx={{
                    minWidth: '100px',
                    height: '40px',
                    fontSize: '14px',
                    textTransform: 'none',
                    borderRadius: "16px", 
                    boxShadow: "none",
                    backgroundColor: pokemonColor,
                    color: ['white', 'yellow'].includes(pokemonColor) ? 'black' : 'white',
                    '&:hover': {
                      backgroundColor: pokemonColor, // Keep same on hover
                      color: ['white', 'yellow'].includes(pokemonColor) ? 'black' : 'white',
                    }
                  }}
                  
                >
                  Back
                </Button>

                {/* Name */}
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '24px',
                    textAlign: 'center',
                    justifySelf: 'center',
                    marginRight:12
                  }}
                >
                  {pokemon.id}. {pokemon.name}
                </Typography>

                {/* Empty space for alignment */}
                <div />
              </Box>

              {/* Genus */}
              <Typography
                variant="h5"
                component="div"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontFamily: 'Roboto, sans-serif',
                  marginTop: 10,
                  fontSize: '20px',
                  color: '#808080',
                  marginLeft:4,
                  marginTop:-10
                }}
              >
                {pokemon.genus}
              </Typography>

              <hr />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  // Adjust spacing between sections
                  marginTop: 2,
                }}
              >
                {/* Main Image */}
                <Box
                  sx={{
                    height: 400,
                    width: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    style={{
                      maxHeight: '300px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>

                {/* Back Image, GIF, and Height/Weight */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3,
                    mr:8
                  }}
                >
                  {/* Back Image and GIF */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      mt:6,
                      mr:12
                    }}
                  >
                    {/* Back Image */}
                    <Box
                      sx={{
                        height: 140,
                        width: 140,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={pokemon.backImageUrL}
                        alt={`${pokemon.name} Back`}
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>

                    {/* Animated GIF */}
                    <Box
                      sx={{
                        height: 140,
                        width: 140,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={pokemon.gifImageUrl}
                        alt={`${pokemon.name} Animated`}
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Height and Weight */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '12px',
                      width: '200px', // Fixed width for consistent layout
                      mt:10
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        fontSize: '18px', // Larger text
                      }}
                    >
                      <img
                        src="/heighticon.png"
                        alt="Height Icon"
                        style={{
                          height: 90, // Icon size
                          marginRight: 12,
                        }}
                      />
                      <Box sx={{
                        display:'flex',
                        flexDirection:'column'
                        }}
                      >
                      <Typography>Height</Typography>
                      <Typography>{pokemon.height*10} cm  </Typography>
                      <Typography>{Math.floor(pokemon.height*10*0.393701)} in </Typography>
                      </Box>
                    </Typography>
                    <hr style={{ width: '100%', borderColor: '#ddd', margin: '30px 0' }} />
                    <Typography
                      variant="body1"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '18px', // Larger text
                      }}
                    >
                      <img
                        src="/weight.png"
                        alt="Weight Icon"
                        style={{
                          height: 100, // Icon size
                          marginRight: 12,
                        }}
                      />
                      <Box sx={{
                        display:'flex',
                        flexDirection:'column'
                        }}
                      >
                      <Typography>Weight</Typography> 
                      <Typography>{pokemon.weight} Kg  </Typography>
                      <Typography>{Math.floor(pokemon.weight*2.20462)} lbs  </Typography>
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Box>


              {/* Stats & Details */}
              <CardContent>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                  justifyContent="space-between"
                  mt={3}
                > 
                   <Box
                    display="flex"
                     flexDirection="row"
                     flexWrap="wrap"
                     alignItems="center"
                     gap={9}
                    >
                     {Object.entries(pokemon.stat).map(([key, value], index) => (
                       <AnimatedStat
                         key={index}
                         statName={key}
                         value={value}
                         maxStatValue={maxStatValue}
                       />
                     ))}
                   </Box>
                </Stack>

                {/* Types, Abilities, Egg Groups */}
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" mt={3}>
                  {/* Types */}
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      <strong>Types:</strong>
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {pokemon.types.map((type, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '12px',
                            padding: '4px 8px',
                            backgroundColor: typeColors[type.type] || '#f0f0f0',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                          }}
                        >
                          {type.type.toUpperCase()}
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Abilities */}
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      <strong>Abilities:</strong>
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {pokemon.abilities.map((ability, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '12px',
                            padding: '4px 8px',
                            backgroundColor: abilityColors[ability.ability] || '#cce5ff',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                          }}
                        >
                          {ability.ability.toUpperCase()}
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Egg Groups */}
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      <strong>Egg Groups:</strong>
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {pokemon.egg_groups.map((eggGroup, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '12px',
                            padding: '4px 8px',
                            backgroundColor: eggGroupColors[eggGroup.egg_group] || '#e0e0e0',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                          }}
                        >
                          {eggGroup.egg_group.toUpperCase()}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* Description */}
                <Typography
                  sx={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    borderRadius: '4px',
                    margin: '16px 0',
                    backgroundColor: '#f5f5f5',
                    
                  }}
                >
                  <strong>Description:</strong> {pokemon.description}
                </Typography>

                {/* Navigation Buttons */}
                <Box display="flex" justifyContent="space-between" gap={2} mt={3}>
                  <Button
                    variant="contained"
                    onClick={handlePrevious}
                    disabled={pokemonId <= 1}
                    sx={{
                      width: '400px', // Set desired horizontal length
                      padding: '10px 0', // Add padding for vertical size
                      fontSize: '16px', // Adjust font size for readability
                      textTransform: 'none', // Disable uppercase transformation
                      borderRadius: "16px", 
                      boxShadow: "none", 
                      backgroundColor: pokemonColor, // Set button color
                      color: ['white', 'yellow'].includes(pokemonColor) ? 'black' : 'white',
                      '&:hover': {
                        backgroundColor: pokemonColor, // Keep same on hover
                        color: ['white', 'yellow'].includes(pokemonColor) ? 'black' : 'white',
                      }
                    }}
                  >
                    Previous
                  </Button>
                  <Button 
                  variant="contained" 
                  onClick={handleNext}
                  sx={{
                    width: '400px', // Set desired horizontal length
                    padding: '10px 0', // Add padding for vertical size
                    fontSize: '16px', // Adjust font size for readability
                    textTransform: 'none', // Disable uppercase transformation
                    borderRadius: "16px", 
                    boxShadow: "none", 
                    backgroundColor: pokemonColor, // Set button color
                    color: ['white', 'yellow'].includes(pokemonColor) ? 'black' : 'white',
                      '&:hover': {
                        backgroundColor: pokemonColor, // Keep same on hover
                        color: ['white', 'yellow'].includes(pokemonColor) ? 'black' : 'white',
                      }
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </CardContent>
            </div>
          ))}
        </Card>
      </div>
    </Box>
  );
};

export default PokemonDetails;


