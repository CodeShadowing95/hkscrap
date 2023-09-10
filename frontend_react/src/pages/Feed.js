import { Stack, Box, Typography, Breadcrumbs, Grid } from '@mui/material'
import { Chart1, Chart2, Searchbar, Template } from '../components'
import { FlashOnIcon, HomeIcon, PeopleIcon, popular_sites } from '../utils/constants';
import { useEffect, useState } from 'react';
import TableScrapeDatas from '../components/TableScrapeDatas';

const Feed = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [datas, setDatas] = useState([]);

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
    <Stack>
      <Box sx={{ display: "flex", alignItems: "flex-start", marginBottom: "1.5em", padding: "2rem 2rem 8rem",  /*backgroundImage: "linear-gradient(to right bottom, #253c5c, #2c2b43, #271d2b, #1a1117, #000000)"*/backgroundImage: "linear-gradient(to right bottom, #dde6ee, #e7ecf3, #f0f2f7, #f8f8fb, #ffffff);" }}>
        {/* Title & Breadcrumb */}
        <Stack rowGap="15px" width="100%">
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
            <HomeIcon sx={{ color: "#152C5B"/*color: "#FFF"*/, fontSize: "2em" }} />
            <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B"/*color: "#FFF"*/ }}>Welcome back, {user[0]?.prenom}</Typography>
          </Box>
          {/* Breadcrumb */}
          <Typography /*color="#93B0C8"*/color="#737373" variant='h2' fontSize="20px" sx={{ marginBottom: "10px" }}>Besoin d'effectuer un scraping rapide? Renseignez juste l'URL du site</Typography>
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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#FDFEFF", borderRadius: "5px", gap: 5 }}>
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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#FDFEFF", borderRadius: "5px", gap: 5 }}>
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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#FDFEFF", borderRadius: "5px", gap: 5 }}>
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
  )
}

export default Feed