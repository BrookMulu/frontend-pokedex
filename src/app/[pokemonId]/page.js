'use client'
import React from "react";
import { useState } from "react";
import PokemonDetails from "@/components/PokemonDetails/PokemonDetails";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const pokemonId = ({params}) => {
    const{pokemonId} = params;
    const [backgroundColor, setBackgroundColor] = useState('#D2B48C');
    return (
      <div style={{ 
        backgroundColor: backgroundColor,  
        minHeight: '100vh', // Ensures the background covers the full viewport height
        height: '100%',
        minWidth: '100vw', 
        width: '200%', // Ensures the background covers the full width
        display: 'flex',       
        //alignItems: 'center',
        margin: 0, // Remove any default margin
        padding: 0, // Remove any default padding
        overflowX: 'hidden', // Prevent horizontal scrolling

      }}>
        {pokemonId && (
          <PokemonDetails initialPokemonId={parseInt(pokemonId, 10)} setBackgroundColor={setBackgroundColor} />
        )}
      </div>
    );
  }
export default pokemonId;





