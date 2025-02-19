import PokedexLogo from "@/components/Footer/PokedexLogo";
import PokemonGrid from "@/components/PokemonGrid/PokemonGrid";
import Filters from "@/components/PokemonGrid/Filters/NameFilter";
import Footer from "@/components/Footer/Footer";
import React from 'react';
export default function LoginPage(){
    return(
        <>
        <PokedexLogo/>
        <PokemonGrid/>
        <Footer />
        </>
    );
}