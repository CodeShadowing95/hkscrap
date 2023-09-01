import { Box, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { KeyboardDoubleArrowRightIcon } from '../utils/constants';

const Template = ({ logo, name, customBg }) => {
  const Company = logo;
  const id = name ? name.trim().toLowerCase() : '';

  return (
    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1.5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px',
        textDecoration: 'none',
        backgroundImage: customBg ? "linear-gradient(to right, #467fb1 13% 13%, #abd59d 50%, #f9a8a9 93% 93%)" : "none",
        backgroundColor: !customBg && "#FFF",
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem"
      }}
    >
      {customBg ?
        <>
          <div style={{ fontSize: "30px" }}>🤔</div>
          <Typography variant='h1' sx={{ fontSize: "1.875rem", fontWeight: 600, lineHeight: 1, color: "#FFF" }}>Besoin de scraper un site en particulier ?</Typography>
          <Typography variant='body1' sx={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: "1.25rem", color: "#FFF" }}>Incididunt eiusmod elit cillum aliqua officia reprehenderit. Deserunt excepteur aliquip ullamco dolore nulla ullamco consectetur consequat culpa.</Typography>
        </>
        :
        <>
          <Box sx={{
            display: "inline-block",
            width: "3rem",
            height: "3rem"}}
          >
            <img src={Company} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} />
          </Box>
          <Typography variant="h5" sx={{ fontSize: "1rem", lineHeight: "1.25rem", fontWeight: 700, textTransform: "capitalize", color: "#474747" }}>{name} scraper</Typography>
          <Typography variant='body1' sx={{ fontSize: "0.875rem", lineHeight: "1.25rem", color: "#6b7280" }}>Incididunt eiusmod elit cillum aliqua officia reprehenderit. Deserunt excepteur aliquip ullamco dolore nulla ullamco consectetur consequat culpa.</Typography>
          <Box sx={{
            padding: "5px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
            backgroundColor: "#22C55E",
            gap: "5px",
            color: "#FFF",
            borderRadius: "5px",
            textDecoration: 'none',
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "#16833e",
            }
          }}
          component={Link}
          to={`/socialMedia/${id}`} key={`${id}`}
          >
            <Typography sx={{ fontSize: "1em", fontWeight: "500" }}>Accéder</Typography>
            <KeyboardDoubleArrowRightIcon />
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