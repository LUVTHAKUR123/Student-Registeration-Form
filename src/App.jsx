// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import User from "./features/Users/User";
import Post from "./features/Posts/Post";
import Login from "./features/auth/Login";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";
import NavBar from "./components/Navbar/NavBar";
import Dashboard from "./features/Dashboard/Dashboard";
import StudentForm from "./features/Students/StudentForm";
import Student from "./features/Students/student";
import UserForm from "./features/Users/UserForm";
import ControllerForm from "./components/Form/ControllerForm";
import StudentData from "./components/Form/StudentData"
localStorage.setItem("isAuthenticated", "true");
localStorage.setItem("isAuthenticated", "false");
const authStatus = localStorage.getItem("isAuthenticated") === "true";
console.log("authStatus", authStatus);

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />

        <Route path="contact" element={<Contact />}>
          <Route path="post" element={<Post />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        >
          <Route path=":id" element={<User />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/form" element={<Form />} />
        <Route path="/StudentForm" element={<StudentForm />} />
        <Route path="/student" element={<Student />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/controllerForm" element={<ControllerForm />} />
        <Route path="/studentData" element={<StudentData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
