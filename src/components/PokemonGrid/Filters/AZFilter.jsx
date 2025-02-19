import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const AZFilter = ({onFilterChange}) => {
    const [filter, setFilter] = useState('idAsc');
    const handleChange = (newFilter)=>{
        setFilter(newFilter);
        onFilterChange(newFilter);
    }
    return(
        <Box sx={{minWidth:120}}>
            <FormControl fullWidth>
                <InputLabel id="filter-option-select-label"></InputLabel>
                <Select
                    sx={{
                        backgroundColor: "#fff", // White background
                        borderRadius: "4px", // Rounded corners
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent", // Default transparent border
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#92CCE5", // Light blue on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#92CCE5", // Light blue on focus
                          boxShadow: "0 0 8px rgba(146, 204, 229, 0.6)", // Stronger shadow on focus
                        },
                        "& .MuiSelect-select": {
                          backgroundColor: "#fff", // Ensure dropdown stays white
                        },
                      }}
                    labelId="filter-option-select-label"
                    id = "filter-option-select"
                    value={filter}
                    onChange={(e)=> handleChange(e.target.value)}
                    label="Sort by"
                    
                >
                    <MenuItem value="idAsc">Id (Asc)</MenuItem>
                    <MenuItem value="idDsc">Id (Dsc)</MenuItem>
                    <MenuItem value="nameAsc">Name (Asc)</MenuItem>
                    <MenuItem value="nameDsc">Name (Dsc)</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
export default AZFilter;
