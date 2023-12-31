import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, ButtonBase, Grid, Link, Stack, Typography } from "@mui/material"
import { Business_pricing, DataExtraction, Enterprise_pricing, FacebookIcon, GoogleMaps, Individual_pricing, LinkedInIcon, Linkedin, MenuIcon, PagesJaunes, Startup_pricing, TaskAltIcon, TwitterIcon, Usecase1, Usecase2, Usecase3, Usecase4, Usecase5, Usecase6, WaveBg, YouTubeIcon, loremText, particlesBg, sub_logo } from "../../utils/constants"
import UseCase from './UseCase'
import CustomizedAccordion from './CustomizedAccordion'
import SidebarMenu from './SidebarMenu'

const Showcase = () => {
  const navigate = useNavigate()
  const [scrolling, setScrolling] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleLogin = () => {
    navigate('/auth');
  }

  const handleSignup = () => {
    navigate('/signup');
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      };
    }

    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])


  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, position: "relative" }}>
      <SidebarMenu displaySidebar={openSidebar} xsmall="flex" small="flex" med="none" large="none" exitSidebar={() => setOpenSidebar(false)} handleSignin={() => handleLogin()} />
      <Stack sx={{ backgroundImage: `url('${WaveBg}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", top: 0, position: "sticky", padding: scrolling ? "5px 30px" : "5px 25px", backgroundColor: scrolling && "#FFF", boxShadow: scrolling && "0 4px 6px rgba(0, 0, 0, 0.1)", transition: ".2s" }}>
          {/* ++++++++++++++++++++++++++++++++++++++++++ Navbar ++++++++++++++++++++++++++++++++++++++++++ */}
          {/* Left side */}
          <Box sx={{  display: "flex", justifyContent: "center", alignItems: "center", columnGap: "30px" }}>
            {/* Menubar + Logo + Title */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 2 }}>
              <Box component={ButtonBase} sx={{ display: { xs: "flex", sm: "flex", md: "none", lg: "none" }, justifyContent: "center", alignItems: "center", padding: "5px", border: "1px solid rgba(0,0,0,.7)", borderRadius: "10px" }} onClick={() => setOpenSidebar(true)}>
                <MenuIcon sx={{ fontSize: "25px", color: "rgba(0,0,0,.7)" }} />
              </Box>
              <Box sx={{ cursor: "pointer" }} component={Link} to="/">
                <img src={sub_logo} alt="hkdigitals logo" height={60} />
              </Box>
            </Box>
            {/* Links */}
            <Box sx={{ display: { xs: "none", sm: "none", md: "flex", lg: "flex" }, columnGap: 1 }}>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "4px 12px", borderRadius: "10px", "&: hover":{ color: "#4c5e9a" }, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#about'>à propos</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "4px 12px", borderRadius: "10px", "&: hover":{ color: "#4c5e9a" }, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#features'>Fonctionnalités</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "4px 12px", borderRadius: "10px", "&: hover":{ color: "#4c5e9a" }, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#pricing'>Tarifs</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "4px 12px", borderRadius: "10px", "&: hover":{ color: "#4c5e9a" }, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#faq'>F.A.Q</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "4px 12px", borderRadius: "10px", "&: hover":{ color: "#4c5e9a" }, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link} href='#docs'>Docs</Typography>
            </Box>
          </Box>
          {/* Right side */}
          <Box sx={{ display: { xs: "none", sm: "none", md: "flex", lg: "flex" }, justifyContent: "center", alignItems: "center", columnGap: 3 }}>
            <Box component={Link} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", cursor: "pointer", transition: ".2s" }} onClick={() => handleSignup()}>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: scrolling ? "#000" : "#fff", textTransform: "capitalize" }}>Inscription</Typography>
            </Box>
            <Box component={Link} sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", padding: "10px 15px", cursor: "pointer", textDecoration: "none", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }} onClick={() => handleLogin()}>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF", textTransform: "uppercase" }}>Connexion</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 95px)", margin: { xs: "0", sm: "0", md: "0 148px", lg: "0 148px" } }}>
          <Grid container padding="20px 16px">
            {/* Left side */}
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ marginBottom: { xs: "30px", sm: "30px", md: "30px", lg: 0 } }}>
              <Stack sx={{ justifyContent: "center", alignItems: "flex-start" }}>
                <Box sx={{ maxWidth: "600px" }}>
                  <Typography variant="h1" sx={{ fontFamily: "Montserrat", fontSize: { xs: "32px", sm: "40px", md: "49px", lg: "49px" }, lineHeight: { xs: "37px", sm: "46px", md: "55px", lg: "55px" }, fontWeight: 800, marginBottom: 0, marginTop: 0, color: "#37446f" }}>Accédez à une mine d'or d'informations avec notre service de scraping.</Typography>
                  <Typography sx={{ fontFamily: "Montserrat", marginTop: "20px", marginBottom: "30px", color: "#4c5e9a", fontSize: { xs: "15px", sm: "15px", md: "15px", lg: "18px" }, lineHeight: { xs: "24px", sm: "24px", md: "24px", lg: "28px" }, fontWeight: "500" }}>Découvrez, extrayez et exploitez intelligemment les données du web pour prendre des décisions éclairées et propulser votre entreprise vers l'avenir.</Typography>
                </Box>
                <Box component={Link} sx={{ padding: "10px 15px", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", cursor: "pointer", transition: ".2s", "&:hover":{backgroundImage: "linear-gradient(to right top, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)"} }} onClick={handleLogin}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF", textTransform: "capitalize" }}>Essayez gratuitement</Typography>
                </Box>
                <Stack sx={{ margin: "30px 0 10px" }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", columnGap: 5 }}>
                        <TaskAltIcon sx={{ color: "#0056b3" }} />
                        <Typography sx={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 600, color: "#8796c4" }}>30 jours d'essais gratuits</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", columnGap: 5 }}>
                        <TaskAltIcon sx={{ color: "#0056b3" }} />
                        <Typography sx={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 600, color: "#8796c4" }}>1000 crédits API gratuits</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", columnGap: 5 }}>
                      <TaskAltIcon sx={{ color: "#0056b3" }} />
                      <Typography sx={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 600, color: "#8796c4" }}>Pas de cartes de crédit nécessaires</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", columnGap: 5 }}>
                      <TaskAltIcon sx={{ color: "#0056b3" }} />
                      <Typography sx={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 600, color: "#8796c4" }}>À partir de 15€ le mois</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                  src={DataExtraction}
                  alt="data_extraction"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    verticalAlign: "middle",
                    fontStyle: "italic",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    shapeMargin: "1rem"
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>


      {/* ------------------------------------------------ First section ------------------------------------------------ */}
      <Box id="about" sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", backgroundColor: "#eef0f6" }}>
        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: { xs: "0", sm: "0", md: "0", lg: "0 148px" } }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
            <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", maxWidth: "700px", fontWeight: 700, color: "#37446f" }}>
              Extraire les données plus rapidement & efficacement
            </Typography>
            <Typography sx={{ margin: 0, color: "#8087a6", fontSize: "16px", fontFamily: "Montserrat", textAlign: "center", maxWidth: "800px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas pharetra convallis posuere morbi leo urna molestie at.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: "24px" }}>
                  <TaskAltIcon sx={{ color: "#0056b3", fontSize: "30px" }} />
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "30px", fontWeight: 700 }}>
                    Titre
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: { xs: "justify", sm: "justify" } }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: "24px" }}>
                  <TaskAltIcon sx={{ color: "#0056b3", fontSize: "30px" }} />
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "30px", fontWeight: 700 }}>
                    Titre
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: { xs: "justify", sm: "justify" } }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: "24px" }}>
                  <TaskAltIcon sx={{ color: "#0056b3", fontSize: "30px" }} />
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "30px", fontWeight: 700 }}>
                    Titre
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: { xs: "justify", sm: "justify" } }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: "24px" }}>
                  <TaskAltIcon sx={{ color: "#0056b3", fontSize: "30px" }} />
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "30px", fontWeight: 700 }}>
                    Titre
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: { xs: "justify", sm: "justify" } }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: "24px" }}>
                  <TaskAltIcon sx={{ color: "#0056b3", fontSize: "30px" }} />
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "30px", fontWeight: 700 }}>
                    Titre
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: { xs: "justify", sm: "justify" } }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: "24px" }}>
                  <TaskAltIcon sx={{ color: "#0056b3", fontSize: "30px" }} />
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "30px", fontWeight: 700 }}>
                    Titre
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: { xs: "justify", sm: "justify" } }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>


      {/* ------------------------------------------------ Second section ------------------------------------------------ */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", /*backgroundColor: "#e6f1ff"*/backgroundImage: `url('${particlesBg}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: { xs: "0", sm: "0", md: "0 148px", lg: "0 148px" } }} spacing={2}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
            <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, maxWidth: "700px", lineHeight: "40px", color: "#37446f" }}>Comment ça fonctionne ?</Typography>
            <Typography sx={{ margin: 0, color: "#8087a6", lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", maxWidth: "800px", textAlign: "center" }}>{loremText[2]}</Typography>
          </Box>
          <Grid container sx={{ paddingTop: 0, paddingLeft: 0 }}>
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ padding: "16px", "@media (min-width: 600px)": { paddingLeft: "16px" } }}>
              <Stack padding="30px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: "-50px", padding: "20px", borderRadius: "50px", backgroundColor: "#FFF" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: 0, marginBottom: 0, textAlign: "center", color: "#37446f" }}>
                      I
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: "24px" }}>
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: 0, marginBottom: 0, textAlign: "center", color: "#37446f" }}>
                    Fournir le lien du site cible
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: { xs: "justify", sm: "justify" } }}>{loremText[1]}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ padding: "16px", "@media (min-width: 600px)": { paddingLeft: "16px" } }}>
              <Stack padding="30px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: "-50px", padding: "20px", borderRadius: "50px", backgroundColor: "#FFF" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: 0, marginBottom: 0, textAlign: "center", color: "#37446f" }}>
                      II
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: "24px" }}>
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: 0, marginBottom: 0, textAlign: "center", color: "#37446f" }}>
                    Envoyer la requête POST
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: { xs: "justify", sm: "justify" } }}>{loremText[1]}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ padding: "16px", "@media (min-width: 600px)": { paddingLeft: "16px" } }}>
              <Stack padding="30px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: "-50px", padding: "20px", borderRadius: "50px", backgroundColor: "#FFF" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: 0, marginBottom: 0, textAlign: "center", color: "#37446f" }}>
                      III
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: "24px" }}>
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: 0, marginBottom: 0, textAlign: "center", color: "#37446f" }}>
                    Recevoir la donnée
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: { xs: "justify", sm: "justify" } }}>{loremText[1]}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>


      {/* ------------------------------------------------ Third section ------------------------------------------------ */}
      <Box id="features" sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", backgroundColor: "#eef0f6" }}>
        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: { xs: "0", sm: "0", md: "0 148px", lg: "0 148px" } }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
            <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, maxWidth: "700px", lineHeight: "40px", color: "#37446f" }}>Cas d'utilisation de notre solution</Typography>
            <Typography sx={{ margin: 0, color: "#8087a6", lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", maxWidth: "800px", textAlign: "center" }}>{loremText[3]}</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <UseCase useCaseIcon={Usecase1} title="Extraction de données" labelId="details1" description={loremText[3]} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <UseCase useCaseIcon={Usecase2} title="Avis des consommateurs" labelId="details2" description={loremText[3]} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <UseCase useCaseIcon={Usecase3} title="Veille Concurrentielle" labelId="details3" description={loremText[3]} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <UseCase useCaseIcon={Usecase4} title="Entreprises & Particuliers" labelId="details4" description={loremText[3]} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <UseCase useCaseIcon={Usecase5} title="Suivi des Médias Sociaux" labelId="details5" description={loremText[3]} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <UseCase useCaseIcon={Usecase6} title="Analyse de Marchés" labelId="details6" description={loremText[3]} />
            </Grid>
          </Grid>
        </Stack>
      </Box>


      {/* ------------------------------------------------ Fourth section ------------------------------------------------ */}
      <Box id="pricing" sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0 120px", marginBottom: 0, backgroundColor: "#e6f1ff" }}>
        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: { xs: "0", sm: "0 148px", md: "0 148px", lg: "0 148px" } }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
            <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, maxWidth: "700px", lineHeight: "40px", color: "#37446f" }}>Tarification simple et transparente</Typography>
            <Typography sx={{ margin: 0, color: "#8087a6", lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", maxWidth: "800px", textAlign: "center" }}>{loremText[1]}</Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box sx={{ display: "flex", backgroundColor: "#fff", justifyContent: "center", alignItems: "center", padding: "2em 1em", maxWidth: { xs: "100%", sm: "50%", md: "50%", lg: "50%" }, marginBottom: "5px", borderRadius: "10px", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={8}>
                    <Stack spacing="10px" sx={{ maxWidth: "700px" }}>
                      <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: { xs: "20px", sm: "22px", md: "24px", lg: "24px"}, lineHeight: { xs: "26px", sm: "28px", md: "30px", lg: "30px" }, fontWeight: 700, color: "#37446f" }}>Essayez gratuitement pendant 30 jours</Typography>
                      <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", fontSize: "16px" }}>{loremText[2]}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 5px", maxWidth: "200px", marginTop: { xs: "20px", sm: "20px", md: 0, lg: 0 }, borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", cursor: "pointer", transition: ".2s", "&:hover":{backgroundImage: "linear-gradient(to right top, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)"} }}>
                      <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF", textAlign: "center" }}>Démarrez maintenant</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Box sx={{ display: "flex", padding: "20px 15px", borderRadius: "10px", backgroundColor: "#FFF", flexDirection: "column", justifyContent: "space-between", alignItems: "center", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e6f1ff", borderRadius: "10px", width: "35px", padding: "8px" }}>
                  <img src={Individual_pricing} alt="pricing" style={{ width: "100%", height: "100%" }} />
                </Box>
                <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: "20px", marginBottom: "10px", color: "#37446f" }}>Personnel</Typography>
                <Box sx={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "40px", lineHeight: "54px", fontWeight: 500, paddingRight: "4px", color: "#37446f" }}>Free</Typography>
                  <Typography sx={{ color: "#8087a6", fontFamily: "Montserrat", fontSize: "16px", alignSelf: "flex-end" }}></Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px", marginBottom: "30px", gap: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", maxWidth: "100%", padding: "10px 50px", marginTop: "34px", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF" }}>Choisir</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Box sx={{ display: "flex", padding: "20px 15px", borderRadius: "10px", backgroundColor: "#FFF", flexDirection: "column", justifyContent: "space-between", alignItems: "center", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e6f1ff", borderRadius: "10px", width: "35px", padding: "8px" }}>
                  <img src={Startup_pricing} alt="pricing" style={{ width: "100%", height: "100%" }} />
                </Box>
                <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: "20px", marginBottom: "10px", color: "#37446f" }}>Startup</Typography>
                <Box sx={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "40px", lineHeight: "54px", fontWeight: 500, paddingRight: "4px", color: "#37446f" }}>29.99</Typography>
                  <Typography sx={{ color: "#8087a6", fontFamily: "Montserrat", fontSize: "16px", alignSelf: "flex-end" }}>€/mois</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px", marginBottom: "30px", gap: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", maxWidth: "100%", padding: "10px 50px", marginTop: "34px", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF" }}>Choisir</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Box sx={{ display: "flex", padding: "20px 15px", borderRadius: "10px", backgroundColor: "#FFF", flexDirection: "column", justifyContent: "space-between", alignItems: "center", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e6f1ff", borderRadius: "10px", width: "35px", padding: "8px" }}>
                  <img src={Business_pricing} alt="pricing" style={{ width: "100%", height: "100%" }} />
                </Box>
                <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: "20px", marginBottom: "10px", color: "#37446f" }}>Business</Typography>
                <Box sx={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "40px", lineHeight: "54px", fontWeight: 500, paddingRight: "4px", color: "#37446f" }}>59.99</Typography>
                  <Typography sx={{ color: "#8087a6", fontFamily: "Montserrat", fontSize: "16px", alignSelf: "flex-end" }}>€/mois</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px", marginBottom: "30px", gap: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", maxWidth: "100%", padding: "10px 50px", marginTop: "34px", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF" }}>Choisir</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Box sx={{ display: "flex", padding: "20px 15px", borderRadius: "10px", backgroundColor: "#FFF", flexDirection: "column", justifyContent: "space-between", alignItems: "center", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e6f1ff", borderRadius: "10px", width: "35px", padding: "8px" }}>
                  <img src={Enterprise_pricing} alt="pricing" style={{ width: "100%", height: "100%" }} />
                </Box>
                <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: "20px", marginBottom: "10px", color: "#37446f" }}>Entreprise</Typography>
                <Box sx={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "40px", lineHeight: "54px", fontWeight: 500, paddingRight: "4px", color: "#37446f" }}>119.99</Typography>
                  <Typography sx={{ color: "#8087a6", fontFamily: "Montserrat", fontSize: "16px", alignSelf: "flex-end" }}>€/mois</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px", marginBottom: "30px", gap: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                    <TaskAltIcon sx={{ color: "#0056b3" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", maxWidth: "100%", padding: "10px 50px", marginTop: "34px", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF" }}>Choisir</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Box>


      {/* ------------------------------------------------ Fifth section ------------------------------------------------ */}
      <Box id="docs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", backgroundImage: "linear-gradient(to right top, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)" }}>
        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: { xs: "0", sm: "0", md: "0 148px", lg: "0 148px" } }} spacing={2}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
            <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, maxWidth: "700px", lineHeight: "40px", color: "#fff" }}>Solutions de données prêtes à l'emploi</Typography>
            <Typography sx={{ margin: 0, lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", maxWidth: "800px", textAlign: "center", color: "#fff" }}>{loremText[1]}</Typography>
          </Box>
          <Grid container sx={{ paddingTop: 0, paddingLeft: 0 }}>
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ padding: "16px", "@media (min-width: 600px)": { paddingLeft: "16px" } }}>
              <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: "15px" }}>
                  <img src={GoogleMaps} alt="Google Maps" height={40} />
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>
                    Google Maps Scraper
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>{loremText[2]}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ padding: "16px", "@media (min-width: 600px)": { paddingLeft: "16px" } }}>
              <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: "15px" }}>
                  <img src={Linkedin} alt="Linkedin" height={40} />
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>
                    Linkedin Scraper
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>{loremText[2]}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ padding: "16px", "@media (min-width: 600px)": { paddingLeft: "16px" } }}>
              <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: "15px" }}>
                  <img src={PagesJaunes} alt="Pages Jaunes" height={40} />
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>
                    Pages Jaunes Scraper
                  </Typography>
                </Box>
                <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>{loremText[2]}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>


      {/* ------------------------------------------------ Sixth section ------------------------------------------------ */}
      <Box id="faq" sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", backgroundColor: "#eef0f6" }}>
        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: { xs: "0", sm: "0", md: "0 148px", lg: "0 148px" } }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
            <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, maxWidth: "700px", lineHeight: "40px", color: "#37446f" }}>F.A.Q.</Typography>
            <Typography sx={{ margin: 0, color: "#8087a6", lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", maxWidth: "800px", textAlign: "center" }}>{loremText[1]}</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CustomizedAccordion />
            </Grid>
          </Grid>
        </Stack>
      </Box>


      {/* ------------------------------------------------ Footer ------------------------------------------------ */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "32px", backgroundColor: "#fff" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginTop: "20px", padding: "0 16px", margin: { xs: "0", sm: "0", md: "0 148px", lg: "0 148px" }, width: "100%" }}>
          <Box sx={{ marginBottom: "3rem" }}>
            <img src={sub_logo} alt="hkscrap_logo" style={{ height: "80px" }} />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, marginBottom: "20px", fontSize: "1em", textTransform: "uppercase", color: "#37446f" }}>Produits</Typography>

              <Stack spacing={1}>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>API Web Scraping</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>API Google Maps</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>API LinkedIn</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>API Pages Jaunes</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Scrapers</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, marginBottom: "20px", fontSize: "1em", textTransform: "uppercase", color: "#37446f" }}>Utilisation</Typography>

              <Stack spacing={1}>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Web Scraping pour l'immobilier</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Web Scraping pour le recrutement</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Web Scraping au service des entreprises</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Web Scraping pour E-Commerce</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Web Scraping pour Web Marketing</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, marginBottom: "20px", fontSize: "1em", textTransform: "uppercase", color: "#37446f" }}>Légal</Typography>

              <Stack spacing={1}>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Termes & Conditions d'utilisation</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Politique de confidentialité</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Légalité du Web Scraping</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, marginBottom: "20px", fontSize: "1em", textTransform: "uppercase", color: "#37446f" }}>Entreprise</Typography>

              <Stack spacing={1}>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>HKDigitals, c'est quoi?</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Contactez-nous</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Blog</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>HKDigitals Services</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, marginBottom: "20px", fontSize: "1em", textTransform: "uppercase", color: "#37446f" }}>Navigation</Typography>

              <Stack spacing={1}>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>À propos</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Fonctionnalités</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Tarifs</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>F.A.Q</Typography>
                </Box>
                <Box component={Link} href="/" sx={{ textDecoration: "none", color: "#37446f", padding: "2px 0" }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300 }}>Documentation</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          
          <hr component="divider" style={{ border: "none", backgroundColor: "#dee2ef", height: "1px", width: "100%", margin: "3rem 0" }} />

          
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", gap: { xs: 3, sm: 3, md: 0, lg: 0 } }}>
            <Stack>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", lineHeight: "26px", fontWeight: 400 }}>23 Rue Jules Vallès, Villeurbanne - Lyon, France</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", lineHeight: "26px", fontWeight: 400 }}>&copy; HKSCRAP. Tous droits réservés.</Typography>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "start", gap: 2 }}>
              <Box component={Link} href="#linkedin" sx={{ textDecoration: "none" }}><LinkedInIcon sx={{ fontSize: "30px", color: "#37446f" }} /></Box>
              <Box component={Link} href="#twitter" sx={{ textDecoration: "none" }}><TwitterIcon sx={{ fontSize: "30px", color: "#37446f" }} /></Box>
              <Box component={Link} href="#facebook" sx={{ textDecoration: "none" }}><FacebookIcon sx={{ fontSize: "30px", color: "#37446f" }} /></Box>
              <Box component={Link} href="#youtube" sx={{ textDecoration: "none" }}><YouTubeIcon sx={{ fontSize: "30px", color: "#37446f" }} /></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Showcase