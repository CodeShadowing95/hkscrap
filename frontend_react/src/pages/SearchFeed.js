import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, ButtonBase, Grid, Pagination, Stack, TextField, Typography } from '@mui/material'

import { ErrorMessage, TempDatatable } from '../components'
import { AccessTimeFilledIcon, ChevronLeftIcon, ClearAllIcon, FlashOnIcon } from '../utils/constants'
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
  const [dataSize, setDataSize] = useState(0);
  const initialState = { taskname: "", linkurl: "", datalimit: 0 };
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
      // Check if the input is not empty and is a valid positive number
      setDataSize(value === "" || (parseFloat(value) >= 0 && !isNaN(value)) || parseFloat(value) < 0 ? value : dataSize);
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
      datalimit: 0,
    });
    setDataSize(0);
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
      alert("No specific URL found!");
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
          <Stack sx={{ border: "1px solid #e1e1e1", borderRadius: "10px", padding: "15px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e1e1e1", padding: "0 0 10px 0" }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                {/* Button Back */}
                <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "5px", gap: 1, "&:hover": { backgroundColor: "#f3f3f3" } }} onClick={toPreviousPage}>
                  <ChevronLeftIcon sx={{ fontSize: "20px", color: "#555555" }} />
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>Retour</Typography>
                </Box>
                {/* <div>Text</div>
                <div>Text</div> */}
              </Box>
              {/* Some other features to add */}
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "5px", gap: 1 }}>
                  <AccessTimeFilledIcon sx={{ fontSize: "20px", color: "#555555" }} />
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>{currentDate}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "5px" }}>
                  <FlashOnIcon sx={{ fontSize: "20px", color: "#555555" }} />
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>0</Typography>
                </Box>
                <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", borderRadius: "5px", border: "1px solid #e1e1e1", gap: 1, "&:hover": { backgroundColor: "#f3f3f3" } }} onClick={clearForm}>
                  <ClearAllIcon sx={{ fontSize: "20px", color: "#555555" }} />
                  <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", lineHeight: "16px", fontWeight: 600, color: "#555555" }}>Effacer</Typography>
                </Box>
              </Box>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={4} sx={{ margin: "30px 0" }}>
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
                  />
                  {errorMessage !== "" ? <ErrorMessage message={errorMessage} /> : ""}
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 600, lineHeight: "20px" }}>
                    Limite de données (0 - illimité)
                  </Typography>
                  <TextField
                    size="small"
                    type="number"
                    name="datalimit"
                    id="datalimit"
                    value={dataSize}
                    onChange={handleChange}
                    fullWidth
                    disabled={disable}
                  />
                </Stack>
              </Stack>
              <Button
                type="submit"
                disabled={disable}
                variant="contained"
                size="large"
                color="info"
                endIcon={<FlashOnIcon />}
                sx={{ width: "100%" }}
                onSubmit={handleSubmit}
              >
                Démarrer l'extraction
              </Button>
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