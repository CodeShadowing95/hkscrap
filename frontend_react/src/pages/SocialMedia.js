import { useParams } from 'react-router-dom'
import { Box, Breadcrumbs, Link, Stack, Typography } from '@mui/material'
// import { Navbar } from '.'
import { Options, SearchbarTerm } from '../components'

import { NoData, PlayArrowIcon, popular_sites } from '../utils/constants'
import Sidebar from '../components/Sidebar'

const SocialMedia = ({ userProfile }) => {
  const { id } = useParams();
  const site = popular_sites.find((item) => item.name.trim().toLowerCase() === id);

  return (
    <>
    <Stack direction="column" sx={{ flex: "1" }}>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "2rem 4rem" }}>
        {/* Content header */}
        <Box sx={{ display: "flex", flexDirection: "column", marginBottom: "1.5em", rowGap: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 1 }}>
            <img src={site.icon} alt={`${site.name} icon`} height={40} />
            <Typography variant="h1" sx={{ fontSize: "2.5em", fontWeight: "600", color: "#152C5B" }}>{site.name}</Typography>
          </Box>
          {/* Breadcrumb */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/home">
              Accueil
            </Link>
            <Link underline="hover" color="inherit" href="/scrapers">
              Scrapers
            </Link>
            <Typography color="#93B0C8">{site.name}</Typography>
          </Breadcrumbs>
        </Box>

        <Stack direction="row" justifyContent="space-between" marginTop="3rem" spacing={5}>
          {/* Barre de recher par mot-clé */}
          <SearchbarTerm />

          {/* Select + Button */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
            {/* Select */}
            <Options />
            {/* Button */}
            <Box sx={{
              padding: "10px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1357a6",
              color: "#FFF",
              borderRadius: "3px",
              cursor: "pointer",
              transition: "0.2s",
              columnGap: 1,
              "&:hover": {
                backgroundColor: "#1870d5",
                color: "#FFF",
              }
            }}
            >
              <PlayArrowIcon fontSize="medium" />
              <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "500" }}>Démarrer</Typography>
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* Content body */}
      <Box sx={{ height: "30rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: 1, border: "2px dashed #d2d2d2", borderRadius: "5px", backgroundColor: "#EDEDEF", height: "20rem", width: "65rem" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "8rem", height: "8rem" }}>
            <img src={NoData} alt="No_data" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Box>
          <Typography sx={{ fontSize: "30px", color: "#6e6e6e", fontWeight: 500 }}>Hello, Hermann!</Typography>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "60%" }}>
            <Typography variant="body2" sx={{ color: "#a0a0a0", fontSize: "1rem", fontWeight: 300, textAlign: "center" }}>Aucune donnée scrapée de {site.name} n'a été enregistrée. Si tu veux commencer l'opération, tu peux sélectionner les informations dont tu as besoin, ensuite tu cliques juste sur "Démarrer"</Typography>
          </div>
        </Box>
      </Box>
    </Stack>
    </>
  )
}

export default SocialMedia