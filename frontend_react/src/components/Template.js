import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ArrowOutwardIcon, FlashOnIcon, KeyboardDoubleArrowRightIcon, loremText } from '../utils/constants';

const Template = ({ logo, name, customBg, customEmoji, customTitle, customText }) => {
  const Company = logo;
  // const id = name ? name.trim().toLowerCase() : '';

  return (
    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2} component={!customBg && Link} to={!customBg && "/notyet"}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem',
        textDecoration: 'none',
        backgroundImage: customBg ? "linear-gradient(to right top, #e1e1e1, #e2e2e4, #e3e4e8, #e4e5eb, #e4e7ef)" : "none",
        backgroundColor: !customBg && "#FFF",
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem",
        boxShadow: customBg ? 2 : "none",
      }}
    >
      {customBg ?
        <>
          <div style={{ fontSize: "30px" }}>{!customEmoji ? "🤔" : "✨"}</div>
          <Typography variant='h1' sx={{ fontSize: "1.875rem", fontWeight: 600, lineHeight: 1, color: !customBg ? "#FFF" : "#333333", fontFamily: "Montserrat" }}>{!customTitle ? 'Besoin de scraper un site en particulier ?' : 'Besoin d\'aide ?'}</Typography>
          {!customText ?
            <Typography variant='body1' sx={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: "1.25rem", color: !customBg ? "#FFF" : "#333333", fontFamily: "Montserrat" }}>{loremText[2]}</Typography>
            :
            <>
            <Typography variant='body1' sx={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: "1.25rem", color: !customBg ? "#FFF" : "#333333", fontFamily: "Montserrat" }}>
              Nous avons des suggestions sur comment améliorer votre expérience utilisateur sur notre solution révolutionnaire. Voici quelques idées...
            </Typography>
            <Button variant='contained' size='small' endIcon={<ArrowOutwardIcon />}>Lire plus</Button>
            </>
          }
        </>
        :
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{
              display: "inline-block",
              width: "3rem",
              height: "3rem"}}
            >
              <img src={Company} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} />
            </Box>
            <Typography variant="h5" sx={{ fontSize: "1rem", lineHeight: "1.25rem", fontWeight: 700, textTransform: "capitalize", color: "#474747", fontFamily: "Montserrat" }}>{name} scraper</Typography>
          </Box>
          <Typography variant='body1' sx={{ fontSize: "0.875rem", lineHeight: "1.25rem", color: "#6b7280", fontFamily: "Montserrat" }}>Incididunt eiusmod elit cillum aliqua officia reprehenderit. Deserunt excepteur aliquip ullamco dolore nulla ullamco consectetur consequat culpa.</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{
              padding: "5px 10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#22C55E",
              color: "#FFF",
              borderRadius: "5px",
              textDecoration: 'none',
              cursor: "pointer",
              transition: "0.2s",
              // "&:hover": {
              //   backgroundColor: "#16833e",
              // }
            }}
            // to={`/socialMedia/${id}`} key={`${id}`}
            >
              <Typography sx={{ fontSize: "15px", fontWeight: "700", fontFamily: "Montserrat" }}>Free</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "5px" }}>
              <FlashOnIcon sx={{ fontSize: "20px", color: "#555555" }} />
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>0</Typography>
            </Box>
          </Box>
        </>
      }
      {/* <Box sx={{
        display: "inline-block",
        justifyContent: "center",
        alignItems: "center",
        width: "5rem",
        height: "5rem"}}
      >
        <img src={Company} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} />
      </Box>
      <Typography sx={{ fontSize: "16px", textAlign: "center" }}>{name}</Typography> */}
    </Stack>
  )
}

export default Template