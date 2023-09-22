import { useParams } from 'react-router-dom'
import { Box, Breadcrumbs, Link, Typography } from '@mui/material'
// import { Navbar } from '.'

import { popular_sites } from '../utils/constants'

const SocialMedia = ({ userProfile }) => {
  const { id } = useParams();
  const site = popular_sites.find((item) => item.name.trim().toLowerCase() === id);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "1rem 2rem" }}>
      {/* Content header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5em", rowGap: "20px", width: "100%" }}>
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
    </Box>
  )
}

export default SocialMedia