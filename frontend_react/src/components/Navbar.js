import { useState } from "react";
import { Badge, Box, InputAdornment, TextField } from "@mui/material"
import { DarkModeIcon, LightModeIcon, MenuIcon, NotificationsNoneIcon, SearchIcon } from "../utils/constants"
import { DropdownProfile } from ".";
import { useTheme } from "./ThemeProvider";

const Navbar = ({ onMenuOnclick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { theme, toggleDarkMode } = useTheme();

  const changeChevron = () => {
    onMenuOnclick();
  }

  const changeContrast = () => {
    toggleDarkMode();
  }

  return (
    <Box sx={{ padding: "10px 20px 10px 5px", backgroundColor: theme === "light" ? "#F0F2F7" : "#253c5c", position: "sticky", top: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Searchbar */}
        <Box sx={{ display: "flex", alignItems: "center", width: "40%", columnGap: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "50px", cursor: "pointer", transition: "0.2s", "&:hover": {backgroundColor: theme === "light" ? "#e1e1e1" : "rgba(255, 255, 255, .1)"} }} onClick={changeChevron}>
            {onMenuOnclick && <MenuIcon sx={{ fontSize: '20px', /*color: "#FFF"*/color: theme === "light" ? "#2e3d52" : "#88a9c3" }}  />}
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
                  fontFamily: "Montserrat",
                  fontSize: "13px",
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
                startAdornment: <InputAdornment position="start" sx={{ color: theme === "light" ? "none" : "#adadad" }}><SearchIcon /></InputAdornment>
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", columnGap: 2 }}>
          {theme === 'light' ?
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer" }} onClick={changeContrast}>
              <DarkModeIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
            </div>
            :
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer" }} onClick={changeContrast}>
              <LightModeIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
            </div>
          }
          {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer", }}>
            <LanguageIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
          </div> */}
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