import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FileDownloadIcon, InfoIcon, TaskAltIcon, UploadingLoop, popular_sites } from '../../utils/constants';
import { Box, ButtonBase, Typography } from '@mui/material';
import { useTheme } from '../ThemeProvider';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#88a9c3",
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Montserrat",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getWebsite = (name, sites) => {
  for(let site of sites) {
    if(site?.name === name){
      return site;
    }
  }
}

const TableScrapeDatas = ({ datas, simple }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const loadDatas = (datafile, taskname) => {
    navigate(`/datas/?datasheet=${datafile}&taskname=${taskname}`);
  }

  const downloadDatas = () => {

  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{ backgroundColor: theme === 'light' ? "#FFF" : "#253141" }}>
          <TableRow>
            {simple && <StyledTableCell><InfoIcon /></StyledTableCell>}
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">NOM DE LA TÂCHE</StyledTableCell>
            <StyledTableCell align="center">PLATEFORME</StyledTableCell>
            <StyledTableCell align="center">DATE DE DÉBUT</StyledTableCell>
            <StyledTableCell align="center">TEMPS D'EXÉCUTION</StyledTableCell>
            {!simple && <StyledTableCell align="center">EMPLACEMENT</StyledTableCell>}
            {!simple && <StyledTableCell align="center"></StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.length > 0 ?
            datas.map((data, index) => {
            let website = getWebsite(data.WEBSITE, popular_sites);

            return (
              <StyledTableRow key={`${data.RESULTS}`}
                sx={{ 
                  backgroundColor: index % 2 !== 0 ? (theme === 'light' ? "#FFF" : "#253141") : (theme === 'light' ? "#F5F5F5" : "#131920"),
                }}
              >
                {simple &&
                  <StyledTableCell component="th" scope="row">
                    <TaskAltIcon sx={{ color: "#1eae53" }} />
                  </StyledTableCell>
                }
                <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{index+1}</StyledTableCell>
                <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data.LABEL}</StyledTableCell>
                <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 5 }}>
                    <img src={website.icon} alt="logo" width="30" height="30" />
                    {website.name}
                  </div>
                </StyledTableCell>
                <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data.START_DATE}</StyledTableCell>
                <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data.EXEC_TIME}</StyledTableCell>
                {!simple && <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data.RESULTS}</StyledTableCell>}
                {/* <StyledTableCell align="center">{data.LIGNES}</StyledTableCell> */}
                {!simple &&
                  <StyledTableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                      <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme === 'light' ? "#fab950" : "#ae7519", padding: "10px", borderRadius: "5px", cursor: "pointer", "&: hover": {boxShadow: 2} }} onClick={() => loadDatas(data.RESULTS, data.LABEL)}>
                        <UploadingLoop />
                      </Box>
                      <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme === 'light' ? "#3492ca" : "#015384", padding: "10px", borderRadius: "5px", cursor: "pointer", "&: hover": {boxShadow: 2} }} onClick={downloadDatas}>
                        <FileDownloadIcon sx={{ fontSize: "20px" }} />
                      </Box>
                    </Box>
                  </StyledTableCell>
                }
              </StyledTableRow>
            )
            })
            :
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center"><Typography sx={{ fontStyle: "italic", fontWeight: 300, color: "#999" }}>(Aucune tâche effectuée pour le moment.)</Typography></StyledTableCell>
            </StyledTableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableScrapeDatas;