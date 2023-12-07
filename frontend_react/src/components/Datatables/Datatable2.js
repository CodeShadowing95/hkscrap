import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteIcon, ImportExportIcon, SpinImage, StarIcon, VisibilityIcon } from '../../utils/constants';
import { Box, ButtonBase, Typography } from '@mui/material';
import { useTheme } from '../ThemeProvider';
import Edit from '@mui/icons-material/Edit';

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

const Datatable2 = ({ datas, isLoading }) => {
  const { theme } = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{ backgroundColor: theme === 'light' ? "#FFF" : "#253141" }}>
          <TableRow>
            <StyledTableCell align="center">_</StyledTableCell>
            <StyledTableCell align="center">_</StyledTableCell>
            <StyledTableCell align="center">_</StyledTableCell>
            <StyledTableCell align="center">_</StyledTableCell>
            <StyledTableCell align="center">_</StyledTableCell>
            <StyledTableCell align="center">_</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ?
            <StyledTableRow>
              <StyledTableCell colSpan={7} sx={{ color: (theme === 'light' ? "#000" : "#FFF") }} align="center">
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", gap: 2 }}>
                  <Box sx={{ display: "inline-block", maxWidth: "50px" }}>
                    <img src={SpinImage} alt="loading" style={{ maxWidth: "100%", height: "auto", verticalAlign: "middle", fontStyle: "italic", backgroundRepeat: "no-repeat", backgroundSize: "cover", shapeMargin: "1rem" }} />
                  </Box>
                  <Typography sx={{ fontFamily: "Montserrat", fontWeight: 300, color: "#999" }}>Chargement...</Typography>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
            :
            datas.length > 0 ?
              datas.map((data, index) => {
                return (
                  <StyledTableRow key={index}
                    sx={{ 
                      backgroundColor: index % 2 !== 0 ? (theme === 'light' ? "#FFF" : "#253141") : (theme === 'light' ? "#F5F5F5" : "#131920"),
                    }}
                  >
                    <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data[0]}</StyledTableCell>
                    <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data[1]}</StyledTableCell>
                    <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data[2]}</StyledTableCell>
                    <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data[3]}</StyledTableCell>
                    <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data[4]}</StyledTableCell>
                    <StyledTableCell sx={{ color: index % 2 !== 0 ? (theme === 'light' ? "#000" : "#FFF") : (theme === 'light' ? "#000" : "#FFF"), }} align="center">{data[5]}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                        <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme === 'light' ? "#c3c3c3" : "#212121", padding: "5px", borderRadius: "5px", cursor: "pointer", "&: hover": {boxShadow: 2} }}>
                          <VisibilityIcon />
                        </Box>
                        <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme === 'light' ? "#c3c3c3" : "#212121", padding: "5px", borderRadius: "5px", cursor: "pointer", "&: hover": {boxShadow: 2} }}>
                          <ImportExportIcon sx={{ fontSize: "20px" }} />
                        </Box>
                        <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme === 'light' ? "#c3c3c3" : "#212121", padding: "5px", borderRadius: "5px", cursor: "pointer", "&: hover": {boxShadow: 2} }}>
                          <StarIcon sx={{ fontSize: "20px" }} />
                        </Box>
                        <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme === 'light' ? "#c3c3c3" : "#212121", padding: "5px", borderRadius: "5px", cursor: "pointer", "&: hover": {boxShadow: 2} }}>
                          <Edit sx={{ fontSize: "20px" }} />
                        </Box>
                        <Box component={ButtonBase} sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme === 'light' ? "#c3c3c3" : "#212121", padding: "5px", borderRadius: "5px", cursor: "pointer", "&: hover": {boxShadow: 2} }}>
                          <DeleteIcon sx={{ fontSize: "20px" }} />
                        </Box>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })
            :
            <StyledTableRow>
              <StyledTableCell colSpan={datas.length} align="center"><Typography sx={{ fontStyle: "italic", fontWeight: 300, color: "#999" }}>( Vide )</Typography></StyledTableCell>
            </StyledTableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Datatable2;