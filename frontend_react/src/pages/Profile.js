import { Avatar, Badge, Box, Breadcrumbs, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { LightModeIcon, NotificationsNoneIcon, profileImage } from "../utils/constants";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
  <>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Stack sx={{ boxShadow: "0px 5px 10px 1px #D5D5D5" }}>
                {/* Title */}
                <Box sx={{ display: "flex", padding: "20px", borderBottom: "1px solid #e1e1e1", backgroundColor: "#F8F8F9" }}>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#187bcd" }}>Photo de Profil</Typography>
                </Box>
                {/* Avatar */}
                <Stack justifyContent="center" alignItems="center" spacing={3} sx={{ backgroundColor: "#FFF", padding: "1.35rem" }}>
                  <Avatar alt="user avatar" src={profileImage} sx={{ height: "160px", width: "160px" }} />
                  <Typography variant="body1" sx={{ fontSize: "1rem", fontWeight: 300, color: "#B2B2B8", marginBottom: "16px" }}>
                    JPG ou PNG ne dépassant pas 5 MB
                  </Typography>
                  <Button variant="contained" color="primary" size="large">Changer de profil</Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <Stack sx={{ boxShadow: "0px 5px 10px 1px #D5D5D5" }}>
                {/* Title */}
                <Box sx={{ display: "flex", padding: "20px", borderBottom: "1px solid #e1e1e1", backgroundColor: "#F8F8F9" }}>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#187bcd" }}>Détails du compte</Typography>
                </Box>
                <Stack spacing={2} sx={{ backgroundColor: "#FFF", padding: "1.35rem" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography sx={{ fontWeight: 400 }}>Nom d'utilisateur (Le nom qui apparaîtra sur votre profil)</Typography>
                      {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                      <TextField size="small" name="username" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography sx={{ fontWeight: 400 }}>Nom(s)</Typography>
                      {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                      <TextField size="small" name="username" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography sx={{ fontWeight: 400 }}>Prénom(s)</Typography>
                      {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                      <TextField size="small" name="username" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography sx={{ fontWeight: 400 }}>Téléphone</Typography>
                      {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                      <TextField size="small" name="username" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography sx={{ fontWeight: 400 }}>Pays</Typography>
                      {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                      <TextField size="small" name="username" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography sx={{ fontWeight: 400 }}>Adresse mail</Typography>
                      {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                      <TextField size="small" name="username" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography sx={{ fontWeight: 400 }}>Mot de passe (Changer votre mot de passe actuel)</Typography>
                      {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                      <TextField size="small" name="username" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography sx={{ fontWeight: 400 }}>Confirmer le mot de passe</Typography>
                      {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                      <TextField size="small" name="username" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Button variant="contained" size="large" color="success" sx={{ marginTop: "20px" }}>Confirmer les changements</Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  </>
  )
}

export default Profile