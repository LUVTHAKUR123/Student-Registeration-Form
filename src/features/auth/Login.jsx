import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isAuth, setIsAuth] = useState(false);
  const [Password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
    const storedUser = localStorage.getItem("email");
    if (storedAuth && storedUser) {
      setIsAuth(true);
      setPassword(storedUser);
    }
  }, []);

  const login = (e) => {
    e.preventDefault();

    // Validation
    if (!Password.trim() || !email.trim()) {
      setError("Both Password and email are required!");
      return;
    }

    // Store in localStorage
    // localStorage.setItem("isAuthenticated", JSON.stringify(true));
    // localStorage.setItem("email", email);
    // localStorage.setItem("password", Password);

    //check if email and password are already exist
    const userData = JSON.parse(localStorage.getItem("data")) || [];

    const user = userData.find(
      (user) => user.email === email && user.Password === Password
    );
    if (user) {
      setError("email and password are already exist");
      return;
    }

    setIsAuth(true);
    setError("");
    setEmail("");
    setPassword("");
    navigate("/dashboard");
    const userInfo = { email, Password };
    data.push(userInfo);
    console.log("data", data);
    localStorage.setItem("data", JSON.stringify(data));
  };
  // console.log("***********", isAuth);
  return (
    <div className="login-bar">
      {/* <p>{isAuth}</p> */}

      <form id="formData" onSubmit={login}>
        <h1>Login Form</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <label htmlFor="email">Email : </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="Password">Password : </label>
        <input
          type="text"
          name="Password"
          placeholder="Enter your Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button className="submit-btn" type="submit">Login</button>
      </form>
    </div>
  );
}
