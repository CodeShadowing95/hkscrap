import { useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material'
import { SearchIcon } from '../utils/constants'
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchTerm) {
      const urlRegex = /^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)+/i;
      const isValidURL = urlRegex.test(searchTerm);
      
      if(isValidURL) {
        navigate(`/search/?q=${encodeURIComponent(searchTerm)}`);
      } else {
        alert("Veuillez saisir une URL valide!");
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
          width: "70%",
          "& .MuiOutlinedInput-root": {
            height: "4rem",
            fontSize: "1rem",
            backgroundColor: theme === 'light' ? "#FFF" : "rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            color: theme === "light" ? "none" : "#adadad",
            border: theme === "light" ? "none" : "1px solid #b3b3b3",
          },
          '& .MuiOutlinedInput-input': {
            borderRadius: '0', // Reset border-radius for the inner input
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end" sx={{ color: theme === "light" ? "none" : "#adadad" }}><SearchIcon /></InputAdornment>
        }}
      />
    </Box>
  )
}

export default Searchbar