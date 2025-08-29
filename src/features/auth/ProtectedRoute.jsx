// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ isAuth, children }) {
//   if (!isAuth) {
//     return <Navigate to="/notFound" replace />;
//   }
//   return children;
// }

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  return isAuth ? children : <Navigate to="/login" />;
}
