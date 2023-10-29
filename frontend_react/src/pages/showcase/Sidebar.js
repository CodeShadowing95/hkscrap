import { Box } from "@mui/material"

const Sidebar = ({ display }) => {
  return (
    <Box sx={{ position: "absolute", top: 0, left: display === "true" ? 0 : '-100%', height: "100dvh", width: "50%", backgroundColor: "#fff", zIndex: 10, padding: "1.5rem", display: "none" }}></Box>
  )
}

export default Sidebar