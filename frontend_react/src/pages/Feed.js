import { Stack, Box, Typography, Grid } from '@mui/material'
import { Chart1, Chart2, Searchbar, Template } from '../components'
import { FlashOnIcon, HomeIcon, Inventory2Icon, PeopleIcon, TrendingUpIcon, TwinkleBG, popular_sites } from '../utils/constants';
import { useEffect, useState } from 'react';
import TableScrapeDatas from '../components/TableScrapeDatas';
import { useTheme } from '../components/ThemeProvider';
import { fetchFromServer } from '../utils/fetchFromServer';

const Feed = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [datas, setDatas] = useState([]);
  const [lengthUsers, setLengthUsers] = useState(0);
  const [lengthRequests, setLengthRequests] = useState(0);
  const [lengthDatas, setLengthDatas] = useState(0);
  const [countAll, setCountAll] = useState([]);
  const { theme } = useTheme();

  

  function countAllScrapes() {
    try {
      const { email } = user[0];
      fetch(`${process.env.REACT_APP_BASE_API_URL}/get-user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }),
      })
      .then(async (response) => {
        if(!response.ok) throw new Error("Impossible d'accéder à la requête")
  
        const data = await response.json();
        const { uid } = data[0];
        try {
          const temp_datas = [];
          for (let index = 0; index < popular_sites.length; index++) {
            const website = popular_sites[index]?.name;
            fetchFromServer('scrapes-count-by-site', { website, uid })
            .then(async (res) => {
              const result = await res?.data[0].counter;
              temp_datas.push(result);
            })
          }
          setCountAll(temp_datas);
        } catch (error) {
          console.error("Erreur");
        }
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
  }

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_BASE_API_URL}/count-users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(async (response) => {
        if(!response.ok) throw new Error('Error when requesting some datas')

        const users_length = await response.json();
        setLengthUsers(users_length[0]?.countUsers);
      })
    } catch (error) {
      console.error("Erreur lors de la récupération de données", error);
    }
    
    try {
      const { email } = user[0];
      fetch(`${process.env.REACT_APP_BASE_API_URL}/get-user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }),
      })
      .then(async (response) => {
        if(!response.ok) throw new Error("Impossible d'accéder à la requête")

        const data = await response.json();
        const { uid } = data[0];
        fetch(`${process.env.REACT_APP_BASE_API_URL}/count-scraped-datas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uid: uid }),
        })
        .then(async (response) => {
          if(!response.ok) throw new Error("Impossible d'accéder à la requête")

          const responseData = await response.json();
          setLengthDatas(responseData[0]?.totalDatas);
        })
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }

    try {
      const { email } = user[0];
      fetch(`${process.env.REACT_APP_BASE_API_URL}/get-user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }),
      })
      .then(async (response) => {
        if(!response.ok) throw new Error("Impossible d'accéder à la requête")

        const data = await response.json();
        const { uid } = data[0];
        fetch(`${process.env.REACT_APP_BASE_API_URL}/recentDatas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uid: uid }),
        })
        .then(async (response) => {
          if(!response.ok) throw new Error("Impossible d'accéder à la requête")
    
          const responseData = await response.json();
          setDatas(responseData);
        })
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
    
    try {
      const { email } = user[0];
      fetch(`${process.env.REACT_APP_BASE_API_URL}/get-user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }),
      })
      .then(async (response) => {
        if(!response.ok) throw new Error("Impossible d'accéder à la requête")

        const data = await response.json();
        const { uid } = data[0];
        fetch(`${process.env.REACT_APP_BASE_API_URL}/number_requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uid: uid }),
        })
        .then(async (response) => {
          if(!response.ok) throw new Error("Impossible d'accéder à la requête")

          const responseData = await response.json();
          setLengthRequests(responseData);
        })
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }

    countAllScrapes();
  }, [])

  return (
    <Stack sx={{ backgroundColor: theme === 'light' ? "#eff2f6" : "#253c5c" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", marginBottom: "1.5em", padding: "2rem 2rem 8rem", /*backgroundImage: theme === 'dark' ? "linear-gradient(to bottom, #253c5c, #2c2b43, #271d2b, #1a1117, #000000)" : "linear-gradient(to bottom, #f0f2f7, #dfe3ee, #ced4e4, #bdc5db, #acb7d2)"*/backgroundImage: `url('${TwinkleBG}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Title & Breadcrumb */}
        <Stack rowGap="15px" width="100%">
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
            <HomeIcon sx={{ color: theme === "dark" ? "#FFF" : "#FFF", fontSize: "2em" }} />
            <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: theme === "dark" ? "#FFF" : "#FFF", fontFamily: "Montserrat" }}>Welcome back, {user[0]?.prenom}</Typography>
          </Box>
          {/* Breadcrumb */}
          <Typography sx={{ fontSize: "15px", textAlign: "center", fontWeight: 400, marginBottom: "10px", color: "#a8aebd", fontFamily: "Montserrat" }}>Entrez l'URL de la page que vous souhaitez scraper dans la barre de recherche ci-dessous <br/> et obtenez des informations précieuses.</Typography>
          {/* Barre de recherche */}
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Searchbar />
          </Box>
        </Stack>
      </Box>

      {/* Vue générale */}
      <Box sx={{ padding: "0 2rem", marginTop: "-6rem" }}>
        <Box>
          {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", "& > *": { flex: 1}, }}> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              {user[0].role === "Modérateur" ?
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: theme === "light" ? "#FDFEFF" : "#1F2937", borderRadius: "10px", gap: 5 }}>
                  <Stack spacing={2.5}>
                    <Typography sx={{ fontSize: "17px", fontWeight: 600, color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>Nombre d'utilisateurs</Typography>
                    <Typography variant='h4' sx={{ fontWeight: 700, color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>{lengthUsers}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400, fontFamily: "Montserrat" }} color="#999">Utilisateurs enregistrés</Typography>
                  </Stack>
                  <Stack justifyContent="center" alignItems="center">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#c8d9ea", borderRadius: "50px" }}>
                      <PeopleIcon sx={{ fontSize: "50px", color: "#417AAE" }} />
                    </div>
                  </Stack>
                </Box>
                :
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: theme === "light" ? "#FDFEFF" : "#1F2937", borderRadius: "10px", gap: 5 }}>
                  <Stack spacing={2.5}>
                    <Typography sx={{ fontSize: "17px", fontWeight: 600, color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>Requêtes effectuées</Typography>
                    <Typography variant='h4' sx={{ fontWeight: 700, color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>{lengthRequests}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400, fontFamily: "Montserrat" }} color="#999">Requêtes effectuées ce mois</Typography>
                  </Stack>
                  <Stack justifyContent="center" alignItems="center">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#ffe4b3", borderRadius: "50px" }}>
                      <FlashOnIcon sx={{ fontSize: "50px", color: "#ffa500" }} />
                    </div>
                  </Stack>
                </Box>
              }
            </Grid>


            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: theme === "light" ? "#FDFEFF" : "#1F2937", borderRadius: "10px", gap: 5 }}>
                <Stack spacing={2.5}>
                  <Typography sx={{ fontSize: "17px", fontWeight: 600, color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>Volume de données stockées</Typography>
                  <Typography variant='h4' sx={{ fontWeight: 700, color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>{lengthDatas > 0 ? lengthDatas : 0}</Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 400, fontFamily: "Montserrat" }} color="#999">Données extraites ce mois</Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#d2e8c9", borderRadius: "50px" }}>
                    <Inventory2Icon sx={{ fontSize: "50px", color: "#5da145" }} />
                  </div>
                </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: theme === "light" ? "#FDFEFF" : "#1F2937", borderRadius: "10px", gap: 5 }}>
                <Stack spacing={2.5}>
                  <Typography sx={{ fontSize: "17px", fontWeight: 600, color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>Taux de réussite</Typography>
                  <Typography variant='h4' sx={{ fontWeight: 700, color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>{lengthDatas > 0 ? (70 / 80) * 100 : 0}%</Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 400, fontFamily: "Montserrat" }} color="#999">Taux de réussite par requête</Typography>
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
                <Box sx={{ display: "flex", padding: "20px", borderBottom: theme === "light" ? "1px solid #e1e1e1" : "none", backgroundColor: theme === "light" ? "#F8F8F9" : "#405472" }}>
                  <Typography sx={{ fontSize: "1.15rem", fontWeight: 600, color: theme === "light" ? "#152C5B" : "#FFF", fontFamily: "Montserrat" }}>Scrapings effectués par plateforme</Typography>
                </Box>
                {/* Content */}
                <Box sx={{ backgroundColor: theme === "light" ? "#FDFEFF" : "#1F2937", padding: "1.35rem" }}>
                  <Chart1 />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Stack sx={{ transition: "0.2s", "&:hover": {boxShadow: "0px 5px 10px 1px #D5D5D5"} }}>
                {/* Title */}
                <Box sx={{ display: "flex", padding: "20px", borderBottom: theme === "light" ? "1px solid #e1e1e1" : "none", backgroundColor: theme === "light" ? "#F8F8F9" : "#405472" }}>
                  <Typography sx={{ fontSize: "1.15rem", fontWeight: 600, color: theme === "light" ? "#152C5B" : "#FFF", fontFamily: "Montserrat" }}>Taux de réussite par source</Typography>
                </Box>
                {/* Content */}
                <Box sx={{ backgroundColor: theme === "light" ? "#FDFEFF" : "#1F2937", padding: "1.35rem" }}>
                  <Chart2 />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ margin: "2rem 0" }}>
          <Grid container spacing={2}>
            {/* First side */}
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography variant="h3" sx={{ fontSize: "1.3em", fontWeight: 600, color: theme === 'light' ? "#152C5B" : "#FDFEFF", fontFamily: "Montserrat" }}>Sites phares</Typography>
                  <Stack padding="20px" border={theme === "light" ? "1px solid #e1e1e1" : "none"} borderRadius="10px" sx={{ backgroundColor: theme === "light" ? "#FDFEFF" : "#1F2937" }} spacing={1}>
                    {/* map */}
                    {popular_sites.map((site, index) => (
                        <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 7px", cursor: "pointer", transition: "0.2s", "&: hover": { backgroundColor: theme === 'light' ? "#f2f2f2" : "rgba(255, 255, 255, .1)", borderRadius: "5px" }, "&: hover .flash": { color: "#ffa500" } }}>
                          {/* Image + title */}
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                            {/* Image */}
                            <Box sx={{ display: "inline-block", width: "1.5rem", height: "1.5rem" }}>
                              <img src={site.icon} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} />
                            </Box>
                            {/* Title */}
                            <Typography sx={{ fontSize: "1rem", fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>{site.name}</Typography>
                          </Box>
                          {/* Run image + count */}
                          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                            <FlashOnIcon className='flash' sx={{ fontSize: "20px", color: "#9CA3AF" }} />
                            <Typography sx={{ color: theme === "light" ? "#000" : "#FFF", fontFamily: "Montserrat" }}>{countAll[index]}</Typography>
                          </Box>
                        </Box>
                      ))
                    }
                  </Stack>
                </Stack>
                <Template customBg />
              </Stack>
            </Grid>

            {/* Second side */}
            <Grid item xs={12} sm={12} md={12} lg={9}>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography variant="h3" sx={{ fontSize: "1.3em", fontWeight: 600, color: theme === 'light' ? "#152C5B" : "#FDFEFF", fontFamily: "Montserrat" }}>Scrapings récents</Typography>
                  <Stack padding="20px" border={theme === 'light' ? "1px solid #e1e1e1" : "none"} borderRadius="10px" sx={{ backgroundColor: theme === "light" ? "#FDFEFF" : "#1F2937" }} spacing={1}>
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