import { Badge, Box, Breadcrumbs, Grid, Stack, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { LightModeIcon, NotificationsNoneIcon } from "../utils/constants";

const Profil = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
  <>
    <Sidebar user={user} />
    <Stack direction="column" sx={{ top: 0, flex: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: "2rem 4rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5em" }}>
          {/* Title & Breadcrumb */}
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B" }}>Informations de compte</Typography>
            {/* Breadcrumb */}
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/home">
                Accueil
              </Link>
              <Typography color="#93B0C8">Profil</Typography>
            </Breadcrumbs>
          </Box>

          {/* Searchbar, Light/Dark mode, Notifications */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", columnGap: "20px", width: "43%" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", backgroundColor: "#FFF" }}>
              <LightModeIcon sx={{ fontSize: '25px', color: "#88a9c3" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", backgroundColor: "#FFF" }}>
              <Badge color="error" variant="dot" overlap="circular">
                <NotificationsNoneIcon sx={{ fontSize: '25px', color: "#88a9c3" }} />
              </Badge>
            </div>
          </Box>
        </Box>

        <Box sx={{ marginTop: "1rem" }}>
          <Stack alignItems="center" padding="10px" border="1px solid #e1e1e1" borderRadius="10px" sx={{ backgroundColor: "#FFF" }} spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#E1E1E1", borderRadius: "10px", gap: 5 }}>
                  
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#E1E1E1", borderRadius: "10px", gap: 5 }}>
                  
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </Stack>
  </>
  )
}

export default Profil