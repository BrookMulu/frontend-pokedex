import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const AnimatedStat = ({ statName, value, maxStatValue }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      let animationFrame;
  
      const animate = () => {
        setProgress((prev) => {
          if (prev >= value) {
            cancelAnimationFrame(animationFrame);
            return value;
          }
          return prev + 1; // Increment the progress
        });
        animationFrame = requestAnimationFrame(animate);
      };
  
      animate();
      return () => cancelAnimationFrame(animationFrame);
    }, [value]);
  
    const normalizedValue = (progress / maxStatValue) * 100;
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width={100}
      >
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={normalizedValue}
            size={120}
            thickness={4}
            sx={{
              color:
                normalizedValue > 75
                  ? 'green'
                  : normalizedValue > 50
                  ? 'orange'
                  : 'red', // Optional color coding
            }}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="textPrimary">
              {progress}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, fontWeight: 'bold' }}
        >
          {statName.replace('_', ' ').toUpperCase()}
        </Typography>
      </Box>
    );
  };
export default AnimatedStat