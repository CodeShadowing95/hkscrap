import { useEffect, useState } from 'react'
import { useLocation  } from 'react-router-dom'
import { Alert, Badge, Box, Breadcrumbs, Button, Link, Pagination, Snackbar, Stack, Typography } from '@mui/material'

import { DataTable, Options, Searchbar } from '../components'
import { LightModeIcon, NoData, NotificationsNoneIcon, PlayArrowIcon, SpinImage } from '../utils/constants'
import ExportButton from '../components/ExportButton'
import Sidebar from '../components/Sidebar'
import { fetchFromServer } from '../utils/fetchFromServer'

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

  return `${day}/${month}/${year}`;
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  // Format the execution time as HH:MM:SS
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


const SearchFeed = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // const [url, setUrl] = useState("");
  // const [task, setTask] = useState("");
  const [scrapedData, setScrapedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(1);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const location = useLocation();
  const url = new URLSearchParams(location.search).get('q');
  let task = new URLSearchParams(location.search).get('task');
  if(task == null){
    task = "Tâche";
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

  const scrapeIt = (newState) => async () => {
    let website = detect_url(url);

    if (website !== "") {
      setLoading(true);
      console.log('Sending URL:', url);

      const startDate = new Date();
      try {
        const response = await fetch('http://localhost:8000/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: url })
        });
        const endTime = new Date();
        const executionTimeInMilliseconds = endTime - startDate;
        const executionTime = formatTime(executionTimeInMilliseconds);
        const start_date = formatDate(startDate);

        // console.log(response);

        if (response.ok) {
          const data = await response.json();
          const resultLength = data.data.length;
          setScrapedData(data.data);
          
          const text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          let idFile = "";
          for(let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * text.length);
            idFile += text.charAt(randomIndex);
          }
          const resultsFile = `hk_scrape_${idFile}`;

          const res = await insertNewData(task, website, start_date, executionTime, resultLength, resultsFile);
          setMessage("Opération effectuée avec succès!");
          setState({ ...newState, open: true });
          // storeDatas(website, scrapedData, resultsFile);
        } else {
          console.error('Error scraping data');
        }
      } catch (error) {
        console.error('Datas couldn\'t be scraped', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('URL non valide');
    }
  }

  const insertNewData = async (label, website, startDate, execTime, lines, resultsFile) => {
    try {
      const { nom, prenom } = user[0];

      fetchFromServer('get-user-id', { nom, prenom })
      .then((res) => {
        if(res.data) {
          const userIdResponse = res.data;
          if(userIdResponse[0]?.user_id) {
            fetchFromServer('store-scraped-data', { userId: userIdResponse[0].user_id, label, website, startDate, execTime, lines, resultsFile })
            .then((response) => response.data)
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

  const handlePageChange = (event, value) => {
    setPaginate(value);
  }

  function handlePaginate(data, currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // useEffect(() => {
  //   setUrl(page);
  // }, [page]);

  useEffect(() => {
    const handleScrape = scrapeIt(state);

    handleScrape()
    .then(() => {
      console.log("Opération effectuée!");
    })
    .catch((error) => {
      console.error("Erreur: ", error)
    })
  }, []);


  return (
    <Stack>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "1rem 2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em", width: "100%" }}>
          {/* Title & Breadcrumb */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B" }}>Résultats de l'opération</Typography>
            {/* Breadcrumb */}
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/home">
                Accueil
              </Link>
              <Typography color="#93B0C8">Résultats de recherche</Typography>
            </Breadcrumbs>
          </Box>

          {/* Searchbar, Light/Dark mode, Notifications */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", columnGap: "20px", width: "43%" }}>
            <Searchbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", backgroundColor: "#FFF" }}>
              <LightModeIcon sx={{ fontSize: '25px', color: "#88a9c3" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "15px", backgroundColor: "#FFF" }}>
              <Badge color="error" variant="dot" overlap="circular">
                <NotificationsNoneIcon sx={{ fontSize: '25px', color: "#88a9c3" }} />
              </Badge>
            </div>
          </Box>
        </Box>

        {/* Success message */}
        {message !== "" &&
          <Box sx={{ width: 500, padding: "20px", zIndex: 10000 }}>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              autoHideDuration={6000}
              // message={message}
              key={vertical + horizontal}
            >
              <Alert onClose={handleClose} variant='filled' severity="success" sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
          </Box>
        }
      </Box>

      {/* Content body */}
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 4rem", rowGap: "20px" }}>
        {scrapedData.length === 0 ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #e1e1e1", backgroundColor: "#FFF", borderRadius: "10px", padding: "20px", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: 1, border: "2px dashed #d2d2d2", borderRadius: "5px", backgroundColor: "#F3F4F6", height: "20rem", width: "100%" }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "8rem", height: "8rem" }}>
                <img src={SpinImage} alt="No_data" style={{ maxWidth: "100%", maxHeight: "100%" }} />
              </Box>
              <Typography sx={{ fontSize: "30px", color: "#8e96a4", fontWeight: 500 }}>Opération en cours d'exécution...</Typography>
              <Typography variant="body2" sx={{ color: "#8e96a4", fontSize: "15px" }}>Veuillez patienter un moment pendant que les données sont collectées</Typography>
            </Box>
          </div>
        ) : 
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px", border: "1px solid #e1e1e1", borderRadius: "5px", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", columnGap: "10px", width: "100%" }}>
              {/* <Button variant="contained" color='success' startIcon={<SettingsIcon />}>Sauvegarder</Button> */}
              <Typography variant='body1' fontSize="15px">Exporter en: </Typography>
              <ExportButton />
            </Box>
            <DataTable datas={handlePaginate(scrapedData, paginate, 10)} />
            <Stack spacing={2} justifyContent="center">
              <Pagination
                count={Math.ceil(scrapedData.length / 10)}
                page={paginate}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                color='primary'
                variant='outlined'
                shape='rounded'
                size='large'
                // siblingCount={1}
                // boundaryCount={1}
                disabled={scrapedData.length <= 10}
                sx={{ marginTop: 2 }}
              />
            </Stack>
          </Box>
        }
      </Box>
    </Stack>
  )
}

export default SearchFeed