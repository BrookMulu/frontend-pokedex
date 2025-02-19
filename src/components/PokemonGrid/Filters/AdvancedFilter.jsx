import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Stack,
} from "@mui/material";
import { lighten } from "@mui/system";
import { Typography, Slider } from "@mui/material";
import typeColors from "@/app/color/TypeColor";
import eggGroupColors from "@/app/color/EggGroup";
import genusData from "@/app/color/Genus";
import abilityColors from "@/app/color/AbilityColor";


const AdvancedFilter = ({ onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEgggroup, setSelectedEgggroup] = useState(null);
  const [selectedGenus, setSelectedGenus] = useState(""); // New state for genus
  const [weight, setWeight] = useState(0); // Exact weight
  const [height, setHeight] = useState(0); // Exact height

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAbilityChange = (event) => {
    setSelectedAbility(event.target.value);
  };

  const handleGenusChange = (event) => {
    setSelectedGenus(event.target.value); // Update genus selection
  };

  const handleReset = () => {
    setSelectedAbility("");
    setSelectedType(null);
    setSelectedEgggroup(null);
    setSelectedGenus("");
    setWeight(0);
    setHeight(0);
  };

  const handleApply = () => {
    onApply({
      ability: selectedAbility,
      type: selectedType,
      eggGroup: selectedEgggroup,
      genus: selectedGenus,
      weight,
      height,
    });
  };

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center"
      }}
    >
      {/* Button to Toggle Advanced Filter */}
      <Button
        variant="contained"
        onClick={handleToggle}
        sx={{
          height: 50,
          backgroundColor: "#92CCE5", 
          borderRadius: "16px", 
          boxShadow: "none", 
          "&:hover": {
            backgroundColor: "#A2D4EC", 
            boxShadow: "0 4px 6px rgba(146, 204, 229, 0.4)",
          }
        }}
      >
        {isOpen ? "Close Advanced Filter" : "Open Advanced Filter"}
      </Button>

      {/* Collapsible Advanced Filter Options */}
      <Collapse in={isOpen}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            borderRadius: "16px", 
            backgroundColor: "#ffffff",
            width: "90%", // Use a percentage for responsiveness
            maxWidth: "725px", // Limit maximum width
            marginX: "auto", // Center horizontally
            border: "8px solid #92CCE5", 
            boxShadow: "0 8px 8px rgba(0, 0, 0, 0.2)"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Box>
              <Typography
                sx={{
                  mb: 2,
                  textAlign: "center",
                  fontSize:"20px"
                }}
              >
                Type
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)", // Three items per row
                  gap: 2, // Spacing between items
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {Object.entries(typeColors).map(([type, color]) => {
                  const isSelectedType = selectedType === type;
                  return (
                    <Box
                      key={type}
                      onClick={() => setSelectedType(type)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        padding: "8px",
                        backgroundColor: isSelectedType
                          ? lighten(color, 0.6)
                          : color,
                        "&:hover": {
                          backgroundColor: lighten(color, 0.6),
                        },
                        cursor: "pointer",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        height: "28px",
                        width: "90px",
                      }}
                    >
                      {type.toUpperCase()}
                    </Box>
                  );
                })}
              </Box>
            </Box>
            {/* Egg Group Filter */}
            <Box>
              <Typography
                sx={{
                  mb: 2,
                  textAlign: "center",
                  fontSize:"20px"
                }}
              >
                Egg
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)", // Three items per row
                  gap: 2, // Spacing between items
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {Object.entries(eggGroupColors).map(([egggroup, color]) => {
                  const isSelectedEgggroup = selectedEgggroup === egggroup;
                  return (
                    <Box
                      key={egggroup}
                      onClick={() => setSelectedEgggroup(egggroup)}
                      sx={{
                        display: "inline-block",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        padding: "8px",
                        backgroundColor: isSelectedEgggroup
                          ? lighten(color, 0.6)
                          : color,
                        "&:hover": {
                          backgroundColor: lighten(color, 0.6),
                        },
                        cursor: "pointer",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        height: "28px",
                        width: "90px",
                        lineHeight: "12px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        boxSizing: "border-box"
                      }}
                    >
                      {egggroup.toUpperCase()}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
          {/* Additional Filters */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              marginTop: 2,
            }}
          >
            <Box style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              <FormControl sx={{ width: "300px" }}>
                <InputLabel>Ability</InputLabel>
                <Select
                  value={selectedAbility}
                  onChange={handleAbilityChange}
                  label="Ability"
                >
                  {Object.keys(abilityColors).map((ability) => (
                    <MenuItem key={ability} value={ability}>
                      {ability.replace(/-/g, " ").toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Genus Dropdown */}
              <FormControl sx={{ width: "300px" }}>
                <InputLabel>Genus</InputLabel>
                <Select
                  value={selectedGenus}
                  onChange={handleGenusChange}
                  label="Genus"
                >
                  {genusData.map((genus) => (
                    <MenuItem key={genus} value={genus}>
                      {genus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Stack spacing={4}>
              {/* Weight Slider */}
              <Box style={{display:"flex", flexDirection:"row", width: "300%",  marginRight:20, marginTop:20}}>
                <Typography sx={{ marginRight:2, MarginTop:20 }} id="weight-slider">
                  Weight:
                </Typography>
                <Slider
                  value={weight}
                  onChange={(_, newValue) => setWeight(newValue)}
                  aria-labelledby="weight-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={300}
                  step={1}
                  marks={[
                    { value: 0, label: "0 Kg" },
                    { value: 300, label: "300 Kg" },
                  ]}
                  sx={{
                    color:"#92CCE5"
                  }}
                />
              </Box>

              {/* Height Slider */}
              <Box style={{display:"flex", flexDirection:"row", width: "300%", marginRight:20, marginTop:20}}>
                <Typography sx={{ marginRight:2, MarginTop:5 }} id="height-slider">
                   Height:
                </Typography>
                <Slider
                  value={height}
                  onChange={(_, newValue) => setHeight(newValue)}
                  aria-labelledby="height-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={300}
                  step={1}
                  marks={[
                    { value: 0, label: "0 cm" },
                    { value: 300, label: "300 cm" },
                  ]}
                  sx={{
                    color:"#92CCE5"
                  }}
                />
              </Box>
            </Stack>
          </Box>

          {/* Apply and Reset Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="secondary" onClick={handleReset} style={{borderRadius: "16px", boxShadow: "none",}}>
              Reset
            </Button>
            <Button 
                variant="contained" 
                onClick={handleApply} 
                sx={{
                    backgroundColor: "#92CCE5", 
                    borderRadius: "16px", 
                    boxShadow: "none", 
                    "&:hover": {
                    backgroundColor: "#A2D4EC", 
                    boxShadow: "0 4px 6px rgba(146, 204, 229, 0.4)",
                    }
                }}
            >
                Apply
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default AdvancedFilter;

