import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ErrorOutlineIcon, FileUploadIcon, TaskAltIcon, UploadIcon, UploadingLoop, popular_sites } from '../utils/constants';
import { Box, Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#88a9c3",
  },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: 14,
  // },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {simple && <StyledTableCell><ErrorOutlineIcon /></StyledTableCell>}
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">NOM DE LA TÂCHE</StyledTableCell>
            <StyledTableCell align="center">PLATEFORME</StyledTableCell>
            <StyledTableCell align="center">DATE DE DÉBUT</StyledTableCell>
            <StyledTableCell align="center">TEMPS D'EXÉCUTION</StyledTableCell>
            {/* <StyledTableCell align="center">ENREGISTREMENTS</StyledTableCell> */}
            {!simple && <StyledTableCell align="center"></StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.length > 0 ?
            datas.map((data, index) => {
            let website = getWebsite(data.WEBSITE, popular_sites);

            return (
              <StyledTableRow key={`${data.DO_ID}_${index}`}>
                {simple &&
                  <StyledTableCell component="th" scope="row">
                    <TaskAltIcon sx={{ color: "#1eae53" }} />
                  </StyledTableCell>
                }
                <StyledTableCell align="center">{data.DO_ID}</StyledTableCell>
                <StyledTableCell align="center">{data.LABEL}</StyledTableCell>
                <StyledTableCell align="center">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 5 }}>
                    <img src={website.icon} alt="logo" width="30" height="30" />
                    {website.name}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">{data.START_DATE}</StyledTableCell>
                <StyledTableCell align="center">{data.EXEC_TIME}</StyledTableCell>
                {/* <StyledTableCell align="center">{data.LIGNES}</StyledTableCell> */}
                {!simple &&
                  <StyledTableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, backgroundColor: "#e1e1e1", padding: "10px", borderRadius: "5px", cursor: "pointer", "&: hover": {boxShadow: 2} }}>
                      <UploadingLoop />
                      <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>Charger</Typography>
                    </Box>
                  </StyledTableCell>
                }
              </StyledTableRow>
            )
            })
            :
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center"><Typography sx={{ fontStyle: "italic", fontWeight: 300, color: "#999" }}>(Aucune tâche effectuée)</Typography></StyledTableCell>
            </StyledTableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableScrapeDatas;