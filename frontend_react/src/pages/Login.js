import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFromServer } from "../utils/fetchFromServer";

import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  BG_Login,
  GoogleAuth,
  VisibilityIcon,
  VisibilityOffIcon,
  sub_logo,
} from "../utils/constants";
import { ErrorMessage, SucessMessage } from "../components";

const Login = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const initialState = {
    email_username: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [typeInput, setTypeInput] = useState("password");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const signedupMsg = new URLSearchParams(location.search).get("successSignup");
  const [signedupMessage, setSignedupMessage] = useState(signedupMsg);
  const [showMessage, setShowMessage] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    fetchFromServer("login", formData)
      .then((res) => {
        if (res.data !== undefined) {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/home");
        } else {
          setMessage(res);
        }
      })
      .catch((err) => {
        setMessage("Email ou mot de passe incorrects");
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchToResetPassword = () => {
    setIsResetPassword((isResetPassword) => !isResetPassword);
  };

  const handleShowPassword = () => {
    if (typeInput === "text") {
      setTypeInput("password");
    } else {
      setTypeInput("text");
    }
  };

  const hideSuccessMessage = () => {
    setSignedupMessage("");
    setShowMessage(false);
  };

  const toSignup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/auth");
    }
    if (signedupMessage) setShowMessage(true);
  }, [signedupMessage, navigate, user]);

  return (
    <Box
      sx={{
        display: "grid",
        flexDirection: "column",
        placeContent: "center",
        height: "100dvh",
        width: "100%",
        backgroundImage: `url('${BG_Login}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!isResetPassword ? (
        <Stack
          component="form"
          sx={{
            maxWidth: "24rem",
            gap: "1.75rem",
            borderRadius: "5px",
            padding: "2.5rem",
            textAlign: "center",
            /*backgroundImage: `url('${sunflowerBg}')`, backgroundSize: "cover", backgroundPosition: "center"*/ backgroundColor:
              "#FFF",
          }}
          onSubmit={handleSubmit}
        >
          <Stack alignItems="center">
            <img
              src={sub_logo}
              alt="HKSCRAP_logo"
              style={{
                borderStyle: "none",
                display: "block",
                verticalAlign: "middle",
                maxWidth: "100%",
              }}
              height={80}
            />
          </Stack>
          <Stack spacing="0.5rem">
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Montserrat",
                color: "#37446f",
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                fontWeight: 700,
              }}
            >
              Connectez-vous à votre compte
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#969cb6",
              }}
            >
              Bienvenue!
              <br />
              Veuillez saisir vos identifiants
            </Typography>
          </Stack>
          <Stack spacing="1rem" textAlign="left" minWidth="300px">
            {message !== "" && <ErrorMessage message={message} />}
            {showMessage && (
              <SucessMessage
                message={signedupMessage}
                onHide={hideSuccessMessage}
              />
            )}
            <TextField
              required
              type="email"
              size="small"
              placeholder="Email"
              name="email_username"
              sx={{
                display: "flex",
                width: "100%",
                fontFamily: "Montserrat",
                height: "2.5rem",
                borderRadius: "0.375rem",
                fontSize: ".875rem",
                lineHeight: "1.25rem",
              }}
              onChange={handleChange}
            />
            <TextField
              required
              type={typeInput}
              size="small"
              placeholder="Mot de passe"
              name="password"
              sx={{
                display: "flex",
                width: "100%",
                fontFamily: "Montserrat",
                height: "2.5rem",
                borderRadius: "0.375rem",
                fontSize: ".875rem",
                lineHeight: "1.25rem",
              }}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {typeInput === "password" ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box
              component={Button}
              type="submit"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #e6e6e6",
                padding: "10px 15px",
                cursor: "pointer",
                textDecoration: "none",
                borderRadius: "10px",
                backgroundColor: "#eaf0fa",
                transition: ".2s",
              }}
              onSubmit={handleSubmit}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#0056b3",
                  textTransform: "uppercase",
                }}
              >
                Connexion
              </Typography>
            </Box>
          </Stack>
          <Stack>
            <Box sx={{ marginBottom: "0.75rem", position: "relative" }}>
              <hr
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "17%",
                  color: "#f2f2f2",
                  boxSizing: "content-box",
                  overflow: "visible",
                  height: 0,
                  borderTopWidth: "1px",
                }}
              />
              <Typography
                sx={{
                  display: "inline-block",
                  position: "relative",
                  backgroundColor: "#FFF",
                  zIndex: 10,
                  padding: "0 .5rem",
                  fontSize: "12px",
                  fontFamily: "Montserrat",
                  color: "#969cb6",
                  lineHeight: "1rem",
                  fontWeight: 600,
                }}
              >
                ou se connecter avec
              </Typography>
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                alignSelf: "center",
                justifyContent: "center",
                width: "20px",
                height: "20px",
                backgroundColor: "#FFF",
                border: "1px solid #e1e1e1",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <img
                src={GoogleAuth}
                alt="GoogleOAuth"
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            </Box>
          </Stack>
          <Stack
            justifyContent="center"
            spacing="0.25rem"
            sx={{ minHeight: "40px" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                fontSize=".75rem"
                lineHeight="1rem"
                fontFamily="Montserrat"
                color="#8c8c8c"
              >
                Pas de compte?
              </Typography>
              <Typography
                component={Link}
                sx={{
                  fontSize: ".75rem",
                  lineHeight: "1rem",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  color: "#000",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={toSignup}
              >
                S'inscrire
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                fontSize=".75rem"
                lineHeight="1rem"
                fontFamily="Montserrat"
                color="#8c8c8c"
              >
                Mot de passe oublié?
              </Typography>
              <Typography
                component={Link}
                sx={{
                  fontSize: ".75rem",
                  lineHeight: "1rem",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  color: "#000",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={switchToResetPassword}
              >
                Cliquez ici
              </Typography>
            </Box>
          </Stack>
        </Stack>
      ) : (
        <Stack
          component="form"
          sx={{
            maxWidth: "24rem",
            gap: "1.75rem",
            borderRadius: "5px",
            padding: "2.5rem",
            textAlign: "center",
            /*backgroundImage: `url('${sunflowerBg}')`, backgroundSize: "cover", backgroundPosition: "center"*/ backgroundColor:
              "#FFF",
          }}
          onSubmit={handleSubmit}
        >
          <Stack spacing="0.5rem">
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Montserrat",
                color: "#37446f",
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                fontWeight: 700,
              }}
            >
              Réinitialisez votre mot de passe
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#969cb6",
              }}
            >
              Vous recevrez un lien à l'adresse mail
            </Typography>
          </Stack>
          <Stack spacing="1rem" textAlign="left" minWidth="300px">
            <TextField
              required
              type="email"
              size="small"
              placeholder="Email"
              name="email_username"
              sx={{
                display: "flex",
                width: "100%",
                fontFamily: "Montserrat",
                height: "2.5rem",
                borderRadius: "0.375rem",
                fontSize: ".875rem",
                lineHeight: "1.25rem",
              }}
              onChange={handleChange}
            />
            <Box
              component={ButtonBase}
              type="submit"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #e6e6e6",
                padding: "10px 15px",
                cursor: "pointer",
                textDecoration: "none",
                borderRadius: "10px",
                backgroundColor: "#0056b3",
                transition: ".2s",
              }}
              onSubmit={handleSubmit}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#FFF",
                  textTransform: "uppercase",
                }}
              >
                Envoyer le lien
              </Typography>
            </Box>
          </Stack>
          <Stack
            justifyContent="center"
            spacing="0.25rem"
            sx={{ minHeight: "40px" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                fontSize=".75rem"
                lineHeight="1rem"
                fontFamily="Montserrat"
                color="#8c8c8c"
              >
                Identifiants retrouvés?
              </Typography>
              <Typography
                component={Link}
                sx={{
                  fontSize: ".75rem",
                  lineHeight: "1rem",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  color: "#000",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={switchToResetPassword}
              >
                Se connecter
              </Typography>
            </Box>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default Login;
