import { Box, Stack, Typography } from '@mui/material'

import { NoService } from '../utils/constants'

const NotFunctional = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1rem 2rem", height: "100%" }}>
      <Stack justifyContent="center" alignItems="center">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={NoService} alt="Service unavailable" height={400} />
        </Box>
        <Typography sx={{ fontFamily: "Montserrat", fontSize: "1.5em", fontWeight: "700", textAlign: "center", color: "#99a0b2" }}>Service indisponible pour le moment</Typography>
        <Typography sx={{ fontFamily: "Montserrat", fontSize: "1em", fontWeight: "300", textAlign: "center", color: "#99a0b2" }}>Nous travaillons activement à rendre ce service accessible dans les plus brefs délais.</Typography>
      </Stack>
    </Box>
  )
}

export default NotFunctional