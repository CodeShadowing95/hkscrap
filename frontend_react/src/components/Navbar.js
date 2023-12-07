import { useState } from "react";
import { Badge, Box, Button, InputAdornment, Modal, Stack, TextField, Typography } from "@mui/material"
import { MenuIcon, NotificationsNoneIcon, SearchIcon } from "../utils/constants"
import { DropdownProfile, ErrorMessage } from ".";
import { useTheme } from "./ThemeProvider";
import { useNavigate } from "react-router-dom";


const isValidURL = (url) => {
  const urlRegex = /^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)+/i;
  return urlRegex.test(url);
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Navbar = ({ onMenuOnclick }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const [dataSize, setDataSize] = useState(0);

  const { theme, /*toggleDarkMode*/ } = useTheme();

  const initialState = { taskname: "", linkurl: "" };
  const [formData, setFormData] = useState(initialState);

  const [open, setOpen] = useState(false);



  // const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    setDisable(true);
  };

  const changeChevron = () => {
    onMenuOnclick();
  }

  // const changeContrast = () => {
  //   toggleDarkMode();
  // }

  const handleChange = (e) => {
    if (e.target.name === "linkurl") {
      const validURL = isValidURL(e.target.value);
      if (!validURL) {
        setErrorMessage("L'URL du site web à scraper est invalide");
        setDisable(true);
        return;
      }
    }

    if (e.target.name === "maxDatas") {
      const value = e.target.value;
      // Check if the input is not empty and is a valid positive number
      if (
        value === "" ||
        (parseFloat(value) >= 0 && !isNaN(value)) ||
        parseFloat(value) < 0
      ) {
        setDataSize(value);
      }
    }
    setDisable(false);
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleClose();
    navigate(
      `/search/?q=${encodeURIComponent(
        formData.linkurl
      )}&task=${encodeURIComponent(formData.taskname)}`
    );
  };

  return (
    <Box sx={{ padding: "10px 20px 10px 5px", backgroundColor: theme === "light" ? "#F0F2F7" : "#253c5c", position: "sticky", top: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Searchbar */}
        <Box sx={{ display: "flex", alignItems: "center", width: "40%", columnGap: 1 }}>
          <Box sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" }, justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "50px", cursor: "pointer", transition: "0.2s", "&:hover": {backgroundColor: theme === "light" ? "#e1e1e1" : "rgba(255, 255, 255, .1)"} }} onClick={changeChevron}>
            {onMenuOnclick && <MenuIcon sx={{ fontSize: '20px', /*color: "#FFF"*/color: theme === "light" ? "#2e3d52" : "#88a9c3" }}  />}
          </Box>
          <Box sx={{ marginLeft: { xs: "15px", sm: "15px", md: "15px", lg: 0 } }}>
            <TextField
              type='search'
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  height: "2.5rem",
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  backgroundColor: theme === 'light' ? "#FFF" : "rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  color: theme === "light" ? "none" : "#adadad",
                  border: theme === "light" ? "none" : "1px solid #b3b3b3",
                },
                '& .MuiOutlinedInput-input': {
                  borderRadius: '0', // Reset border-radius for the inner input
                },
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start" sx={{ color: theme === "light" ? "none" : "#adadad" }}><SearchIcon /></InputAdornment>
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: 2 }}>
          {/* {theme === 'light' ?
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer" }} onClick={changeContrast}>
              <DarkModeIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
            </div>
            :
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer" }} onClick={changeContrast}>
              <LightModeIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
            </div>
          } */}

          {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", cursor: "pointer", }}>
            <LanguageIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
          </div> */}

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8" }}>
            <Badge color="error" variant="dot" overlap="circular">
              <NotificationsNoneIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
            </Badge>
          </div>

          <DropdownProfile />


          {/* Modal for new task */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                sx={{ textAlign: "center", fontWeight: 600 }}
              >
                Nouvelle tâche
              </Typography>
              <Stack spacing={2} sx={{ margin: "30px 0" }}>
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 500 }}>
                    Nom de la tâche
                  </Typography>
                  {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                  <TextField
                    size="small"
                    name="taskname"
                    onChange={handleChange}
                    fullWidth
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 500 }}>
                    Lien du site à scraper
                  </Typography>
                  {/* <TextField size="small" name="linkurl" required value={searchURL} onChange={(e) => setSearchURL(e.target.value)} fullWidth /> */}
                  <TextField
                    size="small"
                    name="linkurl"
                    required
                    onChange={handleChange}
                    fullWidth
                  />
                  {errorMessage && <ErrorMessage message={errorMessage} />}
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 500 }}>
                    Quantité maximum de données
                  </Typography>
                  <TextField
                    type="number"
                    size="small"
                    name="maxDatas"
                    value={dataSize}
                    onChange={handleChange}
                    fullWidth
                  />
                </Stack>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  gap: 3,
                }}
              >
                <Button
                  type="submit"
                  disabled={disable}
                  variant="contained"
                  size="large"
                  color="success"
                  onSubmit={handleSubmit}
                >
                  Démarrer
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="inherit"
                  onClick={handleClose}
                >
                  Annuler
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar