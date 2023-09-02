import { Stack, Box, Typography, Breadcrumbs, Badge, Grid, List, ListItem, ListItemText, Divider } from '@mui/material'
import { Searchbar, Template } from '../components'
import { AccountCircleIcon, FlashOnIcon, HelpIcon, LightModeIcon, LogoutIcon, NotificationsNoneIcon, PeopleIcon, PersonAddIcon, SettingsIcon, popular_sites } from '../utils/constants';
import { useEffect, useState } from 'react';
import TableScrapeDatas from '../components/TableScrapeDatas';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [datas, setDatas] = useState([]);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const showPanel = () => {
    setDisplay((displayPanel) => !displayPanel);
  }

  const handleProfil = () => {
    navigate("/profil");
  }

  const logout = () => {
    localStorage.removeItem('user');
    navigate("/auth");
    localStorage.clear();
  }

  useEffect(() => {
    try {
      fetch('http://localhost:8000/recentDatas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(async (response) => {
        if(!response.ok) throw new Error("Impossible d'accéder à la requête")
  
        const responseData = await response.json();
        // console.log(responseData);
        setDatas(responseData);
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
  }, [])

  return (
    <>
    <Stack direction="column" sx={{ top: 0, flex: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: "2rem 4rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5em" }}>
          {/* Title & Breadcrumb */}
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B" }}>Welcome back, {user[0]?.prenom}</Typography>
            {/* Breadcrumb */}
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="#93B0C8">Tableau de bord</Typography>
            </Breadcrumbs>
          </Box>

          {/* Searchbar, Light/Dark mode, Notifications */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", columnGap: "20px", width: "43%", position: "relative" }}>
            <Searchbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", backgroundColor: "#FFF" }}>
              <LightModeIcon sx={{ fontSize: '25px', color: "#88a9c3" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", backgroundColor: "#FFF" }}>
              <Badge color="error" variant="dot" overlap="circular">
                <NotificationsNoneIcon sx={{ fontSize: '25px', color: "#88a9c3" }} />
              </Badge>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", backgroundColor: "#FFF", cursor: "pointer" }} onClick={showPanel}>
              <AccountCircleIcon sx={{ fontSize: '25px', color: "#88a9c3" }} />
            </div>
            {display &&
            <div style={{
                position: "absolute",
                top: "55px",
                // padding: "20px",
                border: "1px solid #e1e1e1",
                borderRadius: "5px",
                backgroundColor: "#F3F7FD",
                width: "13.5rem",
                transition: "0.5s",
                zIndex: 1000,
              }}
            >
              <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
                <ListItem button sx={{ display: "flex", alignItems: "center", gap: "15px" }} onClick={handleProfil}>
                  <PeopleIcon />
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
            </div>
          }
          </Box>
        </Box>

        {/* Barre de recherche */}
        {/* <Searchbar /> */}

        {/* Vue générale */}
        <Box sx={{ marginTop: "1rem" }}>
          {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", "& > *": { flex: 1}, }}> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#FDFEFF", borderRadius: "20px", gap: 5 }}>
                <Stack spacing={2.5}>
                  <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>Opération effectuée</Typography>
                  <Typography variant='h4' sx={{ fontWeight: 700 }}>0</Typography>
                  <Typography sx={{ fontSize: "15px", fontWeight: 400 }} color="#999">Opération ce mois</Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#c8d9ea", borderRadius: "50px" }}>
                    <PeopleIcon sx={{ fontSize: "30px", color: "#417AAE" }} />
                  </div>
                </Stack>
              </Box>
            </Grid>


            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#FDFEFF", borderRadius: "20px", gap: 5 }}>
                <Stack spacing={2.5}>
                  <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>Opération effectuée</Typography>
                  <Typography variant='h4' sx={{ fontWeight: 700 }}>0</Typography>
                  <Typography sx={{ fontSize: "15px", fontWeight: 400 }} color="#999">Opération ce mois</Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#d2e8c9", borderRadius: "50px" }}>
                    <PeopleIcon sx={{ fontSize: "30px", color: "#5da145" }} />
                  </div>
                </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#FDFEFF", borderRadius: "20px", gap: 5 }}>
                <Stack spacing={2.5}>
                  <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>Opération effectuée</Typography>
                  <Typography variant='h4' sx={{ fontWeight: 700 }}>0</Typography>
                  <Typography sx={{ fontSize: "15px", fontWeight: 400 }} color="#999">Opération ce mois</Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#fab7b9", borderRadius: "50px" }}>
                    <PeopleIcon sx={{ fontSize: "30px", color: "#d70f12" }} />
                  </div>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <Grid container spacing={2}>
            {/* First side */}
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography variant="h3" sx={{ fontSize: "1.3em", fontWeight: "500", color: "#152C5B" }}>Sites phares</Typography>
                  <Stack padding="20px" border="1px solid #e1e1e1" borderRadius="10px" sx={{ backgroundColor: "#FFF" }} spacing={1}>
                    {/* map */}
                    {popular_sites.map((site, index) => (
                      <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 7px", cursor: "pointer", transition: "0.2s", "&: hover": { backgroundColor: "#f2f2f2", borderRadius: "5px" }, "&: hover .flash": { color: "#ffa500" } }}>
                        {/* Image + title */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                          {/* Image */}
                          <Box sx={{ display: "inline-block", width: "1.5rem", height: "1.5rem" }}>
                            <img src={site.icon} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} />
                          </Box>
                          {/* Title */}
                          <Typography sx={{ fontSize: "1rem", fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{site.name}</Typography>
                        </Box>
                        {/* Run image + count */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                          <FlashOnIcon className='flash' sx={{ fontSize: "20px", color: "#9CA3AF" }} />
                          <Typography>0</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
                <Template customBg />
              </Stack>
            </Grid>

            {/* Second side */}
            <Grid item xs={12} sm={12} md={12} lg={9}>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography variant="h3" sx={{ fontSize: "1.3em", fontWeight: "500", color: "#152C5B" }}>Scrapings récents</Typography>
                  <Stack padding="20px" border="1px solid #e1e1e1" borderRadius="10px" sx={{ backgroundColor: "#FFF" }} spacing={1}>
                    {/* map */}
                    <TableScrapeDatas datas={datas} simple />
                  </Stack>
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

export default Feed