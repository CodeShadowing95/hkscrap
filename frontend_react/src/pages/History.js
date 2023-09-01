import { Stack, Box, Typography, Breadcrumbs, Badge, Grid, Link, Pagination, TextField, InputAdornment } from '@mui/material'
import { Options, Searchbar, Template } from '../components'
import Sidebar from '../components/Sidebar'
import { FlashOnIcon, LightModeIcon, NotificationsNoneIcon, PeopleIcon, SearchIcon, popular_sites } from '../utils/constants';
import { useEffect, useState } from 'react';
import TableScrapeDatas from '../components/TableScrapeDatas';
import ExportButton from '../components/ExportButton';

const History = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  function handlePage(data, currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  useEffect(() => {
    try {
      fetch('http://localhost:8000/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(async (response) => {
        if(!response.ok) throw new Error("Impossible d'accéder à la requête")
  
        const responseData = await response.json();
        // console.log(responseData);
        setDatas(responseData);
      })
    } catch (error) {
      console.error("Error de récupération de données", error);
    }
  }, [])

  return (
    <>
    <Sidebar user={user} />
    <Stack direction="column" sx={{ top: 0, flex: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: "2rem 4rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5em" }}>
          {/* Title & Breadcrumb */}
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B" }}>Historique des tâches</Typography>
            {/* Breadcrumb */}
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/home">
                Accueil
              </Link>
              <Typography color="#93B0C8">Historique</Typography>
            </Breadcrumbs>
          </Box>

          {/* Searchbar, Light/Dark mode, Notifications */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", columnGap: "20px", width: "43%" }}>
            {/* <Searchbar /> */}
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

        {/* Vue générale */}
        <Box sx={{ marginTop: "1rem" }}>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Stack alignItems="center" padding="20px" border="1px solid #e1e1e1" borderRadius="10px" sx={{ backgroundColor: "#FFF" }} spacing={2}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", columnGap: "10px", width: "100%" }}>
                  {/* <Button variant="contained" color='success' startIcon={<SettingsIcon />}>Sauvegarder</Button> */}
                  <TextField
                    placeholder='Rechercher...'
                    size='small'
                    type='search'
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                    }}
                  />
                  <Options />
                </Box>
                <TableScrapeDatas datas={handlePage(datas, page, 10)} />
                <Pagination
                  count={Math.ceil(datas.length / 10)}
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
                  disabled={datas.length <= 10}
                  // sx={{ marginTop: 2 }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>

      </Box>
    </Stack>
    </>
  )
}

export default History