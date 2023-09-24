import { Stack, Box, Typography, Breadcrumbs, Link, Pagination, TextField, InputAdornment } from '@mui/material'
import { Options } from '../components'
import { SearchIcon } from '../utils/constants';
import { useEffect, useState } from 'react';
import TableScrapeDatas from '../components/TableScrapeDatas';

const History = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState('');

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const handleFilterTermChange = (e) => {
    setFilterTerm(e.target.value);
  }

  const filterHistoryByTerm = datas.filter((item) => (
    item?.LABEL?.toLowerCase().includes(filterTerm?.toLowerCase()) ||
    item?.WEBSITE?.toLowerCase().includes(filterTerm?.toLowerCase()) ||
    item?.START_DATE?.toLowerCase().includes(filterTerm?.toLowerCase()) ||
    item?.RESULTS?.toLowerCase().includes(filterTerm?.toLowerCase())
  ));

  function handlePage(data, currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  useEffect(() => {
    try {
      const { email } = user[0];
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
        const { uid } = data[0];
        fetch(`${process.env.REACT_APP_BASE_API_URL}/all`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uid: uid }),
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
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: "1rem 2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em", width: "100%" }}>
        {/* Title & Breadcrumb */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Typography variant="h1" sx={{ fontSize: "2em", fontWeight: "600", color: "#152C5B" }}>Historique des tâches</Typography>
          {/* Breadcrumb */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/home">
              Accueil
            </Link>
            <Typography color="#93B0C8">Historique</Typography>
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
                <Options />
              </Box>
              {!filterTerm ?
                <TableScrapeDatas datas={handlePage(datas, page, 10)} />
                :
                filterHistoryByTerm.length > 0 && <TableScrapeDatas datas={handlePage(filterHistoryByTerm, page, 10)} />
              }
              <Pagination
                // count={Math.ceil(datas.length / 10)}
                count={!filterTerm ? Math.ceil(datas.length / 10) : Math.ceil(filterHistoryByTerm.length / 10)}
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
                disabled={!filterTerm ? datas.length <= 10 : filterHistoryByTerm.length <= 10}
                // sx={{ marginTop: 2 }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default History