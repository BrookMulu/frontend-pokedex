'use client';

import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard/PokemonCard';
import Pagination from './Pagination/Pagination';
import fetchPokemonData from '@/services/fetchPokemonData';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Filters from './Filters/NameFilter';
import AdvancedFilter from './Filters/AdvancedFilter';
import filters from '@/Params/filters';
import AZFilter from './Filters/AZFilter';
import ProfileIcon from './Profile/Profile';
import Image from 'next/image';

const PokemonGrid = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState({ filters: { ...filters } });
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [timerActive, setTimerActive] = useState(false); // Timer state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setTimerActive(true); // Start the timer
      await fetchPokemonData(currentPage, params.filters, sortOrder, setPokemonData, setTotalPages);
      setTimeout(() => {
        setLoading(false); // End loading after the timer
        setTimerActive(false); // Reset the timer state
      }, 500); // Delay of 500ms for smoother transition
    };

    fetchData();
  }, [currentPage, params.filters, sortOrder]);

  const handleFilterApply = (appliedFilters) => {
    setParams((prevParams) => ({
      filters: { ...prevParams.filters, ...appliedFilters },
    }));
    setCurrentPage(0); // Reset to the first page
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(0); // Reset to the first page when sorting changes
  };

  const renderLoadingOverlay = () => {
    if (!loading && !timerActive) return null;
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999, // Ensure it overlays everything
        }}
      >
        <Image src="/Loading.gif" alt="Loading" width={550} height={550} />
      </Box>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {renderLoadingOverlay()}

      {/* Filters and Profile */}
      <Box style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        marginY: 3,
        }}>
        <Box sx={{ marginRight: 5 }}>
          <AZFilter onFilterChange={handleSortChange} />
        </Box>
        <Box style={{ marginRight: 5 }}>
          <Filters onSearch={(name) => handleFilterApply({ name })} />
        </Box>
        <Box>
          <ProfileIcon />
        </Box>
      </Box>

      {/* Advanced Filter */}
      <Box style={{ marginTop: -15, marginBottom: 15 }}>
        <AdvancedFilter onApply={handleFilterApply} />
      </Box>

      {/* Pokemon Grid */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom:-20 }}>
        <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center' }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{ width: '80%' }} >
            {pokemonData.map((pokemon) => (
              <Grid key={pokemon.id} item xs={12} sm={6} md={4} lg={3} sx={{ padding: 0 }} >
                  <PokemonCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

      {/* Pagination */}
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
          onNextPage={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
        />
      </div>
    </div>
  );
};

export default PokemonGrid;
