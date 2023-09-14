import { Stack, Box, Typography, Breadcrumbs, Grid } from '@mui/material'
import { Chart1, Chart2, Searchbar, Template } from '../components'
import { FlashOnIcon, HomeIcon, Inventory2Icon, PeopleIcon, TrendingUpIcon, popular_sites } from '../utils/constants';
import { useEffect, useState } from 'react';
import TableScrapeDatas from '../components/TableScrapeDatas';
import { useTheme } from '../components/ThemeProvider';

const Feed = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [datas, setDatas] = useState([]);
  const [lengthUsers, setLengthUsers] = useState(0);
  const [lengthDatas, setLengthDatas] = useState(0);
  const { theme } = useTheme();


  useEffect(() => {
    try {
      fetch('http://localhost:8000/count-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(async (response) => {
        if(!response.ok) throw new Error('Some problems encountered while processing the server')

        const users_length = await response.json();
        setLengthUsers(users_length[0]?.countUsers);
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
    
    try {
      fetch('http://localhost:8000/count-scraped-datas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(async (response) => {
        if(!response.ok) throw new Error('Some problems encountered while processing the server')

        const datas_length = await response.json();
        setLengthDatas(datas_length[0]?.totalDatas);
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }

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
        setDatas(responseData);
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
  }, [])

  return (
    <Stack>
      <Box sx={{ display: "flex", alignItems: "flex-start", marginBottom: "1.5em", padding: "2rem 2rem 8rem", backgroundImage: theme === 'dark' ? "linear-gradient(to right bottom, #253c5c, #2c2b43, #271d2b, #1a1117, #000000)" : "linear-gradient(to bottom, #f0f2f7, #dfe3ee, #ced4e4, #bdc5db, #acb7d2)" }}>
        {/* Title & Breadcrumb */}
        <Stack rowGap="15px" width="100%">
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
            <HomeIcon sx={{ color: theme === "dark" ? "#FFF" : "#152C5B", fontSize: "2em" }} />
            <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: theme === "dark" ? "#FFF" : "#152C5B" }}>Welcome back, {user[0]?.prenom}</Typography>
          </Box>
          {/* Breadcrumb */}
          <Typography sx={{ fontSize: "1em", fontWeight: 300, marginBottom: "10px", color: theme === "dark" ? "#93B0C8" : "#737373" }}>Besoin d'effectuer un scraping rapide? Renseignez juste l'URL du site</Typography>
          {/* Barre de recherche */}
          <Searchbar />
        </Stack>
      </Box>

      {/* Vue générale */}
      <Box sx={{ padding: "0 2rem", marginTop: "-6rem" }}>
        <Box>
          {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", "& > *": { flex: 1}, }}> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#FDFEFF", borderRadius: "10px", gap: 5 }}>
                <Stack spacing={2.5}>
                  <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>Nombre d'utilisateurs</Typography>
                  <Typography variant='h4' sx={{ fontWeight: 700 }}>{lengthUsers}</Typography>
                  <Typography sx={{ fontSize: "15px", fontWeight: 400 }} color="#999">Utilisateurs enregistrés</Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#c8d9ea", borderRadius: "50px" }}>
                    <PeopleIcon sx={{ fontSize: "50px", color: "#417AAE" }} />
                  </div>
                </Stack>
              </Box>
            </Grid>


            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#FDFEFF", borderRadius: "10px", gap: 5 }}>
                <Stack spacing={2.5}>
                  <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>Données extraites</Typography>
                  <Typography variant='h4' sx={{ fontWeight: 700 }}>{lengthDatas}</Typography>
                  <Typography sx={{ fontSize: "15px", fontWeight: 400 }} color="#999">Données extraites ce mois</Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#d2e8c9", borderRadius: "50px" }}>
                    <Inventory2Icon sx={{ fontSize: "50px", color: "#5da145" }} />
                  </div>
                </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#FDFEFF", borderRadius: "10px", gap: 5 }}>
                <Stack spacing={2.5}>
                  <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>Quantité/Pourcentage</Typography>
                  <Typography variant='h4' sx={{ fontWeight: 700 }}>0%</Typography>
                  <Typography sx={{ fontSize: "15px", fontWeight: 400 }} color="#999">Opération ce mois</Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#fab7b9", borderRadius: "50px" }}>
                    <TrendingUpIcon sx={{ fontSize: "50px", color: "#d70f12" }} />
                  </div>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Stack sx={{ transition: "0.2s", "&:hover": {boxShadow: "0px 5px 10px 1px #D5D5D5"} }}>
                {/* Title */}
                <Box sx={{ display: "flex", padding: "20px", borderBottom: "1px solid #e1e1e1", backgroundColor: "#F8F8F9" }}>
                  <Typography sx={{ fontSize: "1.15rem", fontWeight: 500, color: "#152C5B" }}>Scrapings effectués par plateforme</Typography>
                </Box>
                {/* Content */}
                <Box sx={{ backgroundColor: "#FFF", padding: "1.35rem" }}>
                  <Chart1 />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Stack sx={{ transition: "0.2s", "&:hover": {boxShadow: "0px 5px 10px 1px #D5D5D5"} }}>
                {/* Title */}
                <Box sx={{ display: "flex", padding: "20px", borderBottom: "1px solid #e1e1e1", backgroundColor: "#F8F8F9" }}>
                  <Typography sx={{ fontSize: "1.15rem", fontWeight: 500, color: "#152C5B" }}>Taux de réussite par source</Typography>
                </Box>
                {/* Content */}
                <Box sx={{ backgroundColor: "#FFF", padding: "1.35rem" }}>
                  <Chart2 />
                </Box>
              </Stack>
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
                    {popular_sites.map((site, index) => {

                      // Code here...
                    
                      return (
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
                      )}
                    )}
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
  )
}

export default Feed