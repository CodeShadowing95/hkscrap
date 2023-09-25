import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Stack, Box, Typography, Grid, Link, Button, Fade } from '@mui/material'
import { Business_pricing, DataExtraction, Enterprise_pricing, GoogleMaps, Individual_pricing, Linkedin, PagesJaunes, Startup_pricing, TaskAltIcon, Usecase1, Usecase2, Usecase3, Usecase4, Usecase5, Usecase6, WaveBg, loremText, particlesBg, sub_logo } from '../utils/constants';
import { CustomizedAccordion } from '../components';

const keyframesAnimation = `
  @keyframes slideUpDown {
    0%, 100% {
      transform: translateY(0)
    }
    50% {
      transform: translateY(-10px)
    }
  }
`

const Showcase = () => {
  const navigate = useNavigate();
  const [scrolling, setScrolling] = useState(false);

  const animationCSS = `
    ${keyframesAnimation}
    slideUpDown 5s linear infinite
  `;

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
    // Main page
    <Stack sx={{ flex: 1, backgroundColor: "#eef0f6" }}>
      {/* ++++++++++++++++++++++++++++++++++++++++++ Navbar ++++++++++++++++++++++++++++++++++++++++++ */}
      <Stack sx={{ backgroundImage: `url('${WaveBg}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <Box sx={{ display: "flex", top: 0, position: "sticky", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", backgroundColor: scrolling === true ? "#FFF" : "transparent", transition: ".2s" }}>
          {/* Left side */}
          <Box sx={{  display: "flex", justifyContent: "center", alignItems: "center", columnGap: "30px" }}>
            {/* Logo + Title */}
            <Box sx={{ cursor: "pointer" }} component={Link} to="/showcase">
              <img src={sub_logo} alt="hkdigitals logo" height={60} />
            </Box>
            {/* Links */}
            <Box sx={{ display: "flex", columnGap: 1 }}>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "10px 15px", borderRadius: "10px", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link}>à propos</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "10px 15px", borderRadius: "10px", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link}>Fonctionnalités</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "10px 15px", borderRadius: "10px", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link}>Tarifs</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "10px 15px", borderRadius: "10px", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link}>FAQ</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, textTransform: "capitalize", padding: "10px 15px", borderRadius: "10px", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, cursor: "pointer", color: "#000", textDecoration: "none", transition: ".2s" }} component={Link}>Blog</Typography>
            </Box>
          </Box>
          {/* Right side */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 2 }}>
            <Box component={Link} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", cursor: "pointer", transition: ".2s" }} onClick={() => handleSignup()}>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: scrolling ? "#000" : "#FFF", textTransform: "capitalize" }}>Inscription</Typography>
            </Box>
            <Box component={Link} sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", padding: "10px 15px", cursor: "pointer", textDecoration: "none", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }} onClick={() => handleLogin()}>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF", textTransform: "uppercase" }}>Connexion</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "calc(100dvh - 66px)" }}>
          <Grid container spacing={8} padding="15px" margin="0 23px">
            {/* Left side */}
            <Grid item xs={12} sm={12} md={4} lg={5}>
              <Stack sx={{ justifyContent: "center", alignItems: "flex-start" }}>
                <Typography variant="h1" sx={{ fontFamily: "Montserrat", fontSize: "49px", lineHeight: "55px", fontWeight: 800, marginBottom: 0, marginTop: 0, color: "#37446f" }}>Accédez à une mine d'or d'informations avec notre service de scraping.</Typography>
                <Typography sx={{ fontFamily: "Montserrat", marginTop: "20px", marginBottom: "30px", color: "#969cb6", fontSize: "18px", lineHeight: "28px", fontWeight: "500" }}>Découvrez, extrayez et exploitez intelligemment les données du web pour prendre des décisions éclairées et propulser votre entreprise vers l'avenir.</Typography>
                <Box sx={{ padding: "10px 15px", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", cursor: "pointer", transition: ".2s", "&:hover":{backgroundImage: "linear-gradient(to right top, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)"} }}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF", textTransform: "capitalize" }}>Essayez gratuitement</Typography>
                </Box>
                <Stack sx={{ margin: "30px 0 10px" }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", columnGap: 5 }}>
                        <TaskAltIcon sx={{ color: "#0056b3" }} />
                        <Typography sx={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 600, color: "#969cb6" }}>30 jours d'essais gratuits</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", columnGap: 5 }}>
                        <TaskAltIcon sx={{ color: "#0056b3" }} />
                        <Typography sx={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 600, color: "#969cb6" }}>1000 crédits API gratuits</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", columnGap: 5 }}>
                      <TaskAltIcon sx={{ color: "#0056b3" }} />
                      <Typography sx={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 600, color: "#969cb6" }}>Pas de cartes de crédit nécessaires</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} sm={12} md={8} lg={7}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Fade
                  in={true}
                  timeout={{
                    enter: 0, // Enter immediately
                    exit: 5000, // Exit after 5000 milliseconds (adjust as needed)
                  }}
                  style={{
                    animation: animationCSS,
                  }}
                >
                  <img src={DataExtraction} alt="data_extraction" height={600} />
                </Fade>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>

      {/* ++++++++++++++++++++++++++++++++++++++++++ Main Page ++++++++++++++++++++++++++++++++++++++++++ */}
      <Stack>
        {/* ------------------------------------------------ First section ------------------------------------------------ */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", marginBottom: "60px", backgroundColor: "#eef0f6" }}>
          <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: "0 148px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
              <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, width: "700px", lineHeight: "40px", color: "#37446f" }}>Scrapez les données plus rapidement & efficacement</Typography>
              <Typography sx={{ margin: 0, color: "#8087a6", lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", width: "800px", textAlign: "center" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas pharetra convallis posuere morbi leo urna molestie at.</Typography>
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
                  <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
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
                  <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
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
                  <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
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
                  <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
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
                  <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
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
                  <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Aliquam ut porttitor leo a diam sollicitudin tempor id.</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>


        {/* ------------------------------------------------ Second section ------------------------------------------------ */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", marginBottom: "60px", /*backgroundColor: "#e6f1ff"*/backgroundImage: `url('${particlesBg}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: "0 148px" }} spacing={2}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
              <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, width: "700px", lineHeight: "40px", color: "#37446f" }}>Comment ça fonctionne ?</Typography>
              <Typography sx={{ margin: 0, color: "#8087a6", lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", width: "800px", textAlign: "center" }}>{loremText[2]}</Typography>
            </Box>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={6} lg={4}>
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
                  <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>{loremText[1]}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
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
                  <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>{loremText[1]}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
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
                  <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat" }}>{loremText[1]}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>


        {/* ------------------------------------------------ Third section ------------------------------------------------ */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", marginBottom: "60px", backgroundColor: "#eef0f6" }}>
          <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: "0 148px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
              <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, width: "700px", lineHeight: "40px", color: "#37446f" }}>Cas d'utilisation Web Scraping</Typography>
              <Typography sx={{ margin: 0, color: "#8087a6", lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", width: "800px", textAlign: "center" }}>{loremText[3]}</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                  <Stack justifyContent="center" alignItems="center" spacing={1}>
                    <img src={Usecase1} alt="use case" height={200} />
                    <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>Extraction de données</Typography>
                  </Stack>
                  {/* <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: "justify" }}>{loremText[3]}</Typography> */}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                  <Stack justifyContent="center" alignItems="center" spacing={1}>
                    <img src={Usecase2} alt="use case" height={200} />
                    <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>Avis des consommateurs</Typography>
                  </Stack>
                  {/* <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: "justify" }}>{loremText[3]}</Typography> */}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                  <Stack justifyContent="center" alignItems="center" spacing={1}>
                    <img src={Usecase3} alt="use case" height={200} />
                    <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>Veille Concurrentielle</Typography>
                  </Stack>
                  {/* <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: "justify" }}>{loremText[3]}</Typography> */}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                  <Stack justifyContent="center" alignItems="center" spacing={1}>
                    <img src={Usecase4} alt="use case" height={200} />
                    <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>Entreprises & Particuliers</Typography>
                  </Stack>
                  {/* <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: "justify" }}>{loremText[3]}</Typography> */}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                  <Stack justifyContent="center" alignItems="center" spacing={1}>
                    <img src={Usecase5} alt="use case" height={200} />
                    <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>Suivi des Médias Sociaux</Typography>
                  </Stack>
                  {/* <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: "justify" }}>{loremText[3]}</Typography> */}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px" }}>
                  <Stack justifyContent="center" alignItems="center" spacing={1}>
                    <img src={Usecase6} alt="use case" height={200} />
                    <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>Analyse de Marchés</Typography>
                  </Stack>
                  {/* <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", textAlign: "justify" }}>{loremText[3]}</Typography> */}
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>


        {/* ------------------------------------------------ Fourth section ------------------------------------------------ */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0 120px", marginBottom: 0, backgroundColor: "#e6f1ff" }}>
          <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: "0 148px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
              <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, width: "700px", lineHeight: "40px", color: "#37446f" }}>Tarification simple et transparente</Typography>
              <Typography sx={{ margin: 0, color: "#8087a6", lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", width: "800px", textAlign: "center" }}>{loremText[1]}</Typography>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box sx={{ display: "flex", backgroundColor: "#fff", justifyContent: "space-between", gap: 10, alignItems: "center", padding: "2em 1em", marginBottom: "5px", borderRadius: "10px", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)" }}>
                  <Stack spacing="10px" justifyContent="center"alignItems="flex-start">
                    <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>Essayez gratuitement pendant 30 jours</Typography>
                    <Typography sx={{ marginBottom: 0, color: "#8087a6", lineHeight: "26px", fontFamily: "Montserrat", fontSize: "16px" }}>{loremText[2]}</Typography>
                  </Stack>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 15px", borderRadius: "10px", width: "20%", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", cursor: "pointer", transition: ".2s", "&:hover":{backgroundImage: "linear-gradient(to right top, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)"} }}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF", textAlign: "center" }}>Démarrez maintenant</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Box sx={{ display: "flex", padding: "20px 15px", borderRadius: "10px", backgroundColor: "#FFF", flexDirection: "column", justifyContent: "space-between", alignItems: "center", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e6f1ff", borderRadius: "10px", width: "35px", padding: "8px" }}>
                    <img src={Individual_pricing} alt="pricing" style={{ width: "100%", height: "100%" }} />
                  </Box>
                  <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "24px", lineHeight: "32px", fontWeight: 700, marginTop: "20px", marginBottom: "10px", color: "#37446f" }}>Individuel</Typography>
                  <Box sx={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "40px", lineHeight: "54px", fontWeight: 500, paddingRight: "4px", color: "#37446f" }}>Free</Typography>
                    <Typography sx={{ color: "#8087a6", fontFamily: "Montserrat", fontSize: "16px", alignSelf: "flex-end" }}></Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px", marginBottom: "30px", gap: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                      <TaskAltIcon sx={{ color: "#0056b3" }} />
                      <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                    </Box>
                  </Box>
                  <Box component={Button} sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", padding: "10px 15px", marginTop: "34px", width: "100%", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }}>
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
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "40px", lineHeight: "54px", fontWeight: 500, paddingRight: "4px", color: "#37446f" }}>29.99€</Typography>
                    <Typography sx={{ color: "#8087a6", fontFamily: "Montserrat", fontSize: "16px", alignSelf: "flex-end" }}>/mois</Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px", marginBottom: "30px", gap: "4px" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                      <TaskAltIcon sx={{ color: "#0056b3" }} />
                      <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                    </Box>
                  </Box>
                  <Box component={Button} sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", padding: "10px 15px", marginTop: "34px", width: "100%", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }}>
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
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "40px", lineHeight: "54px", fontWeight: 500, paddingRight: "4px", color: "#37446f" }}>59.99€</Typography>
                    <Typography sx={{ color: "#8087a6", fontFamily: "Montserrat", fontSize: "16px", alignSelf: "flex-end" }}>/mois</Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px", marginBottom: "30px", gap: "4px" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 1 }}>
                      <TaskAltIcon sx={{ color: "#0056b3" }} />
                      <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", color: "#969cb6" }}>Description example</Typography>
                    </Box>
                  </Box>
                  <Box component={Button} sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", padding: "10px 15px", marginTop: "34px", width: "100%", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }}>
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
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "40px", lineHeight: "54px", fontWeight: 500, paddingRight: "4px", color: "#37446f" }}>119.99€</Typography>
                    <Typography sx={{ color: "#8087a6", fontFamily: "Montserrat", fontSize: "16px", alignSelf: "flex-end" }}>/mois</Typography>
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
                  <Box component={Button} sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", padding: "10px 15px", marginTop: "34px", width: "100%", borderRadius: "10px", backgroundImage: "linear-gradient(to left bottom, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)", "&: hover":{ backgroundColor: "rgba(0, 0, 0, .1)"}, transition: ".2s" }}>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF" }}>Choisir</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Box>


        {/* ------------------------------------------------ Fifth section ------------------------------------------------ */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", marginBottom: "60px", backgroundImage: "linear-gradient(to right top, #02407e, #0d539c, #1667bb, #1e7cdb, #2491fc)" }}>
          <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: "0 148px" }} spacing={2}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
              <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, width: "700px", lineHeight: "40px", color: "#fff" }}>Solutions de données prêtes à l'emploi</Typography>
              <Typography sx={{ margin: 0, lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", width: "800px", textAlign: "center", color: "#fff" }}>{loremText[1]}</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={4}>
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
              <Grid item xs={12} sm={12} md={6} lg={4}>
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
              <Grid item xs={12} sm={12} md={6} lg={4}>
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
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", backgroundColor: "#eef0f6" }}>
          <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px", margin: "0 148px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px", marginBottom: "60px" }}>
              <Typography variant='h2' sx={{ fontFamily: "Montserrat", marginTop: 0, fontSize: "32px", textAlign: "center", fontWeight: 700, width: "700px", lineHeight: "40px", color: "#37446f" }}>F.A.Q.</Typography>
              <Typography sx={{ margin: 0, color: "#8087a6", lineHeight: "26px", fontSize: "16px", fontFamily: "Montserrat", width: "800px", textAlign: "center" }}>{loremText[1]}</Typography>
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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", padding: "0 16px", margin: "0 148px", width: "100%" }}>
            <Stack>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", lineHeight: "26px", fontWeight: 400 }}>23 Rue Jules Vallès, Villeurbanne - Lyon, France</Typography>
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", lineHeight: "26px", fontWeight: 400 }}>&copy; HKSCRAP. Tous droits réservés.</Typography>
            </Stack>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", lineHeight: "26px", fontWeight: 400, alignSelf: "flex-end" }}>Réalisé par VastoLorde</Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Showcase