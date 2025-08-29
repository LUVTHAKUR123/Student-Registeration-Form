import { useState } from "react";

function useEntryForm() {
    // State to manage form errors and student data
    const [errors, setErrors] = useState({});
    const [students, setStudents] = useState({
        name: "",
        email: "",
        contact: "",
        course: "",
        // department: false
        department: [],
        gender: "",
    });

    //handle for input change in the form
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // setStudents((prev) => ({ ...prev, [name]: type === "department" ? checked : value }));
        if (type === "checkbox" && name === "department") {
            setStudents((prevData) => {
                const updatedDepartment = checked
                    ? [...prevData.department, value]
                    : prevData.department.filter((dep) => dep !== value);
                setErrors((prev) => ({
                    ...prev,
                    department: "",
                }));

                return {
                    ...prevData,
                    department: updatedDepartment,
                };
            });
        } else {
            setStudents((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Validation function
    const validate = () => {
        const newErrors = {};
        //gender valdation
        if (!students.gender) {
            newErrors.gender = "please select the gender";
        }
        //department validation
        if (students.department.length === 0) {
            newErrors.department = "please select at least one department";
        }
        // Name validation
        !students.name?.trim()
            ? (newErrors.name = "Name is required")
            : students.name.length < 3 || students.name.length > 10
                ? (newErrors.name = "Name must be between 3 and 10 characters")
                : null;

        // Email validation
        !students.email?.trim()
            ? (newErrors.email = "Email is required")
            : !/\S+@\S+\.\S+/.test(students.email)
                ? (newErrors.email = "Email is invalid")
                : null;

        // Contact validation
        !students.contact?.trim()
            ? (newErrors.contact = "Contact is required")
            : !/^\d{10}$/.test(students.contact)
                ? (newErrors.contact = "Contact must be 10 digits")
                : null;

        // Course validation
        !students.course?.trim() ? (newErrors.course = "Course is required") : null;

        setErrors(newErrors);
        console.log("Validation Errors:", newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return {
        students,
        setStudents,
        handleInputChange,
        errors,
        setErrors,
        validate,
    };
}

export default useEntryForm;
