// import React from "react";
// import StudentForm from "./StudentForm";

// function Student() {
//   return (
//     // <div><StudentForm /></div>
//     <>
//       <>
//         <div></div>
//       </>
//     </>
//   );
// }

// export default Student;
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 120 },
  { field: "lastName", headerName: "Last Name", width: 120 },
  { field: "email", headerName: "Email", width: 100 },
  { field: "phone", headerName: "Contact", width: 130 },
  { field: "address", headerName: "Address", width: 200 },
];
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = React.useState();
  //   const [columns, setColumns] = React.useState();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.users.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          address: `${user.address.address},${user.address.city}`,
        }));
        setRows(formattedData);
        setLoading(false);
      })

      .catch((err) => {
        console.log("Error fetching error", err);
        setLoading(false);
      });
  }, []);
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
