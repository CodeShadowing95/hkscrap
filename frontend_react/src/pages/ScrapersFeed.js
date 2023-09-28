import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material"
import { Template } from "../components"
import { popular_sites } from "../utils/constants"

const ScrapersFeed = () => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: "1rem 2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em", width: "100%" }}>
        {/* Title & Breadcrumb */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B", fontFamily: "Montserrat" }}>Scrapers</Typography>
          {/* Breadcrumb */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/home" fontFamily="Montserrat">
              Accueil
            </Link>
            <Typography color="#93B0C8" fontFamily="Montserrat">Scrapeurs</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Stack direction="column" sx={{ marginTop: "1rem" }}>
        {/* <Box sx={{ display: "flex", borderLeft: "5px solid #03254c", borderRadius: "5px 0 0 5px", marginBottom: "2rem" }}>
          <Typography variant="h5" fontWeight="700" sx={{ paddingLeft: "10px" }}>Sites populaires</Typography>
        </Box> */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: 3, rowGap: 3 }}>
            <Template customBg />
            {popular_sites.map((popular_site, index) => (
              <div key={index}>
              <Template logo={popular_site.icon} name={popular_site.name} key={popular_site.name.trim().toLowerCase()} />
              </div>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default ScrapersFeed;