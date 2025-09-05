// import React, { useState } from "react";

// function Form() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [data, setData] = useState([{
//     username: "",
//     email: ""
//   }])
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // const info = { username, email }

//     // setData([...data, info])
//     setData((prevData) => [...prevData, data])
//     // console.log("submitted data :", info)
//     // console.log("All data", [...data, info])
//     console.log("all data ", data)
//   }
//   return (
//     <>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="username">Username</label>

//           <input
//             type="text"
//             name="username"
//             placeholder="enter the username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <br />
//           <label htmlFor="email">Email : </label>
//           <input type="text" name="email" placeholder="enter the email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Form;
// =====================================

// const handleSubmit = (e) => {
//   e.preventDefault();
//   const form = formRef.current;

//   const info = {
//     username: form.username.value,
//     email: form.email.value,
//     contact: form.contact.value,
//     course: form.courses.value,
//     department: ["IT", "Finance"].filter((dept) => form[dept].checked),
//   };
//   setData([...data, info]);
//   console.log("data", data);
//   form.reset();
// };
// ==========================================

import { useEffect, useRef, useState } from "react";
import UserForm from "../../features/Users/UserForm";
import StudentForm from "../../features/Students/StudentForm";
import StdaddmisForm from "../collegeStudent/StdaddmisForm";
import Login from "../../features/auth/Login";

function Form() {
  const [data, setData] = useState([]);
  const formRef = useRef(null);
  useEffect(() => {
    console.log("getting the data", data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const elements = form.elements;
    const formData = {};

    for (let i = 0; i < elements.length; i++) {
      const input = elements[i];
      if (!input.name) continue;

      if (input.type === "checkbox") {
        if (!formData[input.name]) {
          formData[input.name] = [];
        }
        if (input.checked) {
          formData[input.name].push(input.value || true);
        }
      } else {
        formData[input.name] = input.value;
      }
    }
    setData((prevData) => [...prevData, formData]);
    console.log("Submitted data", formData);
    form.reset();
  };
  return (
    <><div className="grid-container">
      <form onSubmit={handleSubmit} ref={formRef} className="main-form">
        <h1>Student Registration Form</h1>

        <label>
          Username
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </label>

        <label>
          Contact
          <input
            type="tel"
            name="contact"
            placeholder="Enter contact number"
            required
          />
        </label>

        <label>
          Courses
          <select name="courses" required defaultValue="">
            <option value="" disabled>
              -- Select Course --
            </option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="BTECH">BTECH</option>
          </select>
        </label>

        <div className="checkbox-group">
          <label>Department:</label>
          <label>
            <input type="checkbox" name="department" value="IT" /> IT
          </label>
          <label>
            <input type="checkbox" name="department" value="Finance" /> Finance
          </label>
        </div>

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>


      <div className="form-box"><UserForm /></div>
      <div className="form-box"><StudentForm /></div>
      <div className="form-box"><Login /></div>
      <div className="form-box"><StdaddmisForm /></div>
    </div>

    </>
  );
}

export default Form;
