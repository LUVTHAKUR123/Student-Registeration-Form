import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("email");

    if (storedUser) {
      setEmail(storedUser);
    }
  }, []);

  return (
    <div className="output">
      <h1>
        Welcome <span>{email}</span>
      </h1>

      <Link to="/post">Post</Link>
    </div>
  );
}
