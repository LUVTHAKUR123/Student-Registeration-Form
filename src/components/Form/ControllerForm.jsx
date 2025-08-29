import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../ControllerFields/InputField";
import SelectorFields from "../ControllerFields/SelectorFields";
import CheckboxesField from "../ControllerFields/CheckboxesField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RadioButton from "../ControllerFields/RadioButton";
import TextAreaField from "../ControllerFields/TextAreaField";

function ControllerForm() {
    const validationSchema = yup.object().shape({
        rollno: yup.string().required("roll no is required"),
        name: yup.string().required("Name is required"),
        DOB: yup.string().required("DOB is required"),
        contact: yup.string().required("Mobile No is required").matches(/^[0-9]{10}$/, 'Contact must be exactly 10 digits'),
        email: yup.string().required("email is required").email("invalid email address"),
        courses: yup.string().required("Course is required"),
        Department: yup.array().min(1, "At least one subject must be selected"),
        gender: yup.string().required("Gender is required"),
        file: yup.mixed(),
        description: yup.string().required("Description is required"),
        address: yup.string().required("address is required")

    });
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            courses: "",
            Department: [],
            description: "",
            gender: ""
        }

    });

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Student Registeration  Form</h1>
                <InputField
                    label="Roll No:"
                    name="rollno"
                    defaultValue=""
                    control={control}
                    placeholder="enter the roll no"
                    type="text"
                />

                <InputField
                    name="name"
                    control={control}
                    defaultValue=""
                    placeholder="Enter the name"
                    label="Name:"
                    type="text"
                />
                <InputField
                    label="DOB :"
                    name="DOB"
                    placeholder="Enter the DOB"
                    control={control}
                    defaultValue=""
                    type="date"
                />

                <InputField
                    label="Mobile No : "
                    name="contact"
                    defaultValue=""
                    control={control}
                    placeholder="enter the number"
                    type="tel"
                />
                <InputField
                    name="email"
                    label="Email :"
                    control={control}
                    defaultValue=""
                    placeholder="enter the email "
                    type="email"
                />
                <RadioButton
                    label="Gender :"
                    name="gender"
                    control={control}
                    defaultValue=""
                    gender={['Male', 'FeMale']}
                />

                <SelectorFields
                    name="courses"
                    control={control}
                    defaultValue=""
                    label="Courses :"
                    value={["bba", "bca"]}
                />

                <CheckboxesField
                    label="Department :"
                    name="Department"
                    control={control}
                    defaultValue={[]}
                    options={["CSE", "IT", "ECE", 'Civil', 'Mech']}
                />
                <InputField
                    label="Student Photo"
                    name="file"
                    control={control}
                    defaultValue=""
                    placeholder="chosse a file"
                    type="file"
                />
                <TextAreaField
                    label="Description :"
                    name="description"
                    defaultValue=""
                    control={control}
                    placeholder="Write something about youself..."
                    rows="5"
                />
                <TextAreaField
                    label="Address :"
                    name="address"
                    defaultValue=""
                    control={control}
                    placeholder="Enter the address"
                    rows="3"
                />

                <button className="submit-btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ControllerForm;
