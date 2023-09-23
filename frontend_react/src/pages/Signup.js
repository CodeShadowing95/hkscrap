import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs";

import { fetchFromServer } from "../utils/fetchFromServer";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { BG_Login, GoogleAuth, logo } from "../utils/constants";
import { ErrorMessage } from "../components";


const Signup = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const initialState = { email: '', password: '', confirmPassword: '' };
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword) {
      setMessage('Les mots de passe ne sont pas identiques!');
      return;
    }

    const email = formData.email;
    try {
      await fetch(`${process.env.REACT_APP_BASE_API_URL}/unique-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }),
      })
      .then(async (response) => {
        if(!response.ok) throw new Error('Error when requesting some datas')

        const result = await response.json();
        if(result[0]?.doublons === 0) {
          try {
            const hashedPassword = await bcrypt.hash(formData.password, 10);
            formData.password = hashedPassword;
            formData.confirmPassword = '';
          } catch (error) {
            console.error('Error hashing password:', error);
          }
      
          fetchFromServer('register', formData)
          .then((res) => {
            if(res.data) {
              navigate('/auth?successSignup=Inscription effectuée.%20Connectez-vous!');
            } else {
              setMessage('Erreur lors de l\'enregistrement');
            }
          })
          .catch((err) => {
            setMessage('Inscription échouée. Veuillez réessayer.');
          });
        } else {
          setMessage('Impossible: Utilisateur déjà inscrit!');
        }
      })
    } catch (error) {
      console.error("Erreur lors de la récupération de données", error);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const toSignin = () => {
    navigate("/auth");
  }

  // const handleShowPassword = () => {
  //   if(typeInput === "text"){
  //     setTypeInput("password");
  //   } else {
  //     setTypeInput("text");
  //   }
  // }

  useEffect(() => {
    if(user) {
      navigate("/home")
    } else {
      navigate("/signup")
    }

  }, [navigate, user]);



  return (
    <Box sx={{ display: "grid", flexDirection: "column", placeContent: "center", height: "100dvh", width: "100%", backgroundImage: `url('${BG_Login}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <Stack component="form" sx={{ maxWidth: "24rem", gap: "1.75rem", borderRadius: "5px", padding: "2.5rem", textAlign: "center", /*backgroundImage: `url('${sunflowerBg}')`, backgroundSize: "cover", backgroundPosition: "center"*/backgroundColor: "#FFF" }} onSubmit={handleSubmit}>
        <Stack alignItems="center">
          <img src={logo} alt="HKSCRAP_logo" style={{ borderStyle: "none", display: "block", verticalAlign: "middle", maxWidth: "100%" }} height={80} />
        </Stack>
        <Stack spacing="0.5rem">
          <Typography variant="h1" sx={{ fontFamily: "Montserrat", color: "#37446f", fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 700 }}>Rejoignez la communauté</Typography>
          {/* <Typography sx={{ fontFamily: "Montserrat", fontSize: "0.875rem", fontWeight: 600, color: "#969cb6" }}>Inscrivez-vous dès maintenant pour accéder aux outils et aux ressources dont vous avez besoin pour explorer le monde des données sur le web.</Typography> */}
          <Typography sx={{ fontFamily: "Montserrat", fontSize: "0.875rem", fontWeight: 600, color: "#969cb6" }}>Découvrez le scraping de données en toute simplicité : Inscrivez-vous dès maintenant !</Typography>
        </Stack>
        <Stack spacing="1rem" textAlign="left" minWidth="300px">
          {message !== '' && <ErrorMessage message={message} />}
          <TextField required type="email" size="small" placeholder="Email" name="email" sx={{ display: "flex", width: "100%", fontFamily: "Montserrat", height: "2.5rem", borderRadius: "0.375rem", fontSize: ".875rem", lineHeight: "1.25rem" }} onChange={handleChange} />
          <TextField required type="password" size="small" placeholder="Mot de passe" name="password" sx={{ display: "flex", width: "100%", fontFamily: "Montserrat", height: "2.5rem", borderRadius: "0.375rem", fontSize: ".875rem", lineHeight: "1.25rem" }} onChange={handleChange} />
          <TextField required type="password" size="small" placeholder="Confirmez le mot de passe" name="confirmPassword" sx={{ display: "flex", width: "100%", fontFamily: "Montserrat", height: "2.5rem", borderRadius: "0.375rem", fontSize: ".875rem", lineHeight: "1.25rem" }} onChange={handleChange} />
          <Box component={Button} type="submit" sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e6e6e6", padding: "10px 15px", cursor: "pointer", textDecoration: "none", borderRadius: "10px", backgroundColor: "#0056b3", transition: ".2s" }} onSubmit={handleSubmit}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 700, color: "#FFF", textTransform: "uppercase" }}>Je m'inscris</Typography>
          </Box>
        </Stack>
        <Stack>
          <Box sx={{ marginBottom: "0.75rem", position:"relative" }}>
            <hr style={{ position: "absolute", left: 0, right: 0, top: "17%", color: "#f2f2f2", boxSizing: "content-box", overflow: "visible", height: 0, borderTopWidth: "1px" }} />
            <Typography sx={{ display: "inline-block", position: "relative", backgroundColor: "#FFF", zIndex: 10, padding: "0 .5rem", fontSize: "12px", fontFamily: "Montserrat", color: "#969cb6", lineHeight: "1rem", fontWeight: 600 }}>ou s'inscrire avec</Typography>
          </Box>
          <Box sx={{ display: "inline-flex", alignSelf: "center", justifyContent: "center", width: "20px", height: "20px", backgroundColor: "#FFF", border: "1px solid #e1e1e1", borderRadius: "5px", padding: "10px"  }}>
            <img src={GoogleAuth} alt="GoogleOAuth" style={{ display: "block", width: "100%", height: "100%" }} />
          </Box>
        </Stack>
        <Stack justifyContent="center" spacing="0.25rem" sx={{ minHeight: "40px" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography fontSize=".75rem" lineHeight="1rem" fontFamily="Montserrat" color="#8c8c8c">Déjà utilisateur?</Typography>
            <Typography component={Link} sx={{ fontSize: ".75rem", lineHeight: "1rem", fontFamily: "Montserrat", fontWeight: 600, color: "#000", textDecoration: "none", cursor: "pointer" }} onClick={toSignin}>Se connecter</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Signup