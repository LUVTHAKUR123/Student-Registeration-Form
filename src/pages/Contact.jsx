import { Outlet, Link } from "react-router-dom";

export default function Contact() {
  return (
    <div>
      <h1>Contact Page</h1>
      <Link to="post">Go to Post</Link>
      <Outlet />
    </div>
  );
}
