import { useEffect, useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { errorToast, successToast } from "../../toastUtlis";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Modal,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataGrid } from "@mui/x-data-grid";
import StdaddmisForm from "./StdaddmisForm";

const paginationModel = { page: 0, pageSize: 5 };
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function StudentData() {
  // State for managing dialog visibility (add/edit student form)
  const [open, setOpen] = React.useState(false);
  //  Delete Confirmation Dialog visibility
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  //  Store the student ID which is about to be deleted
  const [deleteId, setDeleteId] = useState(null); // Stores the ID of the student to delete
  //  Responsive check to make Dialog fullScreen on smaller devices
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //  Open add/edit student form dialog
  const handleClickOpen = () => {
    setOpen(true);
    // selectedUser(null);
    setEditID(null);
  };
  //  Close add/edit student form dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setEditID(null);
  };
  //  DataGrid columns configuration
  const columns = [
    { field: "index", headerName: "Sr No", width: 90 },
    { field: "rollno", headerName: "Roll No", width: 90 },
    { field: "name", headerName: " Name", width: 150 },
    { field: "DOB", headerName: "DOB", width: 130 },
    { field: "contact", headerName: "Contact", width: 120 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "courses", headerName: "Courses", width: 100 },
    { field: "Department", headerName: "department", width: 140 },
    { field: "address", headerName: "Address", width: 170 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditDocumentIcon sx={{ color: "white" }} />}
            onClick={() => handleEdit(params.row)}
            style={{ marginRight: "8" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
            style={{ marginLeft: "15px" }}
          >
            Delete
          </Button>

          <div></div>
        </>
      ),
    },
  ];
  //  State to hold formatted data for DataGrid rows
  const [rows, setRows] = React.useState();
  //  State to hold fetched student data from API
  const [data, setData] = useState([]);
  //  State to store currently edited student ID
  const [editID, setEditID] = useState(null);
  //  State to store currently selected student for editing
  const [selectedUser, setSelectedUser] = useState(null);

  // /callback function state

  // create TableCelle callbackfunction
  // StudentData.js
  //   const handleChildResponse = (formData, editID) => {
  //     if (editID) {
  //       // Update case
  //       const updatedData = data.map((item) =>
  //         item.id === editID ? { ...formData, id: editID } : item
  //       );
  //       setData(updatedData);
  //       localStorage.setItem("userData", JSON.stringify(updatedData));
  //       // onClose()
  //     } else {
  //       // Add new case
  //       const newData = [...data, { ...formData, id: uuidv4() }];
  //       setData(newData);
  //       localStorage.setItem("userData", JSON.stringify(newData));
  //     }
  //     // handleClose();
  //   };

  //  Callback from child form to add or update a student
  const handleChildResponse = async (formData, editID) => {
    try {
      if (editID) {
        //  UPDATE student data via PUT API
        const response = await fetch(
          `https://68b939936aaf059a5b56c2f8.mockapi.io/users/${editID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const updatedStudent = await response.json();
        // Replace the updated student in local state
        const updatedData = data.map((item) =>
          item.id === editID ? updatedStudent : item
        );
        setData(updatedData);
        successToast("user updated successfully");
        await handleGetList();
      } else {
        //  ADD new student via POST API
        const formDataWithUUID = {
          ...formData,
          uuid: uuidv4(), // This adds a custom 'uuid' field
        };
        // POST request to add new student
        const response = await fetch(
          "https://68b939936aaf059a5b56c2f8.mockapi.io/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataWithUUID),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // const body = await response.json();
        const newStudent = await response.json();

        setData((prev) => [newStudent, ...prev]);

        handleGetList();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  // modal
  // const [showModal, setShowModal] = useState(false);
  // const toggleModal = () => {
  //     setShowModal(!showModal);
  //     setSelectedUser(null);
  //     setEditID(null);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  //   setSelectedUser(null);
  //   setEditID(null);
  // };

  // const handleOpenAdd = () => {
  //   setOpen(true);
  //   setSelectedUser(null);
  //   setEditID(null);
  // };

  //styling for the modal

  // handle delete function
  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete TableCellis record?")) {
  //     const deleteData = data.filter((user) => user.id !== id);
  //     setData(deleteData);
  //     setRows(deleteData);
  //     localStorage.setItem("userData", JSON.stringify(deleteData));
  //   }
  // };
  //  Open delete confirmation dialog
  const handleDelete = (id) => {
    setDeleteId(id); // Set the ID of the student to delete
    setDeleteDialogOpen(true); // Open the confirmation dialog
  };

  //  Open form in edit mode
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditID(user.id);
    setOpen(true);
  };

  //  Fetch student list from API
  const handleGetList = async () => {
    try {
      const response = await fetch(
        "https://68b939936aaf059a5b56c2f8.mockapi.io/users",
        {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const body = await response.json();
      //desecnding order
      const sortedData = body.sort((a, b) => b.id - a.id);

      // Format data for DataGrid rows
      const formattedData = body.map((user, index) => ({
        id: user.id,
        index: index + 1,
        rollno: user.rollno,
        name: user.name,
        DOB: user.DOB,
        contact: user.contact,
        email: user.email,
        gender: user.gender,
        courses: user.courses,
        Department: user.Department,
        description: user.description,
        address: user.address,
      }));
      setRows(formattedData);

      // const body = await response.json();
      // const newStudent = await response.json();
      setData(sortedData);
    } catch (error) {
      console.log("errorerror", error);
    }
  };

  //  Fetch student list on component mount
  useEffect(() => {
    handleGetList();
  }, []);
  //  Confirm delete action
  const confirmDelete = async () => {
    try {
      // Delete from the API
      await fetch(
        `https://68b939936aaf059a5b56c2f8.mockapi.io/users/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      // Filter out the deleted item from state
      const updatedData = data.filter((user) => user.id !== deleteId);
      setData(updatedData);
      setRows(updatedData);

      // toast.error("user deleted")
      errorToast("student has been deleted");
      // Close the dialog
      setDeleteDialogOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  console.log("data", data);
  return (
    <>
      {/*  Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this student? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/*  Header */}
      <div className="student-data-container">
        <div className="header">
          <h2>Student Registration</h2>
          {/* 
                <button className="add-btn" onClick={toggleModal}>   
                    <i className="fa-solid fa-plus"></i>Add
                </button> */}
          {/* <Button
            variant="contained"
            // onClick={toggleModal}
            onClick={handleOpenAdd}
            color="success"
            startIcon={<AddIcon sx={{ color: "white", cursor: "pointer" }} />}
          >
            <i className="fa-solid fa-plus"></i>Add
          </Button> */}
          <Button variant="outlined" onClick={handleClickOpen}>
            ADD{" "}
          </Button>
          {/*  Add/Edit Student Form Dialog */}
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            // scroll="paper"
          >
            <DialogTitle id="responsive-dialog-title">
              {" + Add the new Student"}
            </DialogTitle>
            <DialogContent
              dividers
              sx={{
                maxHeight: "80vh",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Chrome, Safari
                },
              }}
            >
              <StdaddmisForm
                onResponse={handleChildResponse} //callback for childcomponent
                onClose={handleClose}
                setData={setData}
                data={data}
                editID={editID}
                setEditID={setEditID}
                selectedUser={selectedUser}
              />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* Modal Form */}
        {/* {showModal && (
                <ControllerForm
                    onResponse={handleChildResponse} //callback for childcomponent
                    onClose={toggleModal}
                    setData={setData}
                    data={data}
                    editID={editID}
                    setEditID={setEditID}
                    selectedUser={selectedUser}
                />
            )} */}
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <StdaddmisForm
              onResponse={handleChildResponse} //callback for childcomponent
              onClose={handleClose}
              setData={setData}
              data={data}
              editID={editID}
              setEditID={setEditID}
              selectedUser={selectedUser}
            />
          </Box>
        </Modal> */}

        {/* Table */}
        {/* <div className="table-container"> */}
        {/* <TableContainer component={Paper}>
        
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr No</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Courses</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan="12"
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    <Typography variant="body1">no records founds</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((value, index) => (
                  <TableRow key={value.id}>
                    {/* <TableCell>{value.uuid}</TableCell> */}

        {/* <TableCell>{index + 1}</TableCell>
                    <TableCell>{value.rollno}</TableCell>
                    <TableCell>{value.name}</TableCell>
                    <TableCell>{value.DOB}</TableCell>
                    <TableCell>{value.contact}</TableCell>
                    <TableCell>{value.email}</TableCell>
                    <TableCell>{value.gender}</TableCell>
                    <TableCell>{value.courses}</TableCell>
                    <TableCell>
                      {Array.isArray(value.Department)
                        ? value.Department.join(", ")
                        : value.Department}
                    </TableCell>
                    <TableCell>{value.description}</TableCell>
                    <TableCell>{value.address}</TableCell>
                    <TableCell style={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditDocumentIcon sx={{ color: "white" }} />}
                        onClick={() => handleEdit(value)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={
                          <DeleteForeverIcon sx={{ color: "white" }} />
                        }
                        onClick={() => handleDelete(value.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer> */}
      </div>
      <div>
        {/*  Student Data Table */}
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            // loading={loading}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </>
    // </div >
  );
}

export default StudentData;
