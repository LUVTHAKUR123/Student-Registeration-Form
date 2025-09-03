import { useState } from "react";
import ControllerForm from "./ControllerForm";
import { v4 as uuidv4 } from "uuid"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function StudentData() {
    const [data, setData] = useState([]);
    const [editID, setEditID] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    // /callback function state

    // create TableCelle callbackfunction
    // StudentData.js
    const handleChildResponse = (formData, editID) => {
        if (editID) {
            // Update case
            const updatedData = data.map((item) =>
                item.id === editID ? { ...formData, id: editID } : item
            );
            setData(updatedData);
            localStorage.setItem("userData", JSON.stringify(updatedData));
            // onClose()
        } else {
            // Add new case
            const newData = [...data, { ...formData, id: uuidv4() }];
            setData(newData);
            localStorage.setItem("userData", JSON.stringify(newData));
        }
    };

    // modal
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
        setSelectedUser(null);
        setEditID(null);
    };

    // handle delete function
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete TableCellis record?")) {
            const deleteData = data.filter((user) => user.id !== id);
            setData(deleteData);
            localStorage.setItem("userData", JSON.stringify(deleteData));
        }
    };

    // handle edit function
    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditID(user.id);
        setShowModal(true);
    };

    return (
        <div className="student-data-container">
            <div className="header">
                <h2>Student Registration</h2>
                {/* 
                <button className="add-btn" onClick={toggleModal}>
                    <i className="fa-solid fa-plus"></i>Add
                </button> */}
                <Button variant="contained" onClick={toggleModal} color="success" startIcon={<AddIcon sx={{ color: "white", cursor: "pointer" }} />}>
                    <i className="fa-solid fa-plus"></i>Add
                </Button>;

            </div>

            {/* Modal Form */}
            {showModal && (
                <ControllerForm
                    onResponse={handleChildResponse} //callback for childcomponent
                    onClose={toggleModal}
                    setData={setData}
                    data={data}
                    editID={editID}
                    setEditID={setEditID}
                    selectedUser={selectedUser}
                />
            )}

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
                                            variant="contained" color="primary"
                                            startIcon={<EditDocumentIcon sx={{ color: "white" }} />}
                                            onClick={() => handleEdit(value)}
                                        >

                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained" color="error"
                                            startIcon={<DeleteForeverIcon sx={{ color: "white" }} />}
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
        </div >
        // </div >
    );
}

export default StudentData;
