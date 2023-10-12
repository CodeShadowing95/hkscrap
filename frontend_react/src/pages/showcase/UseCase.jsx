import { Button, Stack, Typography } from "@mui/material"


const UseCase = ({ useCaseIcon, title, labelId, description }) => {
  return (
    <Stack padding="20px" margin="10px 0" sx={{ backgroundColor: "#FFF", boxShadow: "0px 0px 20px 7px rgba(0, 86, 179, .1)", borderRadius: "5px", rowGap: "20px", position: "relative", overflow: "hidden", [`&:hover #${labelId}`]: { display: "flex" } }}>
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <img src={useCaseIcon} alt="use case" height={200} />
        <Typography variant='h3' sx={{ fontFamily: "Montserrat", fontSize: "20px", lineHeight: "30px", fontWeight: 700, color: "#37446f" }}>{title}</Typography>
      </Stack>
      <Stack id={labelId} sx={{ display: "none", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, .8)", borderRadius: "5px", zIndex: 100, padding: "25px", justifyContent: "center", alignItems: "center" }} spacing={2}>
        <Typography sx={{ marginBottom: 0, color: "#FFF", lineHeight: "26px", fontFamily: "Montserrat", textAlign: "justify" }}>{description}</Typography>
        <Button variant='contained' color='info' size='large' sx={{ width: "50%" }}>En savoir plus</Button>
      </Stack>
    </Stack>
  )
}

export default UseCase