import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Box, Stack } from "@mui/material";
import {
  Feed,
  Login,
  Profile,
  ScrapersFeed,
  SearchFeed,
  Showcase,
  Sidebar,
  Signup,
  SocialMedia,
  Team,
} from "./pages";
import { useEffect, useState } from "react";
import { fetchUser } from "./utils/fetchUser";
import History from "./pages/History";
import Navbar from "./components/Navbar";

const Main = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileData = await fetchUser();
        setUserProfile(userProfileData);
        if (location.pathname === "/") {
          navigate("/showcase");
        }

        // if (!userProfileData) {
        //   navigate("/showcase");
        // }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchUserProfile();
  }, [navigate, location.pathname]);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {location.pathname !== "/showcase" && (userProfile && /*sidebarVisible && */<Sidebar user={userProfile} isVisible={sidebarVisible} />)}
      <Stack direction="column" sx={{ top: 0, flex: 1 }}>
        {/* Barre de navigation */}
        {location.pathname !== "/showcase" && (userProfile && <Navbar onMenuOnclick={toggleSidebar} />)}
        <Routes>
          <Route path="/showcase" exact element={<Showcase />} />
          <Route
            path="/auth"
            element={userProfile ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/home"
            element={userProfile ? <Feed /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/scrapers/" element={<ScrapersFeed />} />
          <Route path="/search/" element={<SearchFeed />} />
          <Route path="/socialMedia/:id" element={<SocialMedia />} />
          <Route path="/history" element={<History />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profil" element={<Profile />} />
        </Routes>
      </Stack>
    </Box>
  );
};

export default Main;
