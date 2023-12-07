import { Link, Stack, Typography } from "@mui/material"

const MenuElement = ({ icon, text, active, menuVisible, onClick }) => {
  const Tag = icon;
  const id = text.trim().toLowerCase();

  const browse = (id) => {
    if(id === 'dashboard') {
      return '/home';
    }
    else if(id === 'scrapers') {
      return '/scrapers';
    }
    else if(id === 'historique') {
      return '/history';
    }
    else if(id === 'utilisateurs') {
      return '/team';
    } else if(id === 'paramètres') {
      return '/settings';
    } else {
      // Change path to other pages
      return '/home';
    }
  }

  return(
    <Link component="div" href={browse(id)} onClick={onClick} sx={{ textDecoration: "none" }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: menuVisible ? "flex-start" : "center",
          alignItems: "center",
          gap: "0.75rem",
          textDecoration: 'none',
          backgroundColor: active === true ? "#187bcd" : "none",
          padding: "0.75rem",
          borderRadius: "0.375rem",
          "&:hover": {
            backgroundColor: "#48a1ea",
            "& > *": {
              color: "#FFF",
            },
          },
          cursor: "pointer",
          transition: "0.2s"
        }}
      >
        <Tag sx={{ fontSize: menuVisible ? "20px" : "25px", color: active === true ? '#FFF' : '#5585aa' }} />
        {menuVisible && <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", fontWeight: 500, color: active === true ? '#FFF' : '#5585aa' }}>{text}</Typography>}
      </Stack>
    </Link>
  )
}

export default MenuElement