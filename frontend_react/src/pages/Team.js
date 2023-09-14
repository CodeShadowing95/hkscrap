import { Alert, Badge, Box, Breadcrumbs, Button, InputAdornment, Link, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { LightModeIcon, NotificationsNoneIcon, PersonAddIcon, SearchIcon } from '../utils/constants'
import TableUsers from '../components/TableUsers'
import ErrorMessage from '../components/ErrorMessage'


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

// const customNumberField = {
//   '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
//     '-webkit-appearance': 'none',
//     margin: 0,
//   },
//   '& input[type="number"]': {
//     '-moz-appearance': 'textfield',
//   },
// };

const isValidEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/gmi;
  return emailRegex.test(email);
}

const Team = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [teams, setTeams] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    setDisable(true);
  };

  const initialState = { lastname: '', firstname: '', country: '', email: '', telephone: '' }
  const [formData, setFormData] = useState(initialState);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");

  const [state, setState] = useState({
    isOpen: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, isOpen } = state;

  const closeAlert = () => setState({...state, isOpen: false})

  const addMember = (newState) => async () => {
    try {
      const response = await fetch('http://localhost:8000/new-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add user.');
      }
  
      const data = await response.json();
      // console.log(data);
      setMessage('Nouveau membre ajouté à l\'équipe!');
      setState({ ...newState, isOpen: true });
      return data; // The response data from the server
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const createMember = addMember(state);

    createMember()
    .then((data) => {
      if(data){
        // console.log(data);
        setTeams([...teams, {NOM: data?.lastname, PRENOM: data?.firstname, PAYS: data?.country, EMAIL: data?.email, TELEPHONE: data?.telephone, ROLE: data?.role}]);
      }
    })
    .catch((error) => console.error("Une erreur est survenue: ", error))
    handleClose();
  }

  const onDelete = (id) => {
    const updatedData = teams.filter((member) => member.USER_ID !== id);
    setTeams(updatedData);
    setMessage('Utilisateur supprimé');
    setState({...state, isOpen: true});
  }

  const handleChange = (e) => {
    if(e.target.name === "email"){
      const validEmail = isValidEmail(e.target.value);
      if(!validEmail) {
        setErrorMessage("Veuillez saisir une adresse mail valide");
        setDisable(true);
        return
      }
    }
    setDisable(false);
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleFilterChange = (e) => {
    setFilterTerm(e.target.value);
  }

  const filterTeamsByTerm = teams.filter((item) => (
    item?.NOM.toLowerCase().includes(filterTerm.toLowerCase()) ||
    item?.PRENOM.toLowerCase().includes(filterTerm.toLowerCase()) ||
    item?.EMAIL.toLowerCase().includes(filterTerm.toLowerCase()) ||
    // item?.TELEPHONE.toLowerCase().includes(filterTerm.toLowerCase()) ||
    item?.PAYS.toLowerCase().includes(filterTerm.toLowerCase())
  ));

  useEffect(() => {
    try {
      fetch('http://localhost:8000/get-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(async (response) => {
        if(!response.ok) throw new Error('Some problems encountered while processing the server')

        const responseData = await response.json();
        setTeams(responseData.data);
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: "1rem 2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em", width: "100%" }}>
        {/* Title & Breadcrumb */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B" }}>Utilisateurs</Typography>
          {/* Breadcrumb */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/home">
              Accueil
            </Link>
            <Typography color="#93B0C8">Utilisateurs</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      {/* Success message */}
      {message !== "" &&
        <Box sx={{ width: 500, padding: "20px", zIndex: 10000 }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={isOpen}
            onClose={closeAlert}
            autoHideDuration={6000}
            // message={message}
            key={vertical + horizontal}
          >
            <Alert variant='filled' severity="success" onClose={closeAlert} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </Box>
      }

      <Box sx={{ marginTop: "1rem" }}>
        <Stack alignItems="center" padding="20px" border="1px solid #e1e1e1" borderRadius="10px" sx={{ backgroundColor: "#FFF" }} spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", columnGap: "10px", width: "100%" }}>
            <TextField
              placeholder='Rechercher...'
              size='small'
              type='search'
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
              }}
              value={filterTerm}
              onChange={handleFilterChange}
            />
            <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleOpen}>Nouveau membre</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: "center", fontWeight: 600 }}>
                  Nouveau membre
                </Typography>
                <Stack spacing={2} sx={{ margin: "30px 0" }}>
                  <Stack spacing={1}>
                    <Typography sx={{ fontWeight: 500 }}>Nom(s)</Typography>
                    <TextField type="text" name="lastname" required size="small" onChange={handleChange} fullWidth />
                  </Stack>
                  <Stack spacing={1}>
                    <Typography sx={{ fontWeight: 500 }}>Prénom(s)</Typography>
                    <TextField type="text" name="firstname" required size="small" onChange={handleChange} fullWidth />
                  </Stack>
                  <Stack spacing={1}>
                    <Typography sx={{ fontWeight: 500 }}>Pays</Typography>
                    <TextField type="text" name="country" required size="small" onChange={handleChange} fullWidth />
                  </Stack>
                  <Stack spacing={1}>
                    <Typography sx={{ fontWeight: 500 }}>Email</Typography>
                    <TextField type="email" name="email" required size="small" onChange={handleChange} fullWidth />
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                  </Stack>
                  <Stack spacing={1}>
                    <Typography sx={{ fontWeight: 500 }}>Téléphone</Typography>
                    <TextField type="text" name="telephone" size="small" onChange={handleChange} fullWidth />
                  </Stack>
                </Stack>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: 3 }}>
                  <Button disabled={disable} type="submit" variant="contained" size="large" color="success" onSubmit={handleSubmit}>Ajouter</Button>
                  <Button variant="contained" size="large" color="inherit" onClick={handleClose}>Annuler</Button>
                </Box>
              </Box>
            </Modal>
          </Box>
          {!filterTerm ? <TableUsers datas={teams} onDelete={onDelete} /> :
            filterTeamsByTerm.length > 0 && <TableUsers datas={filterTeamsByTerm} onDelete={onDelete} />
          }
        </Stack>
      </Box>
    </Box>
  )
}

export default Team