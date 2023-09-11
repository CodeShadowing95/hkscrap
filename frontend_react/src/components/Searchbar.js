import { useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material'
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
    <Box component="form" onSubmit={handleSubmit}>
      <TextField type='search'
        placeholder="Copier-coller l'URL du site à scraper ici..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            height: "4.5rem",
            fontSize: "20px",
            // marginRight: "5px",
            backgroundColor: "#FFF",
            borderRadius: "15px",
          },
          '& .MuiOutlinedInput-input': {
            borderRadius: '0', // Reset border-radius for the inner input
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>
        }}
      />
    </Box>
  )
}

export default Searchbar