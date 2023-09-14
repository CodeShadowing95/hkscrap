import { useState } from "react";
import { Avatar, Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import MenuElement from "./MenuElement";
import { DashboardIcon, EventNoteIcon, HistoryIcon, sub_logo, profileImage, StarIcon, FlashOnIcon, PeopleIcon, AddTaskIcon } from "../utils/constants";
import ErrorMessage from "./ErrorMessage";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const isValidURL = (url) => {
  const urlRegex = /^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)+/i;
  return urlRegex.test(url);
}


const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const [dataSize, setDataSize] = useState(0);

  const initialState = { taskname: '', linkurl: '' }
  const [formData, setFormData] = useState(initialState);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    setDisable(true);
  };


  const handleMenuItemClick = (index) => {
    setActiveItem(index);
    setTimeout(() => {
      // Apply the color change immediately after updating activeBox
      clearTimeout();
    }, 0);
    if(index === 0) {
      navigate('/home');
    }
    else if(index === 1) {
      navigate('/scrapers');
    }
    else if(index === 2) {
      navigate('/history');
    }
    else if(index === 5) {
      navigate('/team');
    } else {
      // Change path to other pages
      navigate('/home');
    }
    setActiveItem(index);
  };

  const handleChange = (e) => {
    if(e.target.name === 'linkurl'){
      const validURL = isValidURL(e.target.value);
      if(!validURL){
        setErrorMessage("L'URL du site web à scraper est invalide");
        setDisable(true);
        return
      }
    }

    if(e.target.name === 'maxDatas'){
      const value = e.target.value;
      // Check if the input is not empty and is a valid positive number
      if (value === '' || (parseFloat(value) >= 0 && !isNaN(value)) || parseFloat(value) < 0) {
        setDataSize(value);
      }
    }
    setDisable(false);
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    handleClose();
    navigate(`/search/?q=${encodeURIComponent(formData.linkurl)}&task=${encodeURIComponent(formData.taskname)}`);
  }

  let username = user[0]?.prenom + " " + user[0]?.nom;
  const len_username = username.length;
  if (len_username > 13) {
    username = username.substr(0, len_username - 2) + ".";
  }

  let elements = [
    { id: 1, icon: DashboardIcon, text: "Dashboard" },
    { id: 2, icon: FlashOnIcon, text: "Scrapers" },
    { id: 3, icon: HistoryIcon, text: "Historique" },
    // { id: 4, icon: ImportExportIcon, text: "Exportation" },
    { id: 5, icon: EventNoteIcon, text: 'Planification'},
    { id: 6, icon: StarIcon, text: "Favoris" },
  ];

  if (user[0]?.role === "Modérateur")
    elements = [...elements, { id: 7, icon: PeopleIcon, text: "Utilisateurs" }];

  return (
    <Stack
      direction="column"
      sx={{
        top: 0,
        height: "100dvh",
        position: "sticky",
        // backgroundColor: "#1F2937",
        backgroundColor: "#eff2f6",
        minWidth: "256px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      {/* General Stack Top */}
      <Stack direction="column" spacing={3} sx={{ width: "100%", paddingTop: "20px" }}>
        {/* Stack logo */}
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "1.75rem",
          }}
        >
          <Link to="/home">
            <img src={sub_logo} alt="logo" height={60} />
          </Link>
        </Stack>

        {/* Utilisateur */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "#F3F7FD",
            borderRadius: "50px",
            width: "13.5rem",
            alignSelf: "center"
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar
              variant="circular"
              src={profileImage}
              sx={{ width: 50, height: 50 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  color: "#152C5B",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  lineHeight: "1.25rem",
                }}
              >
                {username}
              </Typography>
              <Typography
                sx={{
                  color: "#93B0C8",
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  lineHeight: "1.25rem",
                  letterSpacing: "1px",
                }}
              >
                {user[0]?.role === "Modérateur"
                  ? "CEO HKDigitals"
                  : "Utilisateur"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stack fonctionnalités essentielles */}
        <Stack
          direction="column"
          spacing={1}
          sx={{ padding: "1.25rem 0.75rem" }}
        >
          {elements.map((element, index) => (
            <MenuElement
              key={index}
              icon={element.icon}
              text={element.text}
              active={activeItem === index}
              onClick={() => handleMenuItemClick(index)}
            />
          ))}
        </Stack>

        <Stack
          direction="column"
          spacing={1}
          sx={{ padding: "1.25rem 0.75rem" }}
        >
          <Stack justifyContent="center" width="200px" alignItems="center" spacing={2} sx={{ borderRadius: "5px", padding: "10px", /*backgroundColor: "#2e3d52" */backgroundColor: "#FFF",}}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "50px", /*backgroundColor: "#2e3d52",*/backgroundColor: "#FFF", marginTop: "-30px" }}>
              <FlashOnIcon sx={{ fontSize: "25px", color: "#ffa500" }} />
            </div>
            <Typography align="center" sx={{ fontSize: "13px", fontWeight: 300, /*color: "#FFF"*/color: "#2e3d52" }}>Démarrez une <span style={{ fontWeight: "500" }}>nouvelle tâche</span>. Renseignez le nom de la tâche, l'URL du site et lancez l'opération</Typography>
            <Button variant="contained" color="secondary" startIcon={<AddTaskIcon />} size="large" onClick={handleOpen}>Nouvelle tâche</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: "center", fontWeight: 600 }}>
                  Nouvelle tâche
                </Typography>
                <Stack spacing={2} sx={{ margin: "30px 0" }}>
                  <Stack spacing={1}>
                    <Typography sx={{ fontWeight: 500 }}>Nom de la tâche</Typography>
                    {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                    <TextField size="small" name="taskname" onChange={handleChange} fullWidth />
                  </Stack>
                  <Stack spacing={1}>
                    <Typography sx={{ fontWeight: 500 }}>Lien du site à scraper</Typography>
                    {/* <TextField size="small" name="linkurl" required value={searchURL} onChange={(e) => setSearchURL(e.target.value)} fullWidth /> */}
                    <TextField size="small" name="linkurl" required onChange={handleChange} fullWidth />
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                  </Stack>
                  <Stack spacing={1}>
                    <Typography sx={{ fontWeight: 500 }}>Quantité maximum de données</Typography>
                    <TextField type="number" size="small" name="maxDatas" value={dataSize} onChange={handleChange} fullWidth />
                  </Stack>
                </Stack>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: 3 }}>
                  <Button type="submit" disabled={disable} variant="contained" size="large" color="success" onSubmit={handleSubmit}>Démarrer</Button>
                  <Button variant="contained" size="large" color="inherit" onClick={handleClose}>Annuler</Button>
                </Box>
              </Box>
            </Modal>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
