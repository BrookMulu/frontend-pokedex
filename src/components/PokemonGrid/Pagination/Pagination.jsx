import React from 'react';
import Button from '@mui/material/Button'
import { Box } from '@mui/material';
const Pagination = ({ currentPage, totalPages, onPreviousPage, onNextPage }) => {
  return (
   
      <Box sx={{display: 'flex', justifyContent:'space-between', marginTop:'50px', marginBottom:'25px', paddingX:'170px'}}>
        <Button 
          variant='contained' 
          sx={{
            borderRadius: "16px", 
            boxShadow: "none", 
            backgroundColor: "#92CCE5", 
            "&:hover": {
              backgroundColor: "#A2D4EC", 
              boxShadow: "0 4px 6px rgba(146, 204, 229, 0.4)",
            },
            width:250,
            height:50,
            fontSize:"14px"
            }}
           onClick={onPreviousPage} 
           disabled={currentPage === 0}
          >
              Previous
          </Button>
        <p>Page {currentPage + 1} of {totalPages}</p>
        <Button 
          variant='contained' 
          sx={{
            borderRadius: "16px", 
            boxShadow: "none", 
            backgroundColor: "#92CCE5", 
            "&:hover": {
              backgroundColor: "#A2D4EC", 
              boxShadow: "0 4px 6px rgba(146, 204, 229, 0.4)",
            },
            width:250,
            height:50,
            fontSize:"14px"
            }}
          onClick={onNextPage} 
          disabled={currentPage === totalPages - 1}
         >
          Next
        </Button>
      </Box>
    
  );
};

export default Pagination;
