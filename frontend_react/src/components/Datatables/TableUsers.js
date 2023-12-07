import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import { AutoFixHighIcon, DeleteIcon, LockIcon, profileImage } from '../../utils/constants';
import { useState } from 'react';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const TableUsers = ({ datas, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [selectedRow, setSelectedRow] = useState(null);


  const handleDeleteButtonClick = async (member) => {
    try {
      fetch(`${process.env.REACT_APP_BASE_API_URL}/${member}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async (response) => {
        if(response.status === 204) {
          onDelete(member);
        } else if(response.status === 404) {
          console.error("Ressource introuvable");
        } else {
          console.error("Erreur survenue lors de la suppression");
        }
        handleClose();
      })
    } catch (error) {
      console.error("Erreur", error);
    }
  }

  const enableDeleteModal = (rowData) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">#</StyledTableCell>
            <StyledTableCell align="left">NOM</StyledTableCell>
            <StyledTableCell align="left">EMAIL</StyledTableCell>
            <StyledTableCell align="left">TÉLÉPHONE</StyledTableCell>
            <StyledTableCell align="left">PAYS</StyledTableCell>
            <StyledTableCell align="left">RÔLE</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.length > 0 ?
            datas.map((data, index) => {
              let username = '';
              if(data.NOM !== null && data.PRENOM !== null) {
                username = data.NOM + ' ' + data.PRENOM;
              } else {
                const email = data.EMAIL;
                const indexAtSymbol = email.indexOf('@');
                if(indexAtSymbol !== -1) {
                  username = email.slice(0, indexAtSymbol);
                } else {
                  username = 'Utilisateur';
                }
              }
            
              return (
              <StyledTableRow key={`${data.USER_ID}_${index}`}>
                <StyledTableCell align="left">{index+1}</StyledTableCell>
                <StyledTableCell align="left">
                  <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px" }}>
                    <Avatar variant="circular" src={profileImage} sx={{ width: 40, height: 40 }} />
                    <Typography>{username}</Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="left">{data.EMAIL}</StyledTableCell>
                <StyledTableCell align="left">{data.TELEPHONE ? data.TELEPHONE : <Typography sx={{ fontStyle: "italic", fontWeight: 300, color: "#999" }}>(Vide)</Typography>}</StyledTableCell>
                <StyledTableCell align="left">{data.PAYS ? data.PAYS : <Typography sx={{ fontStyle: "italic", fontWeight: 300, color: "#999" }}>(Vide)</Typography>}</StyledTableCell>
                <StyledTableCell align="left">{data.ROLE}</StyledTableCell>
                <StyledTableCell align="left">
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", transition: "0.2s" }}>
                    {/* <EditIcon sx={{ fontSize: "1.5em", padding: "10px", color: "#FFF", backgroundColor: "#1976d2", borderRadius: "5px" }} /> */}
                    <AutoFixHighIcon sx={{ fontSize: "1.5em", padding: "10px", color: "#FFF", backgroundColor: "#ed6c02", borderRadius: "5px", "&:hover": { backgroundColor: "#fd8f35" } }} />
                    <LockIcon sx={{ fontSize: "1.5em", padding: "10px", color: "#FFF", backgroundColor: "#000", borderRadius: "5px", "&:hover": { backgroundColor: "#404040" } }} />
                    <DeleteIcon sx={{ fontSize: "1.5em", padding: "10px", color: "#FFF", backgroundColor: "#D32F2F", borderRadius: "5px", "&:hover": { backgroundColor: "#db5757" } }} onClick={() => enableDeleteModal(data)} />
                    <Modal
                      open={isOpen}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontWeight: 300, marginBottom: "2rem" }}>
                          Supprimer compte
                        </Typography>
                        <Typography variant='body1' sx={{ fontSize: "17px", fontWeight: 400, marginBottom: "2rem" }}>
                          En supprimant ce compte, vous confirmez que <span style={{ fontWeight: 600 }}>{selectedRow?.NOM} {selectedRow?.PRENOM}</span> ne fait plus partie de l'équipe HKDigitals.
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: 3 }}>
                          <Button type="submit" variant="contained" size="lerge" color="error" onClick={() => handleDeleteButtonClick(selectedRow.USER_ID)}>Oui, je confirme</Button>
                          <Button variant="contained" size="small" color="inherit" onClick={handleClose}>Non, c'est un bon élément</Button>
                        </Box>
                      </Box>
                    </Modal>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            )})
            :
            <StyledTableCell colSpan={6} align="center"><Typography sx={{ fontStyle: "italic", fontWeight: 300, color: "#999" }}>(Aucun utilisateur enregistré)</Typography></StyledTableCell>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableUsers