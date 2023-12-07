import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Feed,
  Login,
  MyDatas,
  NotFunctional,
  Profile,
  ScrapersFeed,
  SearchFeed,
  Sidebar,
  Signup,
  Team,
} from "./pages";
import { useEffect, useState } from "react";
import { fetchUser } from "./utils/fetchUser";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import Showcase from "./pages/showcase/Showcase";

const theme = createTheme();

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
          navigate("/");
        }

        // if (!userProfileData) {
        //   navigate("/");
        // }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchUserProfile();
  }, [navigate, location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        {location.pathname !== "/" && (userProfile && /*sidebarVisible && */<Sidebar user={userProfile} isVisible={sidebarVisible} />)}
        <Stack direction="column" width="100%">
          {/* Barre de navigation */}
          {location.pathname !== "/" && (userProfile && <Navbar onMenuOnclick={toggleSidebar} />)}
          <Routes>
            {/* Page principale */}
            <Route path="/" exact element={<Showcase />} />

            {/* Page d'accueil */}
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
            <Route path="/datas" element={<MyDatas />} />
            <Route path="/history" element={<History />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/notyet" element={<NotFunctional />} />
          </Routes>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Main;
