import { Typography } from "@mui/material"
import { ErrorIcon } from "../utils/constants"

const ErrorMessage = ({ message }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", backgroundColor: "#D32F2F", padding: "10px", borderRadius: "5px", color: "#FFF", columnGap: "5px", marginBottom: "10px" }}>
      <ErrorIcon />
      <Typography>{message}</Typography>
    </div>
  )
}

export default ErrorMessage