import { useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import { SearchIcon } from '../utils/constants'
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchTerm) {
      const urlRegex = /^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)+/i;
      const isValidURL = urlRegex.test(searchTerm);
      
      if(isValidURL) {
        navigate(`/search/?q=${encodeURIComponent(searchTerm)}`);
      } else {
        alert("URL non valide!");
      }
      setSearchTerm('');
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <TextField type='search' placeholder="Lien du site à scraper..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            height: "3rem",
            fontSize: "15px",
            // marginRight: "5px",
            backgroundColor: "#FFF",
            borderRadius: "15px",
          },
          '& .MuiOutlinedInput-input': {
            borderRadius: '0', // Reset border-radius for the inner input
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
        }}
      />
      {/* <Box sx={{
        padding: "10px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#187bcd",
        color: "#FFF",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.2s",
      }}
      onClick={handleSubmit}
      >
        <Typography sx={{ fontSize: "1em", fontWeight: "500" }}>Rechercher</Typography>
      </Box> */}
    </Box>
  )
}

export default Searchbar