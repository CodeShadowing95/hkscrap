import { useState } from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import MenuElement from "./MenuElement";
import {
  DashboardIcon,
  EventNoteIcon,
  HistoryIcon,
  sub_logo,
  StarIcon,
  FlashOnIcon,
  PeopleIcon,
  hklogo,
  SettingsIcon,
  AddBoxIcon,
  profileImage,
  LogoutIcon,
} from "../utils/constants";

import { useTheme } from "./ThemeProvider";

const Sidebar = ({ user, isVisible }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(0);

  const { theme } = useTheme();

  const handleMenuItemClick = (index) => {
    setActiveItem(index);
    setTimeout(() => {
      // Apply the color change immediately after updating activeBox
      clearTimeout();
    }, 0);
    if (index === 0) {
      navigate("/home");
    } else if (index === 1) {
      navigate("/scrapers");
    } else if (index === 2) {
      navigate("/history");
    } else if (index === 3) {
      navigate("/notyet");
    } else if (index === 4) {
      navigate("/notyet");
    } else if (index === 5) {
      navigate("/notyet");
    } else if (index === 6) {
      navigate("/notyet");
    } else if (index === 8) {
      navigate("/notyet");
    } else {
      // Change path to other pages
      navigate("/home");
    }
    setActiveItem(index);
  };

  const searchPage = () => {
    navigate("/search");
  }

  const logoutPage = () => {
    localStorage.removeItem('user');
    navigate("/auth");
    localStorage.clear();
  }

  let username = user?.prenom;
  if (user?.nom !== null) {
    username = user?.prenom + " " + user?.nom;
  }
  const len_username = username.length;
  if (len_username > 13) {
    username = username.substr(0, len_username - 2) + ".";
  }

  let elements = [
    { id: 1, icon: DashboardIcon, text: "Dashboard" },
    { id: 2, icon: FlashOnIcon, text: "Scrapers" },
    { id: 3, icon: HistoryIcon, text: "Historique" },
    { id: 4, icon: EventNoteIcon, text: "Planification" },
    { id: 5, icon: StarIcon, text: "Favoris" },
    { id: 7, icon: SettingsIcon, text: "Paramètres" },
  ];

  if (user?.role === "Modérateur")
    elements = [...elements, { id: 6, icon: PeopleIcon, text: "Utilisateurs" }];


  return (
    <Stack
      direction="column"
      sx={{
        top: 0,
        height: "100dvh",
        position: "sticky",
        /* backgroundColor: "#1F2937 | 2e3d52", */ backgroundColor: theme === "light" ? "#dee4ed" : "#1F2937",
        width: isVisible ? "300px" : "90px",
        display: { xs: "none", sm: "none", md: "none", lg: "flex" },
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" /*, width: "8px"*/ },
        /*'&::-webkit-scrollbar-thumb':{backgroundColor: "#eff2f6", borderRadius: "4px"}*/
        transition: ".2s",
      }}
    >
      {/* General Stack Top */}
      <Stack
        sx={{ width: "100%", height: "100%", paddingTop: "20px", justifyContent: "space-between" }}
      >
        <Stack spacing={3}>
          {/* Stack logo */}
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: isVisible ? "flex-start" : "center",
              alignItems: "center",
              paddingLeft: isVisible ? "1.75rem" : 0,
            }}
          >
            <Link to="/home">
              {isVisible ?
                <img src={sub_logo} alt="logo" height={60} />
                :
                <img src={hklogo} alt="logo" height={45} />
              }
            </Link>
          </Stack>

          {/* Stack fonctionnalités essentielles */}
          <Stack
            direction="column"
            spacing={1}
            sx={{ padding: "1.25rem 0.75rem" }}
          >
            {elements.map((element, index) => (
              <MenuElement
                key={index}
                icon={element.icon}
                text={element.text}
                menuVisible={isVisible}
                active={activeItem === index}
                onClick={() => handleMenuItemClick(index)}
              />
            ))}
            <hr component="divider" style={{ border: "none", backgroundColor: "rgba(0,0,0,.1)", height: ".5px", width: "100%", margin: "35px 0 15px 0" }} />
            <Box sx={{ display: "flex", alignSelf: "center", justifyContent: "center", alignItems: "center", padding: "15px", borderRadius: "10px", backgroundImage: "linear-gradient(to right, #4338ca, #3a57db, #3a73e9, #488cf3, #60a5fa)", gap: 1, cursor: "pointer", transition: ".2s", "&: hover": {boxShadow: 4} }} onClick={searchPage}>
              <AddBoxIcon sx={{ fontSize: '25px', color: "#fff" }} />
              {isVisible && <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", fontWeight: 600, color: "#FFF" }}>Nouvelle tâche</Typography>}
            </Box>
          </Stack>
        </Stack>

        <Box
          sx={{ padding: "1.25rem 0", borderTop: "1px solid #d2d2d2", gap: 1 }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Avatar variant="circular" src={profileImage} sx={{ width: 40, height: 40 }} />
              {isVisible &&
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Typography sx={{ color: "#6690b2", fontFamily: "Montserrat", fontSize: "0.7rem", fontWeight: 400, lineHeight: "1.25rem", letterSpacing: ".5px", }}>
                  Bienvenue,
                </Typography>
                <Typography sx={{ color: theme === "light" ? "#152C5B" : "#FFF", fontFamily: "Montserrat", fontSize: "0.875rem", fontWeight: 700, lineHeight: "1.25rem", textOverflow: "ellipsis", }}>{username}</Typography>
              </Box>}
            </Box>
            {isVisible &&
            <IconButton aria-label="logout" onClick={logoutPage}>
              <LogoutIcon sx={{ fontSize: "20px", color: "#88a9c3" }} />
            </IconButton>}
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
