import React, { useState } from "react";
import useEntryForm from "../../hooks/useEntryForm";

function StudentForm() {
    // Custom hook to manage student form state
    const {
        errors,
        validate,
        setErrors,
        students,
        setStudents,
        handleInputChange,
    } = useEntryForm();

    // Form submission handler
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Submitted student:", students);
            // Clear the form
            setStudents({
                name: "",
                email: "",
                contact: "",
                course: "",
                gender: "",
                department: []
            });

            setErrors({});
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h1> Student Registeration form</h1>
                <label>Student Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter the student name"
                    value={students.name}
                    onChange={handleInputChange}
                />
                {errors.name && (
                    <p
                        style={{
                            color: "red",
                            fontFamily: "cursive",
                        }}
                    >
                        {errors.name}
                    </p>
                )}
                <br />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter the email"
                    value={students.email}
                    onChange={handleInputChange}
                />
                {errors.email && (
                    <p style={{ color: "red", fontFamily: "cursive" }}>{errors.email}</p>
                )}
                <br />

                <label>Contact:</label>
                <input
                    type="tel"
                    name="contact"
                    placeholder="Enter the contact number"
                    value={students.contact}
                    onChange={handleInputChange}
                />
                {errors.contact && (
                    <p style={{ color: "red", fontFamily: "cursive" }}>
                        {errors.contact}
                    </p>
                )}
                <br />
                <label >Gender :</label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={handleInputChange}
                        checked={students.gender === "male"}
                    />
                    Male
                </label>

                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={handleInputChange}
                        checked={students.gender === "female"}
                    />
                    Female
                </label>
                {errors.gender && (<p
                    style={{ color: "red", fontFamily: "cursive" }}
                >{errors.gender}</p>)}
                <br />

                <label>Course:</label>
                <select
                    className="course-select"
                    name="course"
                    value={students.course}
                    onChange={handleInputChange}
                >
                    <option value="">-- Select course --</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="BA">BA</option>
                </select>
                {errors.course && (
                    <p style={{ color: "red", fontFamily: "cursive" }}>{errors.course}</p>
                )}
                <br />
                <label name="department">Department :</label>
                <input type="checkbox" name="department" onChange={handleInputChange} checked={students.department.includes("Software Development")} value="Software Development" />Software Development
                <input type="checkbox" name="department" onChange={handleInputChange} checked={students.department.includes("Project Management")} value="Project Management" />Project Management
                <input type="checkbox" name="department" onChange={handleInputChange} checked={students.department.includes("Database Administrator")} value="Database Administrator" />Database Administrator
                {errors.department && (
                    <p style={{ color: "red", fontFamily: "cursive" }}>{errors.department}</p>
                )}
                <br />
                <button className="submit-btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default StudentForm;
