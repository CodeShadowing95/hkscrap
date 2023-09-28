import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchFromServer } from "../utils/fetchFromServer";
import { Alert, Avatar, Box, Breadcrumbs, Button, Grid, Snackbar, Stack, TextField, Typography, Tab} from "@mui/material";
import { TabContext, TabList, TabPanel  }  from '@mui/lab';
import { profileImage } from "../utils/constants";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const initialState = { lastname: user[0]?.nom, firstname: user[0]?.prenom, country: user[0]?.pays, email: user[0]?.email, phone: user[0]?.telephone }
  const [formData, setFormData] = useState(initialState);

  const initialPasswordState = { oldpassword: '', newpassword: '' };
  const [credential, setCredential] = useState(initialPasswordState);

  const [message, setMessage] = useState('');
  const [state, setState] = useState({
    isOpen: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, isOpen } = state;

  const closeAlert = () => setState({...state, isOpen: false})

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // localStorage.setItem('user', JSON.stringify(formData));
  }

  const editProfile = (newState) => async () => {
    try {
      const { email } = user[0];
      fetchFromServer('get-user', { email })
      .then(async (res) => {
        const result = await res?.data;
        if(result) {
          if(result[0]?.user_id) {
            try {
              const profile = result[0]?.user_id;
              // console.log(profile);
              const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/edit-profile/${profile}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });

              if(!response?.ok){
                throw new Error('Le profil n\'a pas pu être mis à jour');
              }

              const responseData = await response.json();
              setMessage('Votre profil a été mis à jour');
              setState({ ...newState, isOpen: true });
              if(responseData){
                const currentUser = JSON.parse(localStorage.getItem('user'));
                currentUser[0].email = formData.email;
                currentUser[0].nom = formData.lastname;
                currentUser[0].pays = formData.country;
                currentUser[0].prenom = formData.firstname;
                currentUser[0].telephone = formData.phone;
        
                const updatedCurrentUser = JSON.stringify(currentUser);
                // console.log(data);
                localStorage.setItem('user', updatedCurrentUser);
                window.location.reload();
              }
            } catch (error) {
              console.error('Error when updating the profile:', error);
              throw error;
            }
          } else {
            alert('Undefined');
          }
        }
      })
    } catch (error) {
      console.error('Error fetching the user id:', error);
      throw error;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateProfile = editProfile(state);
    updateProfile()
    .catch((error) => console.error("Une erreur est survenue: ", error))
  }

  const handleChangePassword = () => {

  }

  const handleRadioChange = () => {

  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: "1rem 2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em", width: "100%" }}>
        {/* Title & Breadcrumb */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B", fontFamily: "Montserrat" }}>Informations de compte</Typography>
          {/* Breadcrumb */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/home" fontFamily="Montserrat">
              Accueil
            </Link>
            <Typography color="#93B0C8" fontFamily="Montserrat">Profil</Typography>
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

      {/*  */}
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Profil" value="1" />
              <Tab label="Sécurité" value="2" />
              <Tab label="Paramètres" value="3" />
            </TabList>
          </Box>
          {/* Panel Informations de profil */}
          <TabPanel value="1">
            <Box component="form" sx={{ marginTop: "1rem" }} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <Stack sx={{ boxShadow: "0px 5px 10px 1px #D5D5D5" }}>
                    {/* Title */}
                    <Box sx={{ display: "flex", padding: "20px", borderBottom: "1px solid #e1e1e1", backgroundColor: "#F8F8F9" }}>
                      <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#187bcd" }}>Photo de Profil</Typography>
                    </Box>
                    {/* Avatar */}
                    <Stack justifyContent="center" alignItems="center" spacing={3} sx={{ backgroundColor: "#FFF", padding: "1.35rem" }}>
                      <Avatar alt="user avatar" src={profileImage} sx={{ height: "160px", width: "160px" }} />
                      <Typography variant="body1" sx={{ fontSize: "1rem", fontWeight: 300, color: "#B2B2B8", marginBottom: "16px" }}>
                        JPG ou PNG ne dépassant pas 5 MB
                      </Typography>
                      <Button variant="contained" color="primary" size="large">Changer de profil</Button>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                  <Stack sx={{ boxShadow: "0px 5px 10px 1px #D5D5D5" }}>
                    {/* Title */}
                    <Box sx={{ display: "flex", padding: "20px", borderBottom: "1px solid #e1e1e1", backgroundColor: "#F8F8F9" }}>
                      <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#187bcd" }}>Détails du compte</Typography>
                    </Box>
                    <Stack sx={{ backgroundColor: "#FFF", padding: "1.35rem" }}>
                      <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography sx={{ fontWeight: 400 }}>Nom d'utilisateur (Le nom qui apparaîtra sur votre profil)</Typography> */}
                          {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                          {/* <TextField size="small" name="username" fullWidth />
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography sx={{ fontWeight: 400, color: "#69707A" }}>Nom(s)</Typography>
                          {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                          <TextField size="medium" name="lastname" fullWidth value={formData.lastname} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography sx={{ fontWeight: 400, color: "#69707A" }}>Prénom(s)</Typography>
                          {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                          <TextField size="medium" name="firstname" fullWidth value={formData.firstname} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography sx={{ fontWeight: 400, color: "#69707A" }}>Téléphone</Typography>
                          {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                          <TextField size="medium" name="phone" fullWidth value={formData.phone} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography sx={{ fontWeight: 400, color: "#69707A" }}>Pays</Typography>
                          {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                          <TextField size="medium" name="country" fullWidth value={formData.country} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography sx={{ fontWeight: 400, color: "#69707A" }}>Adresse mail</Typography>
                          {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                          <TextField size="medium" name="email" fullWidth value={formData.email} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} sm={5} md={5} lg={5}>
                          <Button type="submit" variant="contained" size="large" color="success" sx={{ marginTop: "20px" }}>Modifier</Button>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          {/* Panel Securité */}
          <TabPanel value="2">
            <Box component="form" sx={{ marginTop: "1rem" }} onSubmit={handleChangePassword}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                  <Stack sx={{ boxShadow: "0px 5px 10px 1px #D5D5D5" }}>
                    {/* Title */}
                    <Box sx={{ display: "flex", padding: "20px", borderBottom: "1px solid #e1e1e1", backgroundColor: "#F8F8F9" }}>
                      <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#187bcd" }}>Modifier le mot de passe</Typography>
                    </Box>
                    <Stack sx={{ backgroundColor: "#FFF", padding: "1.35rem" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography sx={{ fontSize: "1.05em", fontWeight: 400, color: "#69707A" }}>Mot de passe actuel</Typography>
                          {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                          <TextField type="password" size="medium" name="oldpassword" fullWidth value={formData.lastname} onChange={handleChangePassword} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography sx={{ fontSize: "1.05em", fontWeight: 400, color: "#69707A" }}>Nouveau mot de passe</Typography>
                          {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                          <TextField type="password" size="medium" name="newpassword" fullWidth value={formData.firstname} onChange={handleChangePassword} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography sx={{ fontSize: "1.05em", fontWeight: 400, color: "#69707A" }}>Confirmez le mot de passe</Typography>
                          {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                          <TextField type="password" size="medium" name="confirmpassword" fullWidth value={formData.phone} onChange={handleChangePassword} />
                        </Grid>
                        <Grid item xs={12} sm={5} md={5} lg={5}>
                          <Button type="submit" variant="contained" size="large" color="success" sx={{ marginTop: "20px" }}>Enregistrer</Button>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <Stack sx={{ boxShadow: "0px 5px 10px 1px #D5D5D5" }}>
                    {/* Title */}
                    <Box sx={{ display: "flex", padding: "20px", borderBottom: "1px solid #e1e1e1", backgroundColor: "#F8F8F9" }}>
                      <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#187bcd" }}>Authentification à 2 facteurs</Typography>
                    </Box>
                    {/* Avatar */}
                    <Stack justifyContent="center" spacing={7} sx={{ backgroundColor: "#FFF", padding: "1.35rem" }}>
                      <Typography variant="body1" sx={{ fontSize: "1.1rem", fontWeight: 300, color: "#69707A" }}>
                        Ajoutez un niveau de sécurité supplémentaire à votre compte en activant l'authentification à deux facteurs. 
                        Nous vous enverrons un message texte pour vérifier vos tentatives de connexion sur des appareils et des navigateurs non reconnus.
                      </Typography>
                      <Stack spacing={3}>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography sx={{ fontWeight: 400, color: "#69707A" }}>Numéro de téléphone</Typography>
                            {/* <TextField size="small" name="taskname" value={taskName} onChange={(e) => setTaskName(e.target.value)} fullWidth /> */}
                            <TextField placeholder="Ex: 07 21 96 21 81" size="small" name="sms_number" fullWidth />
                          </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" size="large">Poursuivre</Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value="3">Section indisponible pour le moment</TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}

export default Profile