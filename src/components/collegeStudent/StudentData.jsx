import { useEffect, useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
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
  Modal,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataGrid } from "@mui/x-data-grid";
import StdaddmisForm from "./StdaddmisForm";

const paginationModel = { page: 0, pageSize: 5 };

function StudentData() {
  const columns = [
    { field: "index", headerName: "Sr No", width: 90 },
    { field: "rollno", headerName: "Roll No", width: 160 },
    { field: "name", headerName: " Name", width: 120 },
    { field: "DOB", headerName: "DOB", width: 120 },
    { field: "contact", headerName: "Contact", width: 120 },
    { field: "email", headerName: "Email", width: 140 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "courses", headerName: "Courses", width: 100 },
    { field: "department", headerName: "department", width: 140 },
    { field: "address", headerName: "Address", width: 120 },
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
        </>
      ),
    },
  ];
  const [rows, setRows] = React.useState();
  const [data, setData] = useState([]);
  const [editID, setEditID] = useState(null);
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

  const handleChildResponse = async (formData, editID) => {
    try {
      if (editID) {
        // PUT request to update student
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

        const updatedData = data.map((item) =>
          item.id === editID ? updatedStudent : item
        );
        setData(updatedData);
      } else {
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

        setData((prev) => [...prev, newStudent]);
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
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setEditID(null);
  };

  const handleOpenAdd = () => {
    setOpen(true);
    setSelectedUser(null);
    setEditID(null);
  };

  //styling for the modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "8px",
    // width: "80vw",
    height: "90vh",
    overflowY: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  // handle delete function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete TableCellis record?")) {
      const deleteData = data.filter((user) => user.id !== id);
      setData(deleteData);
      setRows(deleteData);
      localStorage.setItem("userData", JSON.stringify(deleteData));
    }
  };

  // handle edit function
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditID(user.id);
    setOpen(true);
  };

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
        department: Array.isArray(user.Department)
          ? user.Department.join(",")
          : user.Department,
        description: user.description,
        address: user.address,
      }));
      setRows(formattedData);

      // const body = await response.json();
      // const newStudent = await response.json();
      setData(body);
    } catch (error) {
      console.log("errorerror", error);
    }
  };

  useEffect(() => {
    handleGetList();
  }, []);

  console.log("data", data);
  return (
    <>
      <div className="student-data-container">
        <div className="header">
          <h2>Student Registration</h2>
          {/* 
                <button className="add-btn" onClick={toggleModal}>   
                    <i className="fa-solid fa-plus"></i>Add
                </button> */}
          <Button
            variant="contained"
            // onClick={toggleModal}
            onClick={handleOpenAdd}
            color="success"
            startIcon={<AddIcon sx={{ color: "white", cursor: "pointer" }} />}
          >
            <i className="fa-solid fa-plus"></i>Add
          </Button>
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
        <Modal
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
        </Modal>

        {/* Table */}
        {/* <div className="table-container"> */}
        <TableContainer component={Paper}>
          {/* <table className="student-table"> */}
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

                    <TableCell>{index + 1}</TableCell>
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
        </TableContainer>
      </div>
      <div>
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
