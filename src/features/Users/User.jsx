import { Link, useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  return (
    <div>
      <h1>User ID: {id}</h1>
      <Link to="/user/1">User1</Link> | <Link to="/user/2">User2</Link>
    </div>
  );
}
