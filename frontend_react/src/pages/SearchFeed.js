import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, ButtonBase, Grid, MenuItem, Pagination, Select, Stack, TextField, Typography } from '@mui/material'

import { ErrorMessage, TempDatatable } from '../components'
import { AccessTimeFilledIcon, ChevronLeftIcon, ClearAllIcon, CloudIcon, DeleteIcon, FlashOnIcon, KeyboardDoubleArrowRightIcon, SecurityIcon, ThumbUpIcon, hklogo, loremText } from '../utils/constants'
import { fetchFromServer } from '../utils/fetchFromServer'

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getFullYear())//.slice(-2); // Get the last two digits of the year

  return `${day}/${month}/${year}`;
}

const currentDate = formatDate(new Date());

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  // Format the execution time as HH:MM:SS
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
  
const detect_url = (url) => {
  if (/^(https?:\/\/)?(www\.)?google\.[a-z.]+\/maps\//i.test(url)) {
    return "Google Maps";
  } else if (/^(https?:\/\/)?(www\.)?linkedin\.com\//i.test(url)) {
    return "LinkedIn";
  } else if (/^(https?:\/\/)?(www\.)?amazon\.com\//i.test(url)) {
    return "Amazon";
  } else if (/^(https?:\/\/)?(www\.)?twitter\.com\//i.test(url)) {
    return "Twitter";
  }

  return "";
}

const isValidURL = (url) => {
  const urlRegex = /^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)+/i;
  return urlRegex.test(url);
};


