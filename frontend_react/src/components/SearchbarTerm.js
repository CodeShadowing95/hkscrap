import { Box, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { SearchIcon } from "../utils/constants";

const SearchbarTerm = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit}>
      <TextField
        type="search"
        placeholder="Recherche par mot-clé"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            height: "3.5rem",
            fontSize: "17.5px",
            backgroundColor: "#FFF",
            borderRadius: "50px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchbarTerm;
