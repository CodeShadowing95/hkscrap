import { Typography } from "@mui/material"
import { TaskAltIcon } from "../utils/constants"
import { useEffect } from "react";

const SuccessMessage = ({ message, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onHide]);

  return (
    <div style={{ display: "flex", alignItems: "center", backgroundColor: "#4E9A51", padding: "10px", borderRadius: "5px", color: "#FFF", columnGap: "5px", marginBottom: "10px" }}>
      <TaskAltIcon />
      <Typography>{message}</Typography>
    </div>
  )
}

export default SuccessMessage