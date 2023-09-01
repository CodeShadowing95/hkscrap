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
    <Box component="form" sx={{ display: "flex", justifyContent: "center" }} onSubmit={handleSubmit}>
      <TextField type='search' placeholder="Lien du site web à scraper"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "50%",
          "& .MuiOutlinedInput-root": {
            height: "4rem",
            fontSize: "20px",
            marginRight: "5px",
            backgroundColor: "#FFF"
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
        }}
      />
      <Box sx={{
        padding: "10px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#187bcd",
        color: "#FFF",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.2s",
        // "&:hover": {
        //   backgroundColor: "#7D7D7D",
        //   color: "#FFF",
        // }
      }}
      onClick={handleSubmit}
      >
        {/* <SearchIcon fontSize="medium" /> */}
        <Typography sx={{ fontSize: "1em", fontWeight: "500" }}>Rechercher</Typography>
      </Box>
    </Box>
  )
}

export default Searchbar