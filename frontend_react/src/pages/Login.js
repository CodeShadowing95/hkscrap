import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchFromServer } from "../utils/fetchFromServer";

import { Box, Button, Stack, Typography } from "@mui/material"
import { BG_Login, ErrorIcon, logo, particlesBg, scene, sunflowerBg } from "../utils/constants";
import Input from "../components/Input";
import { ErrorMessage } from "../components";


const Login = () => {
  const initialState = { email_username: '', password: '' };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    fetchFromServer('login', formData)
    .then((res) => {
      if(res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/home');
      } else {
        setMessage('Email ou mot de passe incorrects')
      }
    })
    .catch((err) => {
      setMessage('Email ou mot de passe incorrects');
    });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleShowPassword = () => setShowPassword((seePassword) => !seePassword);

  // const switchMode = () => {
  //   setIsSignUp((signedUp) => !signedUp);
  //   setShowPassword(false);
  // }



  return (
    <Stack sx={{ top: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100dvh", backgroundImage: `url('${BG_Login}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url('${sunflowerBg}')`, backgroundSize: "cover", backgroundPosition: "center", width: "30rem", borderRadius: "20px 0 0 20px", padding: "60px" }}>
          <Stack justifyContent="center" alignItems="center" component="form" padding="20px" onSubmit={handleSubmit} spacing={8} width="100%">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5, width: "80%" }}>
              <Typography variant="h1" sx={{ fontSize: "2.5em", fontWeight: "600", color: "#152C5B" }}>Connexion</Typography>
              <Stack spacing="20px" width="100%">
                {message !== '' && <ErrorMessage message={message} />}
                {/* {isSignUp && (
                  <>
                    {message !== '' && (
                      <div style={{ backgroundColor: "red", padding: "5px", borderRadius: "10px", color: "#FFF" }}>
                        <Typography>{message}</Typography>
                      </div>
                    )}
                    <Input name="lastname" label="Nom(s)" handleChange={handleChange} type="text" />
                    <Input name="firstname" label="Prénom(s)" handleChange={handleChange} type="text" />
                  </>
                )} */}
                <Input name="email_username" label="Email ou nom d'utilisateur" handleChange={handleChange} type="email" />
                <Input name="password" label="Mot de passe" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                {/* {isSignUp && <Input name="confirmPassword" label="Confirmer le mot de passe" handleChange={handleChange} type="password" />} */}
              </Stack>
            </Box>
            <Button type="submit" variant="contained" size="large" sx={{ width: "50%" }} onSubmit={handleSubmit}>S'identifier</Button>
            {/* <Button onClick={switchMode}>{isSignUp ? 'Déjà utilisateur ?' : 'Nouvel Utilisateur ?'}</Button> */}
          </Stack>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "20px", backgroundImage: `url('${scene}')`, backgroundSize: "cover", backgroundPosition: "center", width: "20rem", borderRadius: "0 20px 20px 0" }}>
          <img src={logo} alt="scene-haikei" height="40%" />
        </Box>
      </Box>
    </Stack>
  )
}

export default Login