const SearchFeed = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [dataSize, setDataSize] = useState(10);
  const initialState = { taskname: "", linkurl: "", datalimit: 10 };
  const [formData, setFormData] = useState(initialState);

  const [scrapedData, setScrapedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(1);

  const [disable, setDisable] = useState(false);
  const [initiating, setInitiating] = useState(false);

  // const location = useLocation();
  // const url = new URLSearchParams(location.search).get('q');
  // let task = new URLSearchParams(location.search).get('task');
  
  const toPreviousPage = () => {
    navigate('/home');
  }

  const handleChange = (e) => {
    if (e.target.name === "linkurl") {
      const validURL = isValidURL(e.target.value);
      setErrorMessage(validURL ? "" : "L'URL du site web à scraper est invalide");
    }

    if (e.target.name === "datalimit") {
      const value = e.target.value;
      setDataSize(value);
    }

    setDisable(false);
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { linkurl, taskname, datalimit } = formData;
    const handleScrape = scrapeProcess(taskname, linkurl, datalimit);

    setDisable(true);
    setInitiating(true);

    handleScrape()
    .then(() => {
      setDisable(false);
      setInitiating(false);
    })
    .catch((error) => {
      console.error("Erreur: ", error)
    })
    .finally(() => {
      clearForm();
    })
  };

  const clearForm = () => {
    setFormData({
      taskname: "",
      linkurl: "",
      datalimit: 10,
    });
    setDataSize(10);
    setErrorMessage("");

    const tasknameTextField = document.getElementById('taskname');
    const linkurlTextField = document.getElementById('linkurl');
    const datalimitTextField = document.getElementById('datalimit');
  
    if (tasknameTextField) tasknameTextField.value = '';
    if (linkurlTextField) linkurlTextField.value = '';
    if (datalimitTextField) datalimitTextField.value = '';
  }

  const scrapeProcess = (taskname, url, limit) => async () => {
    if (taskname === '') {
      taskname = 'Tâche';
    }

    console.log(taskname, url, limit);

    let website = detect_url(url);
    if (website === "") {
      setErrorMessage("Aucune URL trouvée");
      return;
    }

    setLoading(true);
    console.log('Sending URL:', url);

    const startDate = new Date();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url, limit: limit })
      });
      const endTime = new Date();
      const executionTimeInMilliseconds = endTime - startDate;
      const executionTime = formatTime(executionTimeInMilliseconds);
      const start_date = currentDate;

      // console.log(response);

      if (response?.ok) {
        const data = await response.json();
        console.log(data);

        if(!data) {
          const resultLength = data?.dataLength;
          const filename = data?.filename;
          setScrapedData(data);
  
          // let filename = createCSVFile();
  
          const res = await insertNewData(taskname, website, start_date, executionTime, resultLength, filename);
        } else {
          console.log("Un problème est survenu");
        }
      } else {
        console.error('Error scraping data');
        return;
      }
    } catch (error) {
      console.error('Datas couldn\'t be scraped', error);
    } finally {
      setLoading(false);
    }
  }

  const insertNewData = async (label, website, startDate, execTime, lines, resultsFile) => {
    try {
      const { email } = user;

      fetchFromServer('get-user', { email })
      .then((res) => {
        if(res?.data) {
          const userIdResponse = res.data?.user_id;
          if(userIdResponse) {
            fetchFromServer('store-scraped-data', { userId: userIdResponse, label, website, startDate, execTime, lines, resultsFile })
            // .then((response) => response.data)
            .then(() => console.log("Cool"))
            .catch((error) => {
              console.error("Error: " + error);
            })
          }
        } else {
          console.log("Erreur: User ID not found");
        }
      })
    } catch (error) {
      console.error("Enregistrement non effectué", error);
    }
  }

  // const handlePageChange = (event, value) => {
  //   setPaginate(value);
  // }

  // function handlePaginate(data, currentPage, itemsPerPage) {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return data.slice(startIndex, endIndex);
  // }

  useEffect(() => {
    try {
      const { email } = user;
      fetch(`${process.env.REACT_APP_BASE_API_URL}/get-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }),
      })
      .then(async (response) => {
        if(!response.ok) throw new Error("Impossible d'accéder à la requête")

        const data = await response.json();
        const { user_id } = data;
        fetch(`${process.env.REACT_APP_BASE_API_URL}/all`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uid: user_id }),
        })
        .then(async (response) => {
          if(!response.ok) throw new Error("Impossible d'accéder à la requête")
    
          const responseData = await response.json();
          setDatas(responseData);
        })
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
  }, [datas, user])


  return (
    <Stack sx={{ padding: "1rem 2rem" }}>
      {/* Content body */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Stack sx={{ border: "1px solid #e1e1e1", borderRadius: "10px", padding: "15px" }} spacing={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e1e1e1", padding: "0 0 10px 0" }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                {/* Button Back */}
                <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "5px", gap: 1, "&:hover": { backgroundColor: "#f3f3f3" } }} onClick={toPreviousPage}>
                  <ChevronLeftIcon sx={{ fontSize: "20px", color: "#555555" }} />
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>Retour</Typography>
                </Box>
              </Box>
              {/* Some other features to add */}
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: "inline-block", maxWidth: "20px", backgroundColor: "#f3f3f3", borderRadius: "5px", padding: "5px" }}>
                    <img src={hklogo} alt="loading" style={{ maxWidth: "100%", height: "auto", verticalAlign: "middle", fontStyle: "italic", backgroundRepeat: "no-repeat", backgroundSize: "cover", shapeMargin: "1rem" }} />
                  </Box>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>HK-Scrap</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "5px" }}>
                  <FlashOnIcon sx={{ fontSize: "18px", color: "#555555" }} />
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>0</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "5px", gap: 1 }}>
                  <AccessTimeFilledIcon sx={{ fontSize: "18px", color: "#555555" }} />
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>{currentDate}</Typography>
                </Box>
              </Box>
            </Box>

            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", padding: "5px", border: "1px solid #e1e1e1", borderRadius: "5px", gap: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "30px", maxHeight: "30px", backgroundColor: "#f3f3f3", borderRadius: "5px", padding: "5px" }}>
                    <SecurityIcon sx={{ fontSize: "15px", color: "#4338ca" }} />
                  </Box>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>Sécurité assurée</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", padding: "5px", border: "1px solid #e1e1e1", borderRadius: "5px", gap: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "30px", maxHeight: "30px", backgroundColor: "#f3f3f3", borderRadius: "5px", padding: "5px" }}>
                    <CloudIcon sx={{ fontSize: "15px", color: "#4338ca" }} />
                  </Box>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>Web scraping</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", padding: "5px", border: "1px solid #e1e1e1", borderRadius: "5px", gap: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "30px", maxHeight: "30px", backgroundColor: "#f3f3f3", borderRadius: "5px", padding: "5px" }}>
                    <ThumbUpIcon sx={{ fontSize: "15px", color: "#4338ca" }} />
                  </Box>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>100% fiable</Typography>
                </Box>
              </Box>

              <Box sx={{ position: "relative", padding: "15px", borderRadius: "10px", backgroundImage: "linear-gradient(to right, #4338ca, #3a57db, #3a73e9, #488cf3, #60a5fa)", overflow: "hidden" }}>
                <Typography sx={{ fontFamily: "Montserrat", fontSize: "1rem", fontWeight: 700, lineHeight: "1.25rem", color: "#FFF", marginBottom: "5px" }}>Abonnement Individuel - €29.99/mois</Typography>
                <Typography sx={{ fontFamily: "Montserrat", fontSize: ".95rem", fontWeight: 500, lineHeight: "1.25rem", color: "rgba(255, 255, 255, .7)" }}>Plus de <span style={{ fontWeight: "700", color: "#FFF" }}>500</span> données à extraire, selon vos besoins et vos poches.</Typography>
                <FlashOnIcon sx={{ position: "absolute", top: "-30px", right: "-20px", width: "150px", height: "150px", color: "rgba(67, 56, 202, .6)", transform: "rotate(30deg)" }} />
              </Box>
            </Stack>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={4} marginBottom="25px">
                <Stack spacing={1}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 600, lineHeight: "20px" }}>
                    Tâche
                  </Typography>
                  <TextField
                    size="small"
                    name="taskname"
                    id="taskname"
                    onChange={handleChange}
                    placeholder='Saisir le nom de la tâche (Optionnel)'
                    fullWidth
                    disabled={disable}
                    sx={{ backgroundColor: "#fafafa" }}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 600, lineHeight: "20px" }}>
                    URL du site *
                  </Typography>
                  <TextField
                    name="linkurl"
                    id="linkurl"
                    required
                    onChange={handleChange}
                    placeholder="Copier-coller l'url du site ici..."
                    fullWidth
                    multiline
                    rows={3}
                    disabled={disable}
                    sx={{ backgroundColor: "#fafafa" }}
                  />
                  {errorMessage !== "" ? <ErrorMessage message={errorMessage} /> : ""}
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 600, lineHeight: "20px" }}>
                    Limite
                  </Typography>
                  <Select
                    id="datalimit"
                    name="datalimit"
                    size="small"
                    fullWidth
                    value={dataSize}
                    disabled={disable}
                    sx={{ backgroundColor: "#fafafa" }}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </Stack>
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "10px" }}>
                <Button
                  disabled={disable}
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={clearForm}
                >
                  Effacer
                </Button>
                <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "50px", backgroundColor: "#3A72EC", gap: 1, cursor: "pointer", transition: ".2s", "&: hover": {boxShadow: 4, backgroundColor: "#4338ca"} }} onClick={handleSubmit}>
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", fontWeight: 600, color: "#FFF" }}>Exécuter</Typography>
                  <KeyboardDoubleArrowRightIcon sx={{ fontSize: '25px', color: "#fff" }} />
                </Box>
              </Box>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Box sx={{ border: "1px solid #e1e1e1", borderRadius: "10px", padding: "20px" }}>
            <TempDatatable datas={datas} isprocessing={initiating} />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default SearchFeed