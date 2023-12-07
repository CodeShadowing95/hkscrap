import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "title", headerName: "Nom", width: 130 },
//   { field: "rating", headerName: "Note", width: 30 },
//   { field: "review", headerName: "Avis", width: 70 },
//   { field: "price_range", headerName: "Abordabilité", type: "number", width: 90 },
//   { field: "categorie", headerName: "Catégorie", width: 200 },
//   { field: "adresse", headerName: "Adresse", width: 130 },
//   { field: "statut", headerName: "Statut", width: 70 },
//   { field: "heureOuverture", headerName: "Heure d'ouverture", width: 90 },
//   { field: "imageUrl", headerName: "Image", width: 90 },
//   { field: "services", headerName: "Services", width: 150 },
//   { field: "description", headerName: "Description", width: 90 },
//   { field: "siteWeb ", headerName: "Site Web ", width: 90 },
//   { field: "telephone", headerName: "Téléphone", type: "number", width: 130 },
// ];

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left">{row.title}</TableCell>
        <TableCell align="left">{row.rating}</TableCell>
        <TableCell align="left">{row.review}</TableCell>
        <TableCell align="left">{row.price_range}</TableCell>
        <TableCell align="left">{row.categorie}</TableCell>
        <TableCell align="left">{row.adresse}</TableCell>
        <TableCell align="left">{row.statut}</TableCell>
        <TableCell align="left">{row.heureOuverture}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Informations supplémentaires
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Services</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Site web</TableCell>
                    <TableCell align="left">Téléphone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.services}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.siteWeb}</TableCell>
                    <TableCell align="left">{row.telephone}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const DataTable = ({ datas }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="left">Nom</TableCell>
            <TableCell align="left">Note</TableCell>
            <TableCell align="left">Avis</TableCell>
            <TableCell align="left">Abordabilité</TableCell>
            <TableCell align="left">Catégorie</TableCell>
            <TableCell align="left">Adresse</TableCell>
            <TableCell align="left">Statut</TableCell>
            <TableCell align="left">Disponibilité</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;