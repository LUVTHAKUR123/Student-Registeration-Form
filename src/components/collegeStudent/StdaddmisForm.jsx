import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import InputField from "../ControllerFields/InputField";
import SelectorFields from "../ControllerFields/SelectorFields";
import CheckboxesField from "../ControllerFields/CheckboxesField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RadioButton from "../ControllerFields/RadioButton";
import TextAreaField from "../ControllerFields/TextAreaField";
import { Box, Button, Paper } from "@mui/material";
import { successToast, errorToast } from "../../toastUtlis";
import "react-toastify/dist/ReactToastify.css";
function StdaddmisForm({
  onClose,
  editID,
  setEditID,
  selectedUser,
  onResponse, // callback to parent
}) {
  const initialValues = {
    name: "",
    courses: "",
    Department: [],
    gender: "",
    rollno: "",
    contact: "",
    description: "",
    address: "",
    email: "",
    DOB: "",
  };

  //==============   YUP VALIDATION   ====================
  const validationSchema = yup.object().shape({
    rollno: yup.string().required("Roll no is required"),
    name: yup.string().required("Name is required"),
    DOB: yup.string().required("DOB is required"),
    contact: yup
      .string()
      .required("Mobile No is required")
      .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    courses: yup.string().required("Course is required"),
    Department: yup.array().min(1, "At least one subject must be selected"),
    gender: yup.string().required("Gender is required"),
    description: yup.string().required("Description is required"),
    address: yup.string().required("Address is required"),
  });

  //===========USEFORM =====
  const {
    handleSubmit,
    control,
    reset,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: selectedUser || initialValues,
  });

  //TOAST ERROR MESSAGE
  const validationToastMsg = (errors) => {
    const messages = Object.values(errors).map((err) => err.message);
    if (messages.length) {
      errorToast(
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      );
    }
  };

  // ========================
  useEffect(() => {
    if (selectedUser) {
      reset(selectedUser);
      `
    } else {`;
      reset(initialValues);
    }
  }, [selectedUser, reset]);

  //=========ONSUBMIT FUNCTION ===============
  const onSubmit = (formData) => {
    if (editID) {
      // Update case
      onResponse({ ...formData, id: editID }, editID);
      setEditID(null);
      onClose();
    } else {
      onResponse({ ...formData, id: uuidv4() }, null);
      successToast("New student account has been created.");
    }

    reset(initialValues);
    onClose(); // Close modal
  };

  return (
    <>
      {/* <Paper sx={{ p: 3, maxWidth: 500, mx: "auto" }}> */}
      {/* <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}> */}
      <form onSubmit={handleSubmit(onSubmit, validationToastMsg)}>
        <h1>Student Registration Form</h1>

        {/* ROLL NO FIELD */}
        <InputField
          label="Roll No:"
          name="rollno"
          control={control}
          placeholder="Enter the roll no"
          type="number"
        />

        {/* NAME FIELD*/}
        <InputField
          name="name"
          control={control}
          placeholder="Enter the name"
          label="Name:"
          type="text"
        />

        {/* DATE FIELD */}
        <InputField
          label="DOB :"
          name="DOB"
          placeholder="Enter the DOB"
          control={control}
          type="date"
        />

        {/* CONTACT */}
        <InputField
          label="Mobile No : "
          name="contact"
          control={control}
          placeholder="Enter the number"
          type="tel"
        />

        {/* EMAIL */}
        <InputField
          name="email"
          label="Email :"
          control={control}
          placeholder="Enter the email "
          type="email"
        />

        {/* RADIO BUTTON FOR GENDER */}
        <RadioButton
          label="Gender :"
          name="gender"
          control={control}
          gender={["Male", "Female"]}
        />

        {/* SELECTION FOR THE COURSES */}
        <SelectorFields
          name="courses"
          control={control}
          label="Courses"
          value={["BBA", "BCA", "MCA", "B.Sc", "B.Tech", "B.Com"]}
        />

        {/* CHECKBOX FOR DEPARTMENT */}
        <CheckboxesField
          label="Department :"
          name="Department"
          control={control}
          options={["CSE", "IT", "ECE", "Civil", "Law", "Science"]}
        />

        {/* DESCRIPTION */}
        <TextAreaField
          label="Description :"
          name="description"
          control={control}
          placeholder="Write something about yourself..."
          rows="2"
        />

        {/* ADDRESS */}
        <TextAreaField
          label="Address :"
          name="address"
          control={control}
          placeholder="Enter the address"
          rows="2"
        />

        {/* ======SUBMIT BUTTON =========== */}
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", padding: "10px" }}
          type="submit"
        >
          {editID ? "Update" : "Submit"}
        </Button>
      </form>

      {/* <Button
        variant="contained"
        color="error"
        sx={{ margin: "25px" }}
        onClick={onClose}
      >
        Close
      </Button> */}
      {/* </div>
        </div> */}
      {/* </Paper> */}
    </>
  );
}

export default StdaddmisForm;
