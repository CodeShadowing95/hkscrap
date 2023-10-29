import { Box, ButtonBase, Link, Slide, Stack, Typography } from '@mui/material'
import { CloseIcon } from '../../utils/constants'

const SidebarMenu = ({ displaySidebar, xsmall, small, med, large, exitSidebar, handleSignin }) => {
  return (
    <Box sx={{ display: { xs: xsmall, sm: small, md: med, lg: large }, position: "absolute", top: 0, left: displaySidebar === true ? 0 : "-100%",  zIndex: 1000, width: "100%", backgroundColor: "rgba(255,255,255, .5)" }}>
      <Slide direction="right" in={displaySidebar} mountOnEnter>
        <Box sx={{ height: "100dvh", width: "50%", backgroundColor: "#fff", padding: "1.5rem" }}>
          <Stack spacing={5}>
            <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "flex-end", padding: "5px", borderRadius: "10px" }} onClick={exitSidebar}>
              <CloseIcon sx={{ fontSize: "25px", color: "rgba(0,0,0,.7)" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>              
              <hr component="divider" style={{ border: "none", backgroundColor: "rgba(0,0,0,.1)", height: ".5px", width: "100%" }} />
              <Typography sx={{ fontFamily: "Montserrat", fontSize: { xs: "16px", sm: "16px", md: "19px", lg: "20px" }, fontWeight: 300, textTransform: "capitalize", cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#about' onClick={exitSidebar}>à propos</Typography>
              <hr component="divider" style={{ border: "none", backgroundColor: "rgba(0,0,0,.1)", height: ".5px", width: "100%" }} />
              <Typography sx={{ fontFamily: "Montserrat", fontSize: { xs: "16px", sm: "16px", md: "19px", lg: "20px" }, fontWeight: 300, textTransform: "capitalize", cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#features' onClick={exitSidebar}>Fonctionnalités</Typography>
              <hr component="divider" style={{ border: "none", backgroundColor: "rgba(0,0,0,.1)", height: ".5px", width: "100%" }} />
              <Typography sx={{ fontFamily: "Montserrat", fontSize: { xs: "16px", sm: "16px", md: "19px", lg: "20px" }, fontWeight: 300, textTransform: "capitalize", cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#pricing' onClick={exitSidebar}>Tarifs</Typography>
              <hr component="divider" style={{ border: "none", backgroundColor: "rgba(0,0,0,.1)", height: ".5px", width: "100%" }} />
              <Typography sx={{ fontFamily: "Montserrat", fontSize: { xs: "16px", sm: "16px", md: "19px", lg: "20px" }, fontWeight: 300, textTransform: "capitalize", cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#faq' onClick={exitSidebar}>F.A.Q</Typography>
              <hr component="divider" style={{ border: "none", backgroundColor: "rgba(0,0,0,.1)", height: ".5px", width: "100%" }} />
              <Typography sx={{ fontFamily: "Montserrat", fontSize: { xs: "16px", sm: "16px", md: "19px", lg: "20px" }, fontWeight: 300, textTransform: "capitalize", cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#docs' onClick={exitSidebar}>Docs</Typography>
              <hr component="divider" style={{ border: "none", backgroundColor: "rgba(0,0,0,.1)", height: ".5px", width: "100%" }} />
              <Box component={Link} sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", padding: "10px 15px", cursor: "pointer", textDecoration: "none", borderRadius: "10px", width: "50%", marginTop: "20px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }} onClick={handleSignin}>
                <Typography sx={{ fontFamily: "Montserrat", fontSize: { xs: "12px", sm: "14px", md: "14px", lg: "16px" }, fontWeight: 700, color: "#FFF", textTransform: "uppercase" }}>Connexion</Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Slide>
    </Box>
  )
}

export default SidebarMenu