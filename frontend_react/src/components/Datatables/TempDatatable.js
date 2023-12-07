import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InfoIcon, SpinImage, TaskAltIcon, VisibilityIcon } from '../../utils/constants';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../ThemeProvider';

function formatTime(time) {
  // Extract hours, minutes, and seconds
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();

  // Format hours, minutes, and seconds with leading zeros if needed
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  // Format the execution time as HH:MM:SS
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


const actualTime = formatTime(new Date());

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#88a9c3",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: "12px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "13px",
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


const TempDatatable = ({ datas, isprocessing }) => {
  const { theme } = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead sx={{ backgroundColor: theme === 'light' ? "#FFF" : "#253141" }}>
          <TableRow>
            <StyledTableCell align="center"><InfoIcon sx={{ fontSize: "18px" }} /></StyledTableCell>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">DÉBUTÉE À</StyledTableCell>
            <StyledTableCell align="center">DURÉE</StyledTableCell>
            <StyledTableCell align="center">LIGNES</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.length > 0 ?
            datas.map((data, index) => {
              return (
                <StyledTableRow key={`${data.DO_ID}_${index}`}
                  sx={{ 
                    backgroundColor: index % 2 !== 0 ? (theme === 'light' ? "#FFF" : "#253141") : (theme === 'light' ? "#F5F5F5" : "#131920"),
                  }}
                >
                  <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center"><TaskAltIcon sx={{ fontSize: "18px", color: "#1eae53" }} /></StyledTableCell>
                  <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data.DO_ID * 785}</StyledTableCell>
                  <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{actualTime}</StyledTableCell>
                  <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data.EXEC_TIME}</StyledTableCell>
                  <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data.LIGNES}</StyledTableCell>
                  <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center"><VisibilityIcon sx={{ color: "#9b9b9b", cursor: "pointer", "&:hover": { color: "#3c3c3c" } }} /></StyledTableCell>
                </StyledTableRow>
              )
            })
            :
            isprocessing === false && datas.length === 0 ? 
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center"><Typography sx={{ fontStyle: "italic", fontWeight: 300, color: "#999" }}>(Aucune tâche effectuée pour le moment.)</Typography></StyledTableCell>
            </StyledTableRow>
            :
            <StyledTableRow>
              <StyledTableCell sx={{ color: (theme === 'light' ? "#000" : "#FFF") }} align="center">
                <Box sx={{ display: "inline-block", maxWidth: "30px" }}>
                  <img src={SpinImage} alt="loading" style={{ maxWidth: "100%", height: "auto", verticalAlign: "middle", fontStyle: "italic", backgroundRepeat: "no-repeat", backgroundSize: "cover", shapeMargin: "1rem" }} />
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">En cours...</StyledTableCell>
              <StyledTableCell align="center">{actualTime}</StyledTableCell>
              <StyledTableCell align="center">En cours...</StyledTableCell>
              <StyledTableCell align="center">En cours...</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
          }
          {isprocessing === true && datas.length > 0 && (
          <StyledTableRow>
            <StyledTableCell sx={{ color: (theme === 'light' ? "#000" : "#FFF") }} align="center">
              <Box sx={{ display: "inline-block", maxWidth: "30px" }}>
                <img src={SpinImage} alt="loading" style={{ maxWidth: "100%", height: "auto", verticalAlign: "middle", fontStyle: "italic", backgroundRepeat: "no-repeat", backgroundSize: "cover", shapeMargin: "1rem" }} />
              </Box>
            </StyledTableCell>
            <StyledTableCell align="center">En cours...</StyledTableCell>
            <StyledTableCell align="center">{actualTime}</StyledTableCell>
            <StyledTableCell align="center">En cours...</StyledTableCell>
            <StyledTableCell align="center">En cours...</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TempDatatable;