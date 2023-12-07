import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Stack, Box, Typography, Pagination, TextField, InputAdornment } from '@mui/material'
import { Datatable2, Options } from '../components'
import { SearchIcon } from '../utils/constants';

const MyDatas = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const datasheet = new URLSearchParams(location.search).get('datasheet');
  const label = new URLSearchParams(location.search).get('taskname');

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
      fetch(`${process.env.REACT_APP_BASE_API_URL}/getdatas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ datasheet: datasheet }),
      })
      .then(async (response) => {
        if(!response.ok) throw new Error("Impossible d'accéder à la requête")
  
        const responseData = await response.json();
        setDatas(responseData);
        setIsLoading(false);
      })
    }
    catch (error) {
      console.error("Error de récupération de données", error);
    }
  }, [datasheet])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: "1rem 2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em", width: "100%" }}>
        {/* Title & Breadcrumb */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Typography variant="h1" sx={{ fontSize: "1.5em", fontWeight: "600", color: "#152C5B", fontFamily: "Montserrat" }}>{label}</Typography>
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
                <Datatable2 datas={handlePage(datas, page, 10)} isLoading={isLoading} />
                :
                filterHistoryByTerm.length > 0 && <Datatable2 datas={handlePage(filterHistoryByTerm, page, 10)} isLoading={isLoading} />
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

export default MyDatas