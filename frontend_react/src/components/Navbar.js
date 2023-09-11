import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Button, Divider, InputAdornment, List, ListItem, ListItemText, TextField } from "@mui/material"
import { AccountCircleIcon, HelpIcon, LanguageIcon, LightModeIcon, LogoutIcon, MenuIcon, NotificationsNoneIcon, PersonOutlineIcon, SearchIcon, SettingsIcon } from "../utils/constants"


const Navbar = ({ onMenuOnclick }) => {
  const [display, setDisplay] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const showPanel = () => {
    setDisplay((displayPanel) => !displayPanel);
  }

  const handleProfile = () => {
    navigate("/profil");
  }

  const logout = () => {
    localStorage.removeItem('user');
    navigate("/auth");
    localStorage.clear();
  }

  return (
    <Box sx={{ padding: "15px 20px", backgroundColor: "#FFF", position: "sticky", top: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Searchbar */}
        <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}>
          <Box component={Button} onClick={onMenuOnclick}>
            <MenuIcon sx={{ fontSize: '20px', /*color: "#FFF"*/color: "#2e3d52" }}  />
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
          </Box>
        </Box>

        <Box sx={{ display: "flex", columnGap: "20px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", border: "1px solid #93B0C8" }}>
            <LightModeIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer", }} onClick={showPanel}>
            <LanguageIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", border: "1px solid #93B0C8" }}>
            <Badge color="error" variant="dot" overlap="circular">
              <NotificationsNoneIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
            </Badge>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer", }} onClick={showPanel}>
            <AccountCircleIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
          </div>
          {display &&
            <div style={{
                position: "absolute",
                top: "70px",
                right: "20px",
                border: "1px solid #e1e1e1",
                borderRadius: "5px",
                backgroundColor: "#FFF",
                // backgroundColor: "#F3F7FD",
                width: "13.5rem",
                transition: "0.5s",
                zIndex: 10000,
              }}
            >
              <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
                <ListItem button sx={{ display: "flex", alignItems: "center", gap: "15px" }} onClick={handleProfile}>
                  <PersonOutlineIcon />
                  <ListItemText primary="Profil" />
                </ListItem>
                <Divider />
                <ListItem button sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <SettingsIcon />
                  <ListItemText primary="Paramètres" />
                </ListItem>
                <ListItem button sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <HelpIcon />
                  <ListItemText primary="Aide" />
                </ListItem>
                <Divider light />
                <ListItem button sx={{ display: "flex", alignItems: "center", gap: "15px" }} onClick={logout}>
                  <LogoutIcon />
                  <ListItemText primary="Déconnexion" />
                </ListItem>
              </List>
            </div>}
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar