import { Stack, Box, Typography, Breadcrumbs, Link, Pagination, TextField, InputAdornment, ButtonBase, Modal, Grid, Button, IconButton, Select, MenuItem } from '@mui/material'
import { AddTaskIcon, CloseIcon, DeleteIcon, FlashOnIcon, SearchIcon, SpinImage, SpinnerBlock } from '../utils/constants';
import { useEffect, useState } from 'react';
import TableScrapeDatas from '../components/Datatables/TableScrapeDatas';
import { ErrorMessage } from '../components';
import { fetchFromServer } from '../utils/fetchFromServer';

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

const History = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const initialState = { taskname: "", linkurl: "", datalimit: 0 };
  const [formData, setFormData] = useState(initialState);

  const [listDatas, setListDatas] = useState([]);
  const [dataSize, setDataSize] = useState(10);
  const [scrapedData, setScrapedData] = useState([]);

  const [page, setPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState('');

  const [initiating, setInitiating] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);



  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const handleFilterTermChange = (e) => {
    setFilterTerm(e.target.value);
  }

  const handleChange = (e) => {
    if (e.target.name === "linkurl") {
      const validURL = isValidURL(e.target.value);
      setErrorMessage(validURL ? "" : "L'URL du site web à scraper est invalide");
    }

    if (e.target.name === "datalimit") {
      const value = e.target.value;
      // setDataSize((parseFloat(value) >= 0 && !isNaN(value)) || parseFloat(value) < 0 ? value : dataSize);
      setDataSize(value);
    }

    setDisable(false);
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInitiating(true);

    const { linkurl, taskname, datalimit } = formData;
    const handleScrape = scrapeProcess(taskname, linkurl, datalimit);

    setDisable(true);
    setInitiating(true);
    handleClose();

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

  const filterHistoryByTerm = listDatas.filter((item) => (
    item?.LABEL?.toLowerCase().includes(filterTerm?.toLowerCase()) ||
    item?.WEBSITE?.toLowerCase().includes(filterTerm?.toLowerCase()) ||
    item?.START_DATE?.toLowerCase().includes(filterTerm?.toLowerCase()) ||
    item?.RESULTS?.toLowerCase().includes(filterTerm?.toLowerCase())
  ));

  const scrapeProcess = (taskname, url, limit) => async () => {
    if (taskname === '') {
      taskname = 'Tâche';
    }

    limit = dataSize;
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
        body: JSON.stringify({ url: url, limit: dataSize })
      });
      const endTime = new Date();
      const executionTimeInMilliseconds = endTime - startDate;
      const executionTime = formatTime(executionTimeInMilliseconds);
      const start_date = currentDate;

      // console.log(response);

      if (response?.ok) {
        const data = await response.json();
        // console.log(data);
        const resultLength = data?.dataLength;
        const filename = data?.filename;
        setScrapedData(data);

        // let filename = createCSVFile();

        const res = await insertNewData(taskname, website, start_date, executionTime, resultLength, filename);
        console.log("Enregistrement effectué");
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

  function handlePage(data, currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

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

        const user_data = await response.json();
        const { user_id } = user_data;
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
          setListDatas(responseData);
        })
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
  }, [listDatas, user])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: "1rem 2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em", width: "100%" }}>
        {/* Title & Breadcrumb */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B", fontFamily: "Montserrat" }}>Historique des tâches</Typography>
          {/* Breadcrumb */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/home" fontFamily="Montserrat">
              Accueil
            </Link>
            <Typography color="#93B0C8" fontFamily="Montserrat">Historique</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Vue générale */}
      <Box sx={{ marginTop: "1rem" }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Stack alignItems="center" padding="20px" border="1px solid #e1e1e1" borderRadius="10px" sx={{ backgroundColor: "#FFF" }} spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", columnGap: "10px", width: "100%" }}>
                {/* <Button variant="contained" color='success' startIcon={<SettingsIcon />}>Sauvegarder</Button> */}
                <TextField
                  placeholder='Rechercher...'
                  size='small'
                  type='search'
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                  }}
                  value={filterTerm}
                  onChange={handleFilterTermChange}
                />
                {!initiating ?
                  <Box component={ButtonBase} sx={{ display: "flex", alignSelf: "center", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "10px", backgroundImage: "linear-gradient(to right, #4338ca, #3a57db, #3a73e9, #488cf3, #60a5fa)", gap: 1, cursor: "pointer", transition: ".2s", "&: hover": {boxShadow: 4} }} onClick={handleOpen}>
                    <AddTaskIcon sx={{ fontSize: '25px', color: "#fff" }} />
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", fontWeight: 600, color: "#FFF" }}>Nouvelle tâche</Typography>
                  </Box>
                  :
                  <Box sx={{ display: "flex", alignSelf: "center", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "10px", backgroundImage: "linear-gradient(to right, #4338ca, #3a57db, #3a73e9, #488cf3, #60a5fa)", gap: 2 }}>
                    <Box sx={{ display: "inline-block", maxWidth: "20px" }}>
                      <img src={SpinnerBlock} alt="loading" style={{ maxWidth: "100%", height: "auto", verticalAlign: "middle", fontStyle: "italic", backgroundRepeat: "no-repeat", backgroundSize: "cover", shapeMargin: "1rem" }} />
                    </Box>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", fontWeight: 600, color: "#FFF" }}>En cours...</Typography>
                  </Box>
                }
                {/* <Options /> */}
              </Box>
              {!filterTerm ?
                <TableScrapeDatas datas={handlePage(listDatas, page, 10)} />
                :
                filterHistoryByTerm.length > 0 && <TableScrapeDatas datas={handlePage(filterHistoryByTerm, page, 10)} />
              }
              <Pagination
                // count={Math.ceil(datas.length / 10)}
                count={!filterTerm ? Math.ceil(listDatas.length / 10) : Math.ceil(filterHistoryByTerm.length / 10)}
                page={page}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                color='primary'
                variant='outlined'
                shape='rounded'
                size='large'
                siblingCount={1}
                boundaryCount={1}
                disabled={!filterTerm ? listDatas.length <= 10 : filterHistoryByTerm.length <= 10}
                // sx={{ marginTop: 2 }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontFamily: "Montserrat", fontWeight: "700", lineHeight: "1.5rem" }}>
                Nouvelle tâche
              </Typography>
              <IconButton onClick={handleClose} sx={{ backgroundColor: "#a1a1a1" }}>
                <CloseIcon sx={{ fontSize: "20px", color: "#FFF" }} />
              </IconButton>
            </Box>
            <Grid container marginTop={3} spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
                    label="Sélectionner une limite"
                    disabled={disable}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
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
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: 3 }}>
              <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "20px", backgroundColor: "#FFF", boxShadow: 4, gap: 1, cursor: "pointer", transition: ".2s", "&: hover": {boxShadow: 5} }} onClick={clearForm}>
                <DeleteIcon sx={{ fontSize: '25px', color: "#000" }} />
                <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", fontWeight: 300, color: "#000" }}>Effacer</Typography>
              </Box>
              <Box component={ButtonBase} type='submit' sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "15px", borderRadius: "20px", backgroundColor: "#376e37", gap: 1, cursor: "pointer", transition: ".2s", "&: hover": {boxShadow: 4} }}>
                <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", fontWeight: 300, color: "#FFF" }}>Démarrer</Typography>
                <FlashOnIcon sx={{ fontSize: '20px', color: "#fff" }} />
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
    </Box>
  )
}

export default History