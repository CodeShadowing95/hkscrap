import { useState } from "react";
import { Badge, Box, InputAdornment, TextField } from "@mui/material"
import { ChevronLeftIcon, ChevronRightIcon, DarkModeIcon, LanguageIcon, LightModeIcon, NotificationsNoneIcon, SearchIcon } from "../utils/constants"
import { DropdownProfile } from ".";


const Navbar = ({ onMenuOnclick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentChevron, setCurrentChevron] = useState('left');
  const [luminosity, setLuminosity] = useState('light');

  const changeChevron = () => {
    setCurrentChevron(currentChevron === 'left' ? 'right' : 'left');
    onMenuOnclick();
  }

  const changeContrast = () => {
    setLuminosity(luminosity === 'light' ? 'dark' : 'light');
  }

  return (
    <Box sx={{ padding: "10px 20px 10px 5px", backgroundColor: "#FFF", position: "sticky", top: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Searchbar */}
        <Box sx={{ display: "flex", alignItems: "center", width: "40%", columnGap: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "50px", cursor: "pointer", transition: "0.2s", "&:hover": {backgroundColor: "#e1e1e1"} }} onClick={changeChevron}>
            {onMenuOnclick && (
              currentChevron === 'left' ?
              <ChevronLeftIcon sx={{ fontSize: '20px', /*color: "#FFF"*/color: "#2e3d52" }}  />
              :
              <ChevronRightIcon sx={{ fontSize: '20px', /*color: "#FFF"*/color: "#2e3d52" }}  />
            )}
          </Box>
          <Box>
            <TextField
              type='search'
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  height: "2.5rem",
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
          </Box>
        </Box>

        <Box sx={{ display: "flex", columnGap: 2 }}>
          {luminosity === 'light' ?
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer" }} onClick={changeContrast}>
              <LightModeIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
            </div>
            :
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer" }} onClick={changeContrast}>
              <DarkModeIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
            </div>
          }
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer", }}>
            <LanguageIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8" }}>
            <Badge color="error" variant="dot" overlap="circular">
              <NotificationsNoneIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
            </Badge>
          </div>
          <DropdownProfile />
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar