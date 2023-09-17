import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import { Feed, Login, Profile, ScrapersFeed, SearchFeed, Sidebar, SocialMedia, Team } from './pages';
import { useEffect, useState } from 'react';
import { fetchUser } from './utils/fetchUser';
import History from './pages/History';
import Navbar from './components/Navbar';
import { useTheme } from './components/ThemeProvider';

const Main = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const { theme, toggleDarkMode } = useTheme();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileData = await fetchUser();
        setUserProfile(userProfileData);
        // setUser(userProfileData);
        if(location.pathname === "/" && userProfileData !== null){
          navigate('/home');
        }

        if(!userProfileData) {
          navigate('/auth');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchUserProfile();

  }, [navigate, location.pathname]);

  return (
    <Box sx={{
      display: 'flex',
      backgroundColor: theme === 'light' ? '#eff2f6' : '#374962',
    }}>
      {userProfile && (sidebarVisible && <Sidebar user={userProfile} />)}
      <Stack direction="column" sx={{ top: 0, flex: 1 }}>
        {/* Barre de navigation */}
        {userProfile && <Navbar onMenuOnclick={toggleSidebar} />}
        <Routes>
          <Route path="/auth" element={userProfile ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" exact element={userProfile ? <Feed /> : <Login />} />
          <Route path="/scrapers/" element={<ScrapersFeed />} />
          <Route path="/search/" element={<SearchFeed />} />
          <Route path="/socialMedia/:id" element={<SocialMedia />} />
          <Route path="/history" element={<History />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profil" element={<Profile />} />
        </Routes>
      </Stack>
    </Box>
  )
}

export default Main;