import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Nom", width: 130 },
  { field: "rating", headerName: "Note", width: 30 },
  { field: "review", headerName: "Avis", width: 70 },
  { field: "price_range", headerName: "Abordabilité", type: "number", width: 90 },
  { field: "categorie", headerName: "Catégorie", width: 200 },
  { field: "adresse", headerName: "Adresse", width: 130 },
  { field: "statut", headerName: "Statut", width: 70 },
  { field: "heureOuverture", headerName: "Heure d'ouverture", width: 90 },
  { field: "imageUrl", headerName: "Image", width: 90 },
  { field: "services", headerName: "Services", width: 150 },
  { field: "description", headerName: "Description", width: 90 },
  { field: "siteWeb ", headerName: "Site Web ", width: 90 },
  { field: "telephone", headerName: "Téléphone", type: "number", width: 130 },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const RenderingData = ({ datas }) => {

  return (
    <div style={{ height: "400px", width: "50%" }}>
      <DataGrid
        rows={datas}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
};

export default RenderingData;
