'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Correct import for the Close icon
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import capturePokemon from '@/services/capturePokemon';

const PokemonCard = ({ pokemon, onRemove, showCancelIcon = false }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleCaptureClick = () => {
    setIsDialogOpen(true); // Open dialog when Pokéball is clicked
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close dialog
  };

  const handleCaptureConfirm = async () => {
    try {
      // Assuming you have access to the Firebase token
      const capturedPokemon = await capturePokemon(pokemon.id);
  
      // Notify the user of success
      alert(`${pokemon.name} has been captured!`);
    } catch (error) {
      console.error(error);
      alert("Failed to capture the Pokémon. Please try again.");
    } finally {
      handleDialogClose(); // Close dialog after action
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(pokemon.id, pokemon.name); // Trigger the remove callback
    }
  };

  return (
    <>
      <Card
        sx={{
          position:'relative',
          maxWidth: 240,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.3s, box-shadow 0.3s',
          borderRadius: '16px',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {showCancelIcon && (
          <IconButton
            onClick={handleRemove}
            sx={{
              position: 'absolute',
              top: "4px",
              right: "4px",
              backgroundColor: 'rgba(0,0,0,0.2)',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.4)',
              width: '32px', // Set smaller width
              height: '32px', // Set smaller height
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <CardMedia
          sx={{
            height: 150,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </CardMedia>
        <CardContent sx={{ padding: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            {pokemon.name}
          </Typography>
          {isLoggedIn && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginY: 1,
                '&:hover img': {
                  transform: 'scale(1.2)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
              onClick={handleCaptureClick} // Trigger dialog on click
            >
              <img
                src="/PokeballFooter.png"
                alt="Pokeball Icon"
                style={{
                  width: 40,
                  height: 'auto',
                  cursor: 'pointer',
                }}
              />
            </Box>
          )}
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: isLoggedIn ? '0' : '35px',
            }}
          >
            <Link href={`/${pokemon.id}`} passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#92CCE5',
                  borderRadius: '16px',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#A2D4EC',
                    boxShadow: '0 4px 6px rgba(146, 204, 229, 0.4)',
                  },
                }}
              >
                Details
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>

      {/* Capture Confirmation Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="capture-dialog-title"
        aria-describedby="capture-dialog-description"
      >
        <DialogTitle id="capture-dialog-title">Capture Pokémon</DialogTitle>
        <DialogContent>
          <DialogContentText id="capture-dialog-description">
            Are you sure you want to capture {pokemon.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCaptureConfirm} color="primary" autoFocus>
            Yes, Capture
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PokemonCard;